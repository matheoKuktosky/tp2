const connection = require('./connection')
let objectId = require('mongodb').ObjectId

async function getUsers(){
    const clientmongo = await connection.getConnection();
    console.log(clientmongo);
    const users = await clientmongo.db('Proyecto_final')
                        .collection('users')
                        .find()
                        .toArray();
    return users;
}

async function getUser(id){
    const clientmongo = await connection.getConnection();
    const user = await clientmongo.db('Proyecto_final')
                    .collection('users')
                    .findOne({_id: new objectId(id)});
    return user;
}

async function addUser(user){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('Proyecto_final')
                    .collection('users')
                    .insertOne(user);
    return result;
}

async function updateUser(user){
    const clientmongo = await connection.getConnection();
    const query = {_id: new objectId(user._id)};
    const newvalues = { $set:{
            name: user.name,
            username: user.username,
            password: user.password,
            mail: user.mail
        }
    };
    console.log(newvalues)
    const result = await clientmongo.db('Proyecto_final')
                    .collection('users')
                    .updateOne(query, newvalues);
    return result;
}

async function deleteUser(id){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('Proyecto_final')
                    .collection('users')
                    .deleteOne({_id: new objectId(id)});
    return result;
}

module.exports = {getUsers, getUser, addUser, updateUser, deleteUser}