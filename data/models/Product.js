module.exports = (sequelize, dataTypes) => {
    let alias = 'Product'; //Se usa en el controlador
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
        },
        description: {
            type: dataTypes.STRING(256),
            allowNull: false
        },
        duration: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(256),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(9,2),
            allowNull: false
        },
        state: {
        type: dataTypes.BIGINT(10),
        allowNull: false
        }
    };
    let config = {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        tableName: "product",
        underscore: true
    }
    const Product = sequelize.define(alias, cols, config); 

    Product.associate = function (models) {
        Product.belongsTo(models.ProductCategory, { 
            as: "productCategory", //Se usa en en controlador
            foreignKey: "id_category"
        }),
        Product.hasMany(models.ProductCart, { // models.Movies -> Movie es el valor de alias en movie.js
            as: "productCarts", // El nombre del modelo pero en plural, se usaria en el controlador
            foreignKey: "id_product"
        })
    }

    return Product
};