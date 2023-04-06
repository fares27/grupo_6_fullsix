module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart'; //Se usa en el controlador
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        deletedAt: false,
        tableName: "cart",
        underscore: true
    }
    const Cart = sequelize.define(alias, cols, config); 

    Cart.associate = function (models) {
        Cart.belongsTo(models.User, { 
            as: "user", //Se usa en en controlador
            foreignKey: "id_user"
        }),
        Cart.hasMany(models.ProductCart, { // models.Movies -> Movie es el valor de alias en movie.js
            as: "productCarts", // El nombre del modelo pero en plural, se usaria en el controlador
            foreignKey: "id_cart"
        })
    }

    return Cart
};