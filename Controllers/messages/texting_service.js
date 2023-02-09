const MessageModel=require('../../Models/MessagesModel');
const Crud=require('../Utilities/crud')
class Texting_Service{

    async sendNewMessage(to, from, data, type) {
        if (type === 'Notification') to = -1
        const message = new MessageModel(to, from, data.message, type);
        for (const receiver of from) {
            await Crud.addToDatabase(receiver, 'users/messages/' + to, message);
            await Crud.addToDatabase(to, 'users/messages/' + receiver, message);
        }

    }

    getMessage(to,from,data){
        Crud.getFromDatabse(path);
    }
    getFrequent(user){

    }
    getArchive(user){

    }

}