//Crear un enrutador a en el cual vamos 
//a responder todos los PARSE
import {Router} from 'express'
import { MovieController } from '../controllers/movies.js';


export const  moviesRouter = Router()
//Separamos toda nuestra rama del enrutador en un solo archivo separado
moviesRouter.get('/', MovieController.getAll)//Directamente el controlador de la pelicula
//Insertamos el segundo get -> controlador 'getById'
moviesRouter.get('/:id', MovieController.getById );
//Insertamos post-> controllador 'create'
moviesRouter.post('/', MovieController.create);
//Insertamos delete-> controllador 'delete'
moviesRouter.delete('/:id', MovieController.delete );
//Insertamos patch-> controllador 'update'
moviesRouter.patch('/: id', MovieController.update);

