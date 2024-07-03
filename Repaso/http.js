// Código para llamar a un servidor
//Importamos el modulo
const http = require('http'); // Usa 'http' en lugar de 'node:http' para versiones anteriores de Node.js

const desiredPort = process.env.PORT || 1234;
//Creamos un servidor reciviendo un callback
const processRequest = (req,res) => {
    res.setHeader('Content-Type','text/html')

    if(req.url === '/'){
        res.end('<h1> Bienvenido <h1/>')
    } else if(req.url === '/Contacto'){
        res.end('<h1>Contacto<h1/>')
    } else {
        res.statusCode = 404//Not found
        res.end('<h1>404</h1>')
    }    
}
const server = http.createServer(processRequest);
//Escuchamos al servidor en un puerto
server.listen(desiredPort, () => {
    console.log(`server listening on port http://localhost:${desiredPort}`)
});
