module.exports = (sequelize, dataTypes) => {
    
    let alias = 'UserRol';
    
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };
    
    let config = {
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        deletedAt: false
    }
    const UserRol = sequelize.define(alias, cols, config); 
/*
    Actor.associate = function (models) {
        Actor.belongsToMany(models.UserRol, { // models.Movie -> Movies es el valor de alias en movie.js
            as: "movies",
            through: 'actor_movie',
            foreignKey: 'actor_id',
            otherKey: 'movie_id',
            timestamps: false
        })
    }*/

    return UserRol
};