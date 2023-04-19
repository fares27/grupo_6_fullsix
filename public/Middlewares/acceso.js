//**Middleware controlo el acceso del usuario usando Sequelize**/

const fs = require('fs');
const path = require('path');

//------- Sequelize ----------------//

const { User} = require('../../data/models');


module.exports = (req,res,next) =>{
    //Variable locals (super global - vive en las vistas )
    res.locals.email = false;
    
    if(req.session.email){
        //console.log('Daniel '+ req.session.usuario.email);
        res.locals.email = req.session.email;
        return next();
    }else if(req.cookies.email){
        User.findOne({
            where: {
               email: req.cookies.email
            }
        })
        .then(user =>{
            req.session.email = user;
            res.locals.email = user;
            
            return next();
    
        })
                
    }else{
        return next();
    }
}

