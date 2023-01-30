const express=require('express');
const cors=require('cors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// const mongoose=require('mongoose');
// const config = require('config');
const {request, response} = require("express");

const app=express();
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


// function auth(request,response) {
//     next();
// }

function checkLoginCredentials(username,password){
    return true;
}
function getAuthToken(username){
    // store secret in config file
    return jwt.sign({ username: username }, 'shhhhh');

}
function refreshAuthToken(){

}


app.post('api/newUser',(request,response)=>{
    let username = request.body.username;
    let password = request.body.password;
    let salt = crypto.randomBytes(16).toString('hex');
    let hash = crypto.pbkdf2Sync(password, salt,
        1000, 64, `sha512`).toString(`hex`);

    addUser(username,hash,salt);

})


app.get('api/refreshToken',(request,response)=>{
    let username=request.header.user
    if(username){
        response.send(jwt.sign({ username: username }, 'shhhhh'));
    }
})

app.get('api/login',(request,response)=>{
    let username = request.body.username;
    let password = request.body.password;
    if(checkLoginCredentials(username,password)){
        getAuthToken();
    }
    else {

    }

})

app.get('/',(request,response) => {
    response.send('Hiii');

})
app.listen(8000)
