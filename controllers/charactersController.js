const {Character} = require('../models');

const controller={
    getAll: async(req,res)=>{
        try {
            const {order,...query} = req.query
            console.log(req.query.order);
            const characters = await Character.findAll({
                attributes:['name','image'],
                where:query,
                order: [
                    ['name', order||'ASC']
                ],
            });
            res.json(characters)
        } catch (error) {
            res.status(400).json(error)
        }
    },
    createCharacter:async(req,res)=>{
        try {
            const data = req.body;
            const character = await new Character(data);
            await character.save();
            res.json(character)
        } catch (error) {
            res.status(400).json({
                error
            })
        }
    }
}

module.exports=controller;