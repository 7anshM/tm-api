// import Crud from '../Utilities/crud'
const crypto=require('crypto');
const Crud = require("../Utilities/crud");
const jwt =require('jsonwebtoken')
class Users{
    static async createAdminAcc() {
        let userDetails={
            username: "seven",
            password: '1',
            salt: '1234567890123456',
            type: 'ADMIN',
        }
        let userId=this.generateUniqueID(userDetails.username);
        this.mapUsernameToId(userDetails.username, userId).then(()=>{
            console.log('map created');
            Crud.addToDatabase(userId,'/users/'+userId+'/details',userDetails);
        });
    }

     static addUser(request,response){
        let user= request.body.user;
        let username=user.username;
        let password=user.password;
        let salt = crypto.randomBytes(16).toString('hex');
        let hash = crypto.pbkdf2Sync(password, salt,1000, 64, `sha512`).toString(`hex`);
        let userID=Users.generateUniqueID(username);
        Users.mapUsernameToId(username,userID).then(() =>
            Crud.addToDatabase(userID, 'users/' + userID, {username, salt, hash}).then()
        )
    }

    static getAuthToken(username){
        let salt='1234567890';
        return jwt.sign(username,salt);
    }
    static async userLogin(request, response) {
        let username=request.body.username;
        let password=request.body.password;
        const userID = await Crud.getFromDatabase( 'USERNAME_ID_MAPPING/' + username);
        const userDetails = await Crud.getFromDatabase('users/'+userID+'/details');
        let hash = crypto.pbkdf2Sync(password, userDetails.salt,1000, 64, `sha512`).toString(`hex`);

        if(userDetails.password === hash){
            return response.send({token:Users.getAuthToken(username)});
        }
        else{
            console.log('UnAuthorized');
            return response.send('UnAuthorized')
        }
    }
    static mapUsernameToId(username,id) {
        return Crud.addToDatabase(null,'/USERNAME_ID_MAPPING/'+username,id);
    }
    static generateUniqueID(username) {
        let salt = crypto.randomBytes(16).toString('hex');
        return new Date().valueOf().toString() + salt

    }
}
module.exports=Users

