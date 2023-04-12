module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductCart'; //Se usa en el controlador
    let cols = {
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        tableName: "product_cart",
        underscore: true
    }
    const ProductCart = sequelize.define(alias, cols, config); 

    ProductCart.associate = function (models) {
        ProductCart.belongsTo(models.Cart, { 
            as: "cart", //Se usa en en controlador
            foreignKey: "id_cart"
        }),
        ProductCart.belongsTo(models.Product, { 
            as: "product", //Se usa en en controlador
            foreignKey: "id_product"
        })
    }


    return ProductCart
};