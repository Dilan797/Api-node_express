import {MovieModel} from "../models/movie.js"
import { validateMovie, validatePartialMovie } from '../schemas/movies.js';

export class MovieController {
    static async getAll (req,res) {    
        const {genre} = req.query
        const movies = await MovieModel.getAll({genre})    
        res.json(movies)
    }

    //Controller get => getById
    static async getById (req,res) {
        const {id} = req.params
        //Llamamos la pelicula
        const movie = await MovieModel.getById ({id})
        //Si no existe la pelicula
        if(movie) return res.json(movie);
        res.status(404).json({message: 'Movie not found'})
    
    }
    //Controller post => create
    static async create (req,res)  {
        //Validamos el reques.body
        const result = validateMovie(req.body)    
        if (!result.success){
            return res.status(400).json({ error: JSON.parse(result.error.message)})
        }   
        //Llamamos la función asincrona
        const newMovie = await MovieModel.create({input: result.data})
        //Indicamos como se ha creado el recurso
        res.status(201).json(newMovie)//actualizar cache del cliente
    }
    //Controller delete
    static async delete (req,res) {
        const {id} = req.params
    
        const result = await MovieModel.delete({id})
    
        if (result === false){
            return res.status(404).json({message: 'Movie not found'})
        }
    
        return res.json({ message: 'Movie deleted'})
    }
    //Controller patch => update
    static async update (req,res){
        const result = validatePartialMovie(req.body)
        
        if (!result.success){
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }
        
        const {id} = req.params//Recuperamos la id
        //
        const updateMovie = await MovieModel.update({ id, input: result.data})
        
        //Devolvemos el json de una pelicula actualizada 
        return res.json(updateMovie)
    }
}