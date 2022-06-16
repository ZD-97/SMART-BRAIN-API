const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const cors = require('cors');
const register = require('./controller/register');
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image');
const { signal } = require('nodemon/lib/config/defaults');

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'zhuda',
      password : '',
      database : 'smart-brain'
    }
  });

knex.select('*').from('users').then(data => {
    console.log(data);
});

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("success");
})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,knex,bcrypt)})

app.post('/register',(req,res) => {register.handleRegister(req,res,knex,bcrypt)}) //Dependency Injection

app.get('/profile/:id', (req,res) => {
    profile.handleProfileGet(req,res,knex)
})

app.put('/image',(req,res) => {
    image.handleImage(req,res,knex)}
)
app.post('/imageurl',(req,res) => {
    image.handleApiCall(req,res)}
)
app.listen(3000,() => {
    console.log('app is running on port 3000');
})