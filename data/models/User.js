module.exports = (sequelize, dataTypes) => {
    let alias = 'User'; //Se usa en el controlador
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
     //   image: {
     //       type: dataTypes.STRING(100),
     //       allowNull: true
     //   },
        id_rol: dataTypes.BIGINT(10).UNSIGNED //No hace falta crear esta columna. 
    };
    let config = {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        deletedAt: false,
        tableName: "user",
        underscore: true
    }
    const User = sequelize.define(alias, cols, config); 

    User.associate = function (models) {
        User.belongsTo(models.UserRol, { 
            as: "userRol", //Se usa en en controlador
            foreignKey: "id_rol"
        })
    }

    return User
};