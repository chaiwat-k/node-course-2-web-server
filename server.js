const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',() => new Date().getFullYear());
hbs.registerHelper('screamIt',(text)=>text.toUpperCase());

var app = express();
app.set('view engine', 'hbs');

// Middle order of the calls matters
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log+'\n', (err)=>{
        console.log('Unable to log');
    });
    next();
});
// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

// Root
app.get('/', (req, res) => {
    //res.send('<h1>Hello Express</h1>');
    res.render('home.hbs',{
        pageTitle: 'Home',
        welcomeMessage: 'Welcome to my website'
    });
});

// About
app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});

// Bad
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'BAD REQUEST!!!'
    });    
});

app.listen(3000);