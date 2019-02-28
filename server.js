const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 13000;

var message = "message";

var app = express();

hbs.registerPartials(__dirname+'/Views/Partials');
app.set('viewengine','hbs');

app.use((req, res, next)=>{
    
    var now = new Date().toString();
    var log =`${now}: ${req.method}: ${req.url}`;
    fs.appendFile('server.log', log + '\n',(err)=>{
        if(err)
        console.log(err.message);
    });
    next();
});

// app.use((req, res, next)=>{
//     res.render('Maintenance.hbs');
// })
app.use(express.static(__dirname + '/public'));
   hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

var home = {
    pageTitle: 'Home Page',
    message
}

app.get('/', (req, res)=>{
    res.render('Home.hbs', home);

});

app.get('/about', (req, res)=>{

    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});




app.listen(port, ()=>{
    console.log(`Listening on ${port}`);
});