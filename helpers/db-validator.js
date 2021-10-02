const {Movie,Genre,User,Character} = require('../models/');

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
    existsMovieWithId: async(id='')=>{
        const movie = await Movie.findByPk(id);
        if (movie){
            throw new Error('Ya existe una pelicula con ese identificador')
        }
    },

    existsUserWithEmail:  async (email='')=>{
        const exists = await User.findOne({where:{email:email}})
        if (exists) {
            throw new Error('El usuario ya existe en la BD')
        }
    },
    existsCharacterWithName:  async (name='')=>{
        const exists = await Genre.findOne({where:{name:name}})
        if (exists) {
            throw new Error('El género ya existe en la BD')
        }
    },

    existsCharacters : async(characters=[])=>{
        let exists_all_characters =true;
        for (const character of characters) {
            const exists = await Character.findByPk(character);
            if (!exists)
                exists_all_characters=false;
          }
        if (!exists_all_characters)
            throw new Error('Alguno de los personajes no existen en la base de datos')
    },
    existsMovies : async(movies=[])=>{
        let exists_all_movies =true;
        for (const movie of movies) {
            const exists = await Movie.findByPk(movie);
            if (!exists)
                exists_all_movies=false;
          }
        if (!exists_all_movies)
            throw new Error('Alguno de las peliculas no existen en la base de datos')
    }

}

module.exports = validator;