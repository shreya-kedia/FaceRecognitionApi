const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'shreya',
    database : 'smart-brain'
  }
});


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => { res.send(database.users) })
app.post('/signin',signin.handleSignIn(db,bcrypt))//another way of doing it
app.post('/register',(req,res) =>{register.handleRegister(req,res,db,bcrypt)})//dependency injection
app.get('/profile/:id',(req,res) =>{profile.handleProfileGet(req,res,db)})
app.put('/image',(req,res) =>{image.handleImage(req,res,db)})
app.post('/imageUrl',(req,res) =>{image.handleApiCall(req,res)})

app.listen(3000,()=> {
	console.log('app is running on port 3000');

})

/*

/ --> res = this is working
/signin --> POST  = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT -->user (increase no. of entries everytime an image is submitted)




*/