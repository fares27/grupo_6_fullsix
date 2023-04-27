const path = require("path");
const fs = require("fs");
const { create } = require("domain");
const db = require ('../../data/models');
const Product = db.Product;
const ProductCategory = db.ProductCategory;
const Cart = db.Cart;
const ProductCart = db.ProductCart;

// Para llamadas con COUNT, LIKE, MAX, etc.
const Op = db.Sequelize.Op;


module.exports = {
    productAll: (req,res) =>{

    const consultaCategorias = ProductCategory.findAll();
    const consultaProductos = Product.findAll(
        {attributes: ['id', 'name','description'],
         include: [{attributes: ['id','name'], association: 'productCategory'}]
        }
    );
    console.log(consultaProductos);

    // UNA VEZ REALIZADA LAS CONSULTAS, LAS ENVIO A LA VISTA
    Promise.all([consultaProductos,consultaCategorias])  
    .then( ([listadoProductos, listadoCategorias]) =>{

            const listadoProductosNuevo = listadoProductos.map(producto => {
                const listadoProduct = { 
                id: producto.id, 
                name: producto.name,
                description: producto.description,
                productCategory: producto.productCategory, 
                detail: 'http://localhost:3000/api/products/'+producto.id}
                return listadoProduct;
                }
                
                )

            const respuesta = {
                metadata: {
                count: listadoProductos.length,
                countByCategory: listadoProductos.length,
                status: 200,
                url: "/api/products"},
                products: listadoProductosNuevo
            }

            return res.json(respuesta);
        })
        .catch(error => res.send(error))        
    }

}
