module.exports = (sequelize, dataTypes) => {
    
    let alias = 'UserRol';
    
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };
    
    let config = {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        tableName: "user_rol",
        underscore: true
    }
    const UserRol = sequelize.define(alias, cols, config); 

    UserRol.associate = function(models) {
        UserRol.hasMany(models.User, { // models.Movies -> Movie es el valor de alias en movie.js
            as: "users", // El nombre del modelo pero en plural, se usaria en el controlador
            foreignKey: "id_rol"
        })
    }

    return UserRol
};