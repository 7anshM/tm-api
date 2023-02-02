const express=require('express');
const cors=require('cors');
const app=express();

import Users from './Controllers/Auth/users'

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());



const BASE_URL='api/'
app.get('/',(request,response) => {
    response.send('Server Up and Working');
})
app.get(BASE_URL+'/auth/addUser',(request,response) => {
    return Users.addUser(request,response);
})
app.listen((8000),()=>{
    console.log(`Server Running at http://localhost:${8000}`)
})
