const path = require("path");
const fs = require("fs");
const { create } = require("domain");
const db = require('../../data/models');
const Product = db.Product;
const ProductCategory = db.ProductCategory;

// Para llamadas con COUNT, LIKE, MAX, etc.
const Op = db.Sequelize.Op;


module.exports = {

    categorys: (req, res) => {
        db.ProductCategory.findAll()
            .then(categorias => {
                res.json(categorias);
            })
    },

    productAll: (req, res) => {

        const consultaCategorias = ProductCategory.findAll();
        const consultaProductos = Product.findAll(
            {
                attributes: ['id', 'name', 'description', 'id_category', 'price', 'image'],
                include: [{ attributes: ['id', 'name'], association: 'productCategory' }]
            }
        );
        console.log(consultaProductos);

        // UNA VEZ REALIZADA LAS CONSULTAS, LAS ENVIO A LA VISTA
        Promise.all([consultaProductos, consultaCategorias])
            .then(([listadoProductos, listadoCategorias]) => {

                const listadoProductosNuevo = listadoProductos.map(producto => {
                    const listadoProduct = {
                        id: producto.id,
                        name: producto.name,
                        description: producto.description,
                        price: producto.price,
                        image: producto.image,
                        productCategory: producto.productCategory,
                        detail: 'http://localhost:3000/api/products/' + producto.id
                    }
                    return listadoProduct;
                }
                )

                const listadoCategoriasCount = listadoCategorias.map(categoria => {
                    const indice = categoria.id;

                    const listadoProductosPorCategoria = listadoProductos.filter(producto => producto.id_category == indice)

                    const listadoCategory = {
                        id: categoria.id,
                        name: categoria.name,
                        count: listadoProductosPorCategoria.length
                    }
                    return listadoCategory;
                }
                )

                const ultimoProducto = listadoProductos.pop();

                const respuesta = {
                    metadata: {
                        count: listadoProductos.length,
                        countByCategory: listadoCategoriasCount,
                        lastProduct: ultimoProducto,
                        status: 200,
                        url: "/api/products"
                    },
                    products: listadoProductosNuevo
                }

                return res.json(respuesta);
            })
            .catch(error => res.send(error))
    },

    product: (req, res) => {

        // OBTENGO EL PRODUCTO ESPECÍFICO DE LA BASE DE DATOS

        let identificador = req.params.id;

        Product.findAll(
            {
                attributes: ['id', 'name', 'description', 'id_category', 'price', 'image'],
                include: [{ attributes: ['id', 'name'], association: 'productCategory' }],
                where: { id: identificador}
            }
        )

            .then(productoEncontrado => {
                const detalleProducto = productoEncontrado.map(producto => {
                const listadoProducto = {
                    id: producto.id,
                    name: producto.name,
                    description: producto.description,
                    productCategory: producto.productCategory,
                    image: 'http://localhost:3000/img/products/' + producto.image}
                    return listadoProducto;
                })

                const respuesta = {
                    metadata: {
                        status: 200,
                        url: "/api/products/:id"
                    },
                    products: detalleProducto
                }
                return res.json(respuesta);
            })

    }

}
