const {Movie, Character} = require('../models')

module.exports = (sequelize, dataTypes) => {
    const CharacterMovie = sequelize.define(
        "CharacterMovie",{
        character_id: {
            type: dataTypes.INTEGER,
            references: {
              model: Character, 
              key: 'id'
            }
          },
          movie_id: {
            type: dataTypes.INTEGER,
            references: {
              model: Movie, 
              key: 'id'
            }
          }
        },
        {
            tableName: "characters_movies",
            timestamps: false,
        }
    );


    return CharacterMovie;
};