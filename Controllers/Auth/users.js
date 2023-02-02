import Crud from '../Utilities/crud'

function getUsernameById(username) {
    return username
}

class Users{
     addUser(request,response){
        let user= request.body.user;
        let username=user.username;
        let password=user.password;
        let salt = crypto.randomBytes(16).toString('hex');
        let hash = crypto.pbkdf2Sync(password, salt,1000, 64, `sha512`).toString(`hex`);
        Crud.addToDatabase({...user,password:hash,salt:salt,createdAt:Date()},[getUsernameById(username),'details'])
    }
}