const express = require('express');
const Gpio = require('pigpio').Gpio;

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

app.post('/sanitise',(req,res)=>{
    console.log("Servo motor working")

    const motor = new Gpio(10, {mode: Gpio.OUTPUT});
    
    let pulseWidth = 1000;
    let increment = 100;
    
    setInterval(() => {
        motor.servoWrite(pulseWidth);
    
        pulseWidth += increment;
        if (pulseWidth >= 2000) {
        increment = -100;
        } else if (pulseWidth <= 1000) {
        increment = 100;
        }
    }, 1000);
    
    res.redirect("/form")
});

app.get('/form',(req,res)=>{
    res.render('html/form')
});

app.post('/form',(req,res)=>{
    console.log("Data written")
    res.redirect("/")
});

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log('Server started')
})