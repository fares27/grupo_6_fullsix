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

    UserRol.associate = function(models) {
        UserRol.hasMany(models.User, { // models.Movies -> Movie es el valor de alias en movie.js
            as: "users", // El nombre del modelo pero en plural
            foreignKey: "id_rol"
        })
    }

    return UserRol
};