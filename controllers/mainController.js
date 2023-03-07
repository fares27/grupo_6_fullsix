const path = require("path");
const fs = require("fs");
const { create } = require("domain");


module.exports = {
index: (req, res) => {
    console.log(req.session.email);
    const emailCookie = req.session.email;
    if(emailCookie){
        res.render("index", {email: emailSession});
    }else{
        res.render('index', {email: ''})
    }
}
}