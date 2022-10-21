const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cors({
    origin:"http://localhost:3000",
    credentials: true,
}));
dotenv.config({path:'./config.env'});
require('./db/conn');

//if json data comes then convert it into object
app.use(express.json());
app.use(cookieParser());


//link the router file
app.use(require('./router/auth'));


const PORT = process.env.PORT;


//middleware
// const middleware = (req,res,next)=>{
//     console.log('Hello my middleware');
//   next();
// }

// app.get('/',(req,res)=>{
//     res.send('Hello world from the server');
// });

// app.get('/about',middleware,(req,res)=>{
//     res.send('Hello About');
// });

app.get('/contact',(req,res)=>{
    res.send('Hello Contact');
});

app.get('/signin',(req,res)=>{
    res.send('Hello Log in');
});

app.get('/signup',(req,res)=>{
    res.send('Hello Sign up');
});


app.listen(PORT,()=>{
    console.log(`Listening from port ${PORT}`)
})