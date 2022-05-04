import express from 'express'
import cors from 'cors'
import db from './db.js'

const app = express()

app.use(express.json())
app.use(cors())

app.set('port', 1701)

app.get('/', (req, res) => {
    res.sendStatus(200)
})

app.post('/recebeInformacao', (req, res) => {
    console.log(req.body.mensagem.body)
    console.log(req.body.mensagem.from)
    console.log(req.body.mensagem.sender.name)
    res.send(req.body).status(200)
})

app.post('/pegaLeva', async (req, res) => {
    try { 
        await db.conectar()
        const pegaLeva = await db.executar()
        console.log(pegaLeva)
    } catch (error) {
        console.error(error)
    } finally {
        await db.desconectar()
    }
}) 

app.listen(app.get('port'), () => {
   console.log('Servidor rodando na porta 1701')
})
