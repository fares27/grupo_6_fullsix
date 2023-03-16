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

    UserRol.associate = function (models) {
        UserRol.belongsToMany(models.User, {
            as: "user",
            through: 'user_rol',
            foreignKey: 'id_rol',
            otherKey: 'id',
            timestamps: false
        })
    }

    return UserRol
};