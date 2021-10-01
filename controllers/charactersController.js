const {Character} = require('../models');

const controller={
    getAll: async(req,res)=>{
        try {
            const {order,...query} = req.query
            const characters = await Character.findAll({
                attributes:['name','image'],
                where:query,
            });
            res.json(characters)
        } catch (error) {
            res.status(400).json(error)
        }
    },
    getOne: async (req,res)=>{
        try {
            const {id} = req.params;
            const character = await Character.findByPk(id,{
                include: [
                    {
                        association:"movies",
                        attributes:['name','id']
                    }
                ]
            });
            return res.json({
                character: character||'No existe el personaje buscado'
            })
        } catch (error) {
            res.status(400).json({
                error
            })
            
        }
    },
    createCharacter:async(req,res)=>{
        try {
            const data = req.body;
            const character = await Character.create(data);
            if (data.movies){
                character.addMovies(data.movies)
            }
            res.json(character)
        } catch (error) {
            res.status(400).json({
                error
            })
        }
    },
    deleteCharacter : async(req,res)=>{
        try {
            const {id} = req.params;
            const character = await Character.findByPk(id);
            character.removeMovies(character.getMovies);
            await Character.destroy({
                where:{id}
            })
            return res.json({
                msg:'Se ha borrado el personaje buscado'
            })
        } catch (error) {
            res.status(400).json(error)
        }
    },
    updateCharacter : async (req,res)=>{
        try {
            const {id} = req.params;
            const data = req.body;
            const character = await Character.findByPk(id);
            if (!character){
                return res.status(404).json({
                    msg:'El personaje buscado no existe'
                })
            }
            if (data.movies){
                character.addMovies(data.movies)
            }
            await character.update(data);
            res.json(character)
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

module.exports=controller;