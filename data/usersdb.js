const connection = require('./connection')
let objectId = require('mongodb').ObjectId
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

async function getUserByEmail(mail){
    const clientmongo = await connection.getConnection();
    const user = await clientmongo.db('Proyecto_final')
                    .collection('users')
                    .findOne({mail: mail});
    return user;
}

async function addUser(user){
    const clientmongo = await connection.getConnection();
    user.password = await bcrypt.hash(user.password, 8);
    const result = await clientmongo.db('Proyecto_final')
                    .collection('users')
                    .insertOne(user);
    return result;
}

async function updateUser(user){
    const clientmongo = await connection.getConnection();
    const query = {_id: new objectId(user._id)};
    const newvalues = { $set:{
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

async function findByCredentials(mail, password){
    const connectiondb = await connection.getConnection();
    const user = await connectiondb.db('Proyecto_final')
                        .collection('users')
                        .findOne({mail: mail});

    if(!user){
        throw new Error('Credenciales no validas');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Credenciales no validas');
    }
    
    return user;
}

function generateAuthToken(user){
    const token = jwt.sign({_id:user._id}, process.env.SECRET, {expiresIn: '2h'});
    return token;
}

module.exports = {getUsers, getUser, getUserByEmail, addUser, updateUser, deleteUser, findByCredentials, generateAuthToken}