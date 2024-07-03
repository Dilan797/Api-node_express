const http = require('http')
//Creamos la request
const processRequest = (req,res) => {
}
//Procesamos la request
const server = http.createServer(processRequest)
//Llmamos la request
server.listen(1234, () =>{
    console.log('server listening on port http://localhost:1234')
})