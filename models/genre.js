module.exports = (sequelize, dataTypes) => {
    const Genre = sequelize.define(
        "Genre",
        {
            name: {
                type: dataTypes.STRING,
            },
            image: {
                type: dataTypes.STRING,
            }
        },
        {
            tableName: "genres",
            timestamps: false,
        }
    );

    Genre.associate = (models) => {
        Genre.hasMany(models.Movie, {
            as: "movies",
            foreignKey: "genre_id",
        });
    };

    return Genre;
};