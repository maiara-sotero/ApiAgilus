export default {

    async enviaWhats (messages) {
        console.log('estou enviando mensagens, bla bla bla',messages.length)
        try {
            return axios.post (
                'http://200.98.74.150:41300/enviarMensagem',
                {
                    messages
                },
                { 
                    headers: {
                        Authorization: `Bearer ${process.env.TOKEN}`,
                        'Content-Type': 'application/json'
                    } 
                }
            )           
        } catch (error) {
            console.log(error.message)
        }
    }
}

