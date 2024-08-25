const fs=require('fs');

const User={
    fileName: '../database/users.json',
    getData:function(){
        return JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
    },
    generateId:function(){
        let allUsers=this.getData()
        let lastUser=allUsers.pop()
        return lastUser.id + 1
    },
    //buscar el usuario por id
    findByPK:function(id){
        let allUsers=this.getData()
        let userFound=allUsers.find(oneUser=>oneUser.id===id);
        return userFound;

    },
    //buscar un usuario por email
    findByField:function(field,text){
        let allUsers=this.getData()
        let userFound=allUsers.find(oneUser=>oneUser[field]===text);
        return userFound;

    },
    create: function(userData){
        let allUsers=this.getData()
        let newUser={
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser)
        fs.writeFileSync(this.fileName,JSON.stringify(allUsers,null, ' '))
        return newUser;
    },
    delete: function(id){
        let allUsers=this.getData()
        let finalUsers= allUsers.filter(oneUser=oneUser.id !==id)
        fs.writeFileSync(this.fileName,JSON.stringify(finalUsers,null, ' '))
        return true

    }
}

module.exports=User;