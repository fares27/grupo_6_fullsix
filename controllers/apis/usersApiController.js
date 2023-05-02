const path = require("path");
const fs = require("fs");
const { create } = require("domain");
const db = require('../../data/models');
const User = db.User;

// Para llamadas con COUNT, LIKE, MAX, etc.
const Op = db.Sequelize.Op;


module.exports = {

    users: (req, res) => {
        User.findAll(
            {attributes: ['id', 'first_name','last_name','email']}
        )
            .then(usuarios => {

                const listadoUsuarios = usuarios.map(usuario => {
                    const listadoUsuario = {
                        id: usuario.id,
                        first_name: usuario.first_name,
                        last_name: usuario.last_name,
                        email: usuario.email,
                        detail: 'http://localhost:3000/api/users/' + usuario.id
                    }
                    return listadoUsuario;
                }
                )
                const respuesta = {
                    metadata: {
                        count: usuarios.length,
                        status: 200,
                        url: "/api/users"
                    },
                    users: listadoUsuarios
                }

                res.json(respuesta);
            })
    },
    userDetail: (req, res) => {
        
        let identificador = req.params.id;

        User.findAll(
            {attributes: ['id', 'first_name','last_name','email','image','createdAt','updatedAt','deletedAt'],
            where:  {id : identificador}}
        )
            .then(usuario => {
                const detalleUsuario = usuario.map(user => {
                    const listadoUsuario = {
                        id: user.id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        image: 'http://localhost:3000/img/avatars/' + user.image,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                        deletedAt: user.deletedAt
                    }
                    return listadoUsuario;
                }
                )
                const respuesta = {
                    metadata: {
                        status: 200,
                        url: "/api/users/:id"
                    },
                    user: detalleUsuario
                }

                res.json(respuesta);
            })
    }
}
