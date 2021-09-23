module.exports = (sequelize,dataTypes)=>{
    const Movie =sequelize.define(
        "Movie",
        {
            name:{
                type:dataTypes.STRING
            },
            image:{
                type:dataTypes.STRING
            },
            created_at:{
                type:dataTypes.DATE
            },
            calification:{
                type:dataTypes.INTEGER
            }

        },
        {
            tableName:"movies",
            timestamps:false
        }
    );
    Movie.associate = (models) => {
        Movie.belongsTo(models.Genre, {
            as: "genre",
            foreignKey: "genre_id",
        });
        Movie.belongsToMany(models.Character, {
            through: 'characters_movies',
            as:'characters',
            foreignKey:'character_id'
        });
    };

    return Movie
}