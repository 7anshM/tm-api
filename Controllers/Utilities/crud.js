class Crud{
    addToDatabase(user,path){
        this.createPath(path);

    }


    createPath(path) {
        let link=''
        for(let i=0;i<path.size;i++){
            link+=(path[i]+'/')
        }
    }
}