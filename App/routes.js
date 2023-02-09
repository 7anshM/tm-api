const express=require('express');
const cors=require('cors');
const Auth=require('../Controllers/Auth/users');
const MiddleWare=require('../Controllers/Middlewares/authToken')
const {verifyAuthToken} = require("../Controllers/Middlewares/authToken");
const app=express(MiddleWare);
// import Users from './Controllers/Auth/users'
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


const BASE_URL='/api/'
app.get('/',(request,response) => {
    response.send('Server Up and Working');
})


app.get(BASE_URL+'/auth/addUser',function verifyAuthToken(request,response,next){},(request,response) => {
    return Users.addUser(request,response);
})
app.post(BASE_URL+'auth/authorizeUser',async (request, response) => {
    return await Auth.userLogin(request, response);

})
app.listen((8000),()=>{
    console.log(`Server Running at http://localhost:${8000}`)
})
