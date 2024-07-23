//Creando una Api_rest
import express from 'express';

//Importamos movies.json
//import moviesRouter 

import {moviesRouter} from './routes/movies.js';
import { createServer } from 'http';
//Ultimo arreglo para llamar
import corsModule from './middlewares/cors.js';
const { corsMiddleware, ACCEPTED_ORIGINS } = corsModule;

//Creamos nuestro xpress
const app = express();
app.use(express.json()); 
app.use(corsMiddleware())
app.disable('x-powered-by');//Desabilitar el header x-Powered-By: Express


// Middleware para manejar CORS
app.use((req, res, next) => {
    const origin = req.header('origin');
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

//se utiliza para definir una ruta que maneja solicitudes HTTP GET.
//Una solicitud GET se utiliza típicamente para obtener datos del servidor. En este caso,
//la ruta definida es el punto de entrada de tu aplicación web, es decir, la raíz ('/').
// app.get('/', (req,res) => {
//     res.json({message:'hola mundo'})
// })

//Todos los recursos que sean MOVIES se identifican con /movies
//
//
//
//

//app.get('/movies', todo) 
//
//Para recuperar una pelicula, segmento dinamico
//parametro de la url para acceder a una id
//app.get('/movies/:id', todo)
//
//Creamos un POST, usamos el mismo recurso 'movies'
//app.post('/movies', todo )
//
//Creamos el delete
//app.delete('/movies/:id', todo)
//Creamos PATCH
//app.patch('/movies/:id', todo)
//Hacemos una imoportacion de nuestro código anteriro en esta linea
//de el archivo moviesRoute.js 
app.use('/movies', moviesRouter);


//Código para completar la solucitud de borrado de una pelicula 
app.options('/movies/:id', (req,res) => {
    //Forma dinamica que al entrar se da el puerto exacto
    const origin = req.header('origin')
    if (ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header('Access-Control-Allow-Origin', origin)
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    res.sendStatus(200)
})

function findAvailablePort(startPort) {
    return new Promise((resolve, reject) => {
        const server = createServer();
        server.listen(startPort, () => {
            const address = server.address();
            const port = address && typeof address === 'object' ? address.port : null;
            server.close(() => {
                resolve(port);
            });
        });
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                findAvailablePort(startPort + 1).then(resolve, reject);
            } else {
                reject(err);
            }
        });
    });
}

const startServer = async () => {
    try {
        const port = await findAvailablePort(1234);
        app.listen(port, () => {
            console.log(`Servidor escuchando en el puerto ${port}`);
        });
    } catch (error) {
        console.error('No se pudo iniciar el servidor:', error);
    }
};

startServer();