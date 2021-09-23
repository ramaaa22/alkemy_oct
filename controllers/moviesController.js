const {Movie} = require('../models');
const controller ={
    getAll: async (req,res)=>{
        try {
            const {order,...query}=req.query;
            const movies = await Movie.findAll({
                attributes:['image','name','created_at'],
                where:query,
                order: [
                    ['created_at', order||'ASC']
                ],
            });
            res.json({
                movies
            })

        } catch (error) {
            res.status(404).json({
                error
            })
        }
    },
    getOne: async(req,res)=>{
        try {
            const {id} = req.params;
            const movie = await Movie.findByPk(id,{
                include: [
                    {
                        association: "genre",
                    },
                ]
            })
            
            return res.json({
                movie:movie||'No existe la pelicula buscada'
            })
        } catch (error) {
            res.status(400).json({
                error
            })
        }
    },
    createMovie: async(req,res)=>{
        try {
            const data = req.body;
            const movie = new Movie(data);
            await movie.save();
            res.json(
                movie
            )
        } catch (error) {
            res.status(400).json(
                error
            )
            
        }
    }
}


module.exports = controller;