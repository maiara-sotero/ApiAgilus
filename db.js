import tedious from 'tedious'
import dotenv from 'dotenv'
dotenv.config()

const TYPES = tedious.TYPES
const Request =  tedious.Request


// conexao com o banco de dados :D
const config = {
    server: process.env.DB_SERVER,
    authentication: {
        type: "default",
        options: {
            userName: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD
        }
    },
    options: {
        port: parseInt(process.env.DB_PORT),
        database: process.env.DB_DATABASE,
        trustServerCertificate: true,
        useColumnNames: true,
        encrypt: false
    }
} 

let conexao = new tedious.Connection(config)

export default {
    async conectar () {
        console.log('conectando...')
        conexao = new tedious.Connection(config)
        return new Promise((resolve, reject) => {
            conexao.connect((err) => {
                if (err) {
                    reject(err)
                } else {
                    console.log('conectado com sucesso!')
                    resolve()
                }
            })
        }) 
    },
    async executar () {
        return new Promise((resolve, reject) => {
            let tels = []
            const request = new Request(`
            select dbo.fn_so_numeros(tat_telefone) telefone
            from telefone_adicional_televenda a
            join cliente_televenda b on a.clt_codigo = b.clt_codigo
            where cat_codigo = 17
            and dbo.fn_so_numeros(tat_telefone) is not null 
            and dbo.fn_so_numeros(tat_telefone) <> ''            
            `, (err, rowCount) => {
                if (err) {
                    reject(err)
                } else {
                    //console.log('rowcount', rowCount)
                    resolve(tels)
                }
            }) 
            request.on('row', (columns) => { tels.push(columns.telefone.value) })
            conexao.execSql(request)
        })
    },
    async desconectar () {
        try {
            console.log('desconectando...')            
            conexao.close()
            conexao = null
            console.log('desconectado com sucesso!')
        } catch (error) {
            console.log('Erro ao desconectar!', error.message)
        }
    }
  }