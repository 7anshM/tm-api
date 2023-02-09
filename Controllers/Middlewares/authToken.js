const jwt =require('jsonwebtoken')
function verifyAuthToken(request,response,next){
    next();
}
module.exports = {verifyAuthToken};