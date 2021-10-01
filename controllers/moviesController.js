const { Movie, CharacterMovie } = require('../models');
const controller = {
    getAll: async (req, res) => {
        try {
            const { order, ...query } = req.query;
            const movies = await Movie.findAll({
                attributes: ['image', 'name', 'created_at'],
                where: query,
                order: [
                    ['created_at', order || 'ASC']
                ],
            });
            res.json({
                movies
            })

        } catch (error) {
            return res.status(404).json({
                error
            })
        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params;
            const movie = await Movie.findByPk(id, {
                include: [
                    {
                        association: "genre",
                        attributes:['name']
                    },
                    {
                        association: "characters",
                        attributes:['name','id']
                    }
                ],
            })
            res.json({
                movie: movie || 'No existe la pelicula buscada'
            })
        } catch (error) {
            res.status(400).json({
                error
            })
        }
    },
    createMovie: async (req, res) => {
        try {
            const data = req.body;
            const movie = await Movie.create(data);
            if (data.characters)
                movie.addCharacters(data.characters)
            res.json(
                movie
            )
        } catch (error) {
            res.status(400).json(
                error
            )
        }
    },
    updateMovie: async (req, res) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const movie = await Movie.findByPk(id);
            if (movie) {
                if (data.characters)
                    movie.addCharacters(data.characters)
                movie.update(data);
            }
            res.json({
                movie: movie || 'No existe pelicula con ese identificador'
            })
        } catch (error) {
            res.status(400).json(error)
        }
    },
    deleteMovie: async (req, res) => {
        try {
            const { id } = req.params;
            const movie = await Movie.findByPk(id);
            if (movie) {
                movie.removeCharacters(movie.getCharacters());
                await Movie.destroy({
                    where: { id }
                })
                return res.json({
                    msg: 'Se ha borrado la pelicula especificada'
                })
            }
            return res.json({
                msg: movie? 'Se ha borrado la pelicula' : 'No existe la pelicula buscada'
            })
            
        } catch (error) {
            res.status(400).json(error)
        }


    }
}


module.exports = controller;