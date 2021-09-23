const {Movie,Genre} = require('../models/');

const validator ={
    existsGenreWithName:  async (name='')=>{
        const exists = await Genre.findOne({where:{name:name}})
        if (exists) {
            throw new Error('El género ya existe en la BD')
        }
    },
    existsGenreWithId: async (id='')=>{
        const exists = await Genre.findByPk(id);
        if (!exists){
            throw new Error('No existe el género ingresado o no existe')
        }
    },
    existsMovieWithName: async(name='')=>{
        const movie = await Movie.findOne({where:{name:name}});
        if (movie){
            throw new Error('Ya existe una pelicula con ese nombre')
        }
    },

}

module.exports = validator;