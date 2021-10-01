module.exports = (sequelize, dataTypes) => {
    const User = sequelize.define(
        "User",
        {
            email: {
                type: dataTypes.STRING,
            },
            password: {
                type: dataTypes.STRING,
            }
        },
        {
            tableName: "users",
            timestamps: false,
        }
    );

    

    return User;
};