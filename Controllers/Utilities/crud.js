const Firebase=require('../Firebase/firebase')

class Crud{

    static setUpFirebaseApp(){
        if(Crud.FirebaseApp == null)
            Crud.FirebaseApp=Firebase;
    }
    static async addToDatabase(userId, path, data) {
        await Crud.setUpFirebaseApp();
        if (userId == null) {
            Crud.FirebaseApp.setData(path, null, null, data);
        }
        else{
            console.log('Hi');
            console.log(path);
            return Crud.FirebaseApp.setData(path, null, false, data);
        }

    }
    static async getFromDatabase(path) {
        await Crud.setUpFirebaseApp();
        return await Crud.FirebaseApp.getData('/' + path);
    }
}
module.exports=Crud;