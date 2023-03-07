const path = require("path");
const fs = require("fs");
const { create } = require("domain");


module.exports = {
index: (req, res) => {
    const emailSession = req.session.email;
    if(emailSession){
        res.render("index", {email: emailSession});
    }else{
        res.render('index', {email: ''})
    }
}
}
