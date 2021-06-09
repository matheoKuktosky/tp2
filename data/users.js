const fs = require('fs').promises
const path = './data/users.json'

async function getUsers(){
    const users = await fs.readFile(path, 'utf-8')
    return JSON.parse(users)
}

async function getUser(id){
    const users = await getUsers()
    return users.find(user => user.id == id)
}

async function addUser(user){
    const users = await getUsers()
    users.sort((a, b)  => a.id - b.id)
    const lastId = users[users.length-1].id
    user.id = lastId + 1
    users.push(user)
    await fs.writeFile(path, JSON.stringify(users, null, ' '))
    
    return user
}

async function updateUser(user){
    const users = await getUsers()
    const index = users.findIndex(usr => usr.id == user.id)
    if(user.name){
        users[index].name = user.name
    }
    if(user.username){
        users[index].username = user.username
    }
    if(user.password){
        users[index].password = user.password
    }
    if(user.mail){
        users[index].mail = user.mail
    }

    await fs.writeFile(path, JSON.stringify(users, null, ' '))

    return users[index]
}

async function deleteUser(id){
    const users = await getUsers()
    const index = users.findIndex(usr => usr.id == id)
    users.splice(index, 1)
    await fs.writeFile(path, JSON.stringify(users, null, ' '))
}

module.exports = {getUsers, getUser, addUser, updateUser, deleteUser}