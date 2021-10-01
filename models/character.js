module.exports = (sequelize,dataTypes)=>{
    const Character =sequelize.define(
        "Character",
        {
            name:{
                type:dataTypes.STRING
            },
            image:{
                type:dataTypes.STRING
            },
            age:{
                type:dataTypes.INTEGER
            },
            weight:{
                type:dataTypes.DOUBLE
            },
            story:{
                type:dataTypes.STRING
            }

        },
        {
            tableName:"characters",
            timestamps:false
        }
    );
    Character.associate = (models) => {
        Character.belongsToMany(models.Movie, {
            through: 'characters_movies',
            as:'movies',
            foreignKey:'character_id'
        });
        //Character.belongsToMany(models.Movie, { through: 'CharacterMovie' });
    };

    return Character
}