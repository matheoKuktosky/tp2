const connection = require('./connection');
let objectId = require('mongodb').ObjectId;

async function getCategorias(){
    const clientmongo = await connection.getConnection();
    const categoria = await clientmongo.db('Proyecto_final')
                    .collection('categoria')
                    .find()
                    .toArray();
    return categoria;
}

async function getCategoria(id){
    const clientmongo = await connection.getConnection();
    const categoria = await clientmongo.db('Proyecto_final')
                    .collection('categoria')
                    .findOne({_id: new objectId(id)});
    return categoria;
}

async function addCategoria(categoria){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('Proyecto_final')
                    .collection('categoria')
                    .insertOne(categoria);
    return result;
}

async function updateCategoria(categoria){
    const clientmongo = await connection.getConnection();
    const query = {_id: new objectId(categoria._id)};
    const newvalues = { $set:{
            nombre: categoria.nombre
        }
    };
    const result = await clientmongo.db('Proyecto_final')
                    .collection('categoria')
                    .updateOne(query, newvalues);
    return result;
}

async function deleteCategoria(id){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('Proyecto_final')
                    .collection('categoria')
                    .deleteOne({_id: new objectId(id)});
    return result;
}

module.exports = {getCategorias, getCategoria, addCategoria, updateCategoria, deleteCategoria};