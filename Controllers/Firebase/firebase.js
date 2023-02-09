let admin = require('firebase-admin');
const { getDatabase } = require('firebase-admin/database');
let serviceAccount= require('./../../teams-d72cc-firebase-adminsdk-bkqje-7e856a249f.json');



class Firebase{

    static async setUpFirebase(){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://teams-d72cc-default-rtdb.asia-southeast1.firebasedatabase.app"
        });
        Firebase.db = getDatabase();
        Firebase.dbRef = Firebase.db.ref('/');
    }

    static async getData(path, type, isChild) {
        if( Firebase.db==null || Firebase.dbRef==null ) await Firebase.setUpFirebase();
        let customRef = Firebase.getRef(path);
        let data = await customRef.once("value", function (snapshot) {});
        return data.val();
    }
    static async setData(path, type, isChild, data) {
        console.log(path);
        if(Firebase.db==null || Firebase.dbRef==null) await Firebase.setUpFirebase();
        let usersRef = this.getRef(path);
        // if(isChild != null)
        //     usersRef = usersRef.child(isChild);
        console.log('error');
        usersRef.set(data);
    }
    static async updateData(path,type,isChild,data){
        if(Firebase.db==null || Firebase.dbRef==null) await Firebase.setUpFirebase();
        let customRef=this.getRef(path);
        const usersRef = customRef.child('users');
        usersRef.update({
            alanisawesome: {
                date_of_birth: 'June 23, 1912',
                full_name: 'Alan Turing'
            },
            gracehop: {
                date_of_birth: 'December 9, 1906',
                full_name: 'Grace Hopper'
            }
        });

    }
    static async pushData(path,type,isChild,data){
        if(Firebase.db==null || Firebase.dbRef==null) await Firebase.setUpFirebase();
        let customRef=this.getRef(path);
        const usersRef = customRef.child('users');
        usersRef.push(data);
    }

    static getRef(path) {
        return Firebase.dbRef.database.ref(path)
    }

}
module.exports=Firebase;