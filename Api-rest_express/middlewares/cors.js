//Importamos cors
import cors from 'cors';

//Función para darle si a todo 
const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:1234',
    'http://localhost:3000',
    'http://movies.com',
    'http://dilan.dev',
    'http://127.0.0.1:5500',
    'http://127.0.0.1:5501'
];
export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS} ={}) => cors({
    origin: (origin, callback) => {
        //Detectar el origin
        if (!origin || acceptedOrigins.includes(origin)) {
            return callback(null, true);
        }
    
        return callback (new Error('Not allowed cors')) 
    }
})
export default { corsMiddleware, ACCEPTED_ORIGINS };