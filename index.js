const express = require('express')
const cors = require('cors')

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

app.listen(app.get('port'), () => {
    console.log('Servidor rodando na porta 1701')
})
