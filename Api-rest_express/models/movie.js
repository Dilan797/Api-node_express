
import{randomUUID} from 'node:crypto'
import { readJSON } from '../utils.js';
//const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))
const movies = readJSON('./movies.json')
//Logica para filtrar
export class MovieModel {
    static async getAll ({genre}) {
        if (genre) {
            return movies.filter(
                movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            );
        }
        return movies;
    }
    //Llamamos el Id
    static async getById ({id}) {
        const movie = movies.find(movie =>movie.id === id)
        return  movie
    }
    //Actualizamos base de datos
    static async create ({input}){
        //Base de datos
        const newMovie = {
            id: randomUUID(),//Creamos un UUID V4
            ...input 
        }    
        //Mutamos
        movies.push(newMovie);
        //Indicamos como se ha creado el recurso
        return newMovie
    }
    //Función delete
    static async delete({id}) {
        const movieIndex = movies.findIndex(movie => movie.id === id)
        if(movieIndex === -1)return false

        movies.splice(movieIndex, 1)
        return true
    }
    //Función update
    static async update({id, input}) {
        const movieIndex = movies.findIndex(movie => movie.id === id);//Buscamos la pelicula

        if (movieIndex === -1)return false        
        movies [movieIndex] = {
            ...movies[movieIndex],
            ...input
        }
        return movies[movieIndex]
    }
}