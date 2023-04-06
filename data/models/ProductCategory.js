module.exports = (sequelize, dataTypes) => {
    
    let alias = 'ProductCategory';
    
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
        createdAt: false,
        updatedAt: false,
        deletedAt: false,
        tableName: "product_category",
        underscore: true
    }
    const ProductCategory = sequelize.define(alias, cols, config); 

    ProductCategory.associate = function(models) {
        ProductCategory.hasMany(models.Product, { // models.Movies -> Movie es el valor de alias en movie.js
            as: "products", // El nombre del modelo pero en plural, se usaria en el controlador
            foreignKey: "id_category"
        })
    }

    return ProductCategory
};