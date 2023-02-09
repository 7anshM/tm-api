const BasicUtilities=require('../Controllers/Utilities/basic')
class MessagesModel {
    constructor(sender,receiver,message,type) {
        this.sender=sender;
        this.receiver=receiver
        this.message=message;
        this.createdAt=BasicUtilities.getCurentTimeStamp();
        this.seen=false;
        this.type=type;
    }
}
module.exports= MessagesModel;

