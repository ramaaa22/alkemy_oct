const {Genre} = require('../models/');

const controller ={
    getAll: async (req,res)=>{
        try {
            const genres = await Genre.findAll();
            return res.json({
                genres
            })
        } catch (error) {
            res.status(400).json({
                error
            })
        }
        
    },
    getOne: async (req,res)=>{
        try {
            const id = req.params.id;
            const genre = await Genre.findByPk(id);
            return res.json({
                genre:genre||'No existe el genero solicitado'
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                error
            })
        }
    },
    createGenre: async (req,res)=>{
        try {
            const data = req.body;
            const genre = await new Genre(data);
            console.log(genre);
            await genre.save()
            res.json(
                genre
            )
        } catch (error) {
            res.status(400).json({
                msg:error
            })
        }
    },
    updateGenre: async(req,res)=>{
        try {
            const {id} = req.params;
            const data = req.body
            console.log(id);
            const genre = await Genre.findByPk(id);
            if (!genre) {
                return res.status(404).json({
                    msg:'El género buscado no existe'
                })
            }
            await genre.update(data);
            res.json({
                genre
            })
        } catch (error) {
            return res.json({
                error
            })
        }
    }
}

module.exports = controller;