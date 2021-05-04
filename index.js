const express = require('express');

const app = express();

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(express.json());       
app.use(express.urlencoded()); 

app.get('/',(req,res)=>{
    res.render('html/welcome')
});

app.get('/temperature',(req,res)=>{
    res.render('html/temperature')
});

app.get('/sanitiser',(req,res)=>{
    res.render('html/sanitiser')
});

app.get('/form',(req,res)=>{
    res.render('html/form')
});

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log('Server started')
})