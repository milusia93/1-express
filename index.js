const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/1-express");

const User = require('./app/models/UserModel');
const userController = require('./app/controllers/userController')

app.use(express.static('public'));
app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

// app.get('/mongoose', function(req,res){
//  User.find().then((users)=>{
//     res.send(users);
//  }).catch((err)=>{
//     res.send(err);
//  })
// })
app.get('/mongoose', function (req, res) {
    User.findById("66d0b63a2a8ea287bee84534").then((user) => {
        res.render('home', {
            title: 'My app title',
            content: 'Lorem Ipsum',
            displayTitle: true,
            names: ['Adam', 'Ania', 'Marta'],
            name: user.name,
            street: user.address.street
        });
    }).catch((err) => {
        res.send(err);
    })
})

app.get('/', function (req, res) {
    res.render('home', {
        title: 'My app title',
        content: 'Lorem Ipsum',
        displayTitle: true,
        names: ['Adam', 'Ania', 'Marta']

    });
});

app.get("/dane", userController.index)
app.listen(8080, function () {
    console.log('Serwer Node.js działa');
});

app.get('/user/:id', function (req, res) {
    res.send('user ' + req.params.id)
})