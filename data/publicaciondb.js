const connection = require('./connection');
let objectId = require('mongodb').ObjectId;

async function getPublicaciones(){
    const clientmongo = await connection.getConnection();
   console.log(clientmongo);
    const publicacion = await clientmongo.db('Proyecto_final')
                    .collection('publicacion')
                    .find()
                    .toArray();
    return publicacion;
}

async function getPublicacionesUsuario(id){
    const clientmongo = await connection.getConnection();
   console.log(clientmongo);
    const publicacion = await clientmongo.db('Proyecto_final')
                    .collection('publicacion')
                    .find({idUsuario: id})
                    .toArray();
    return publicacion;
}

async function getPublicacionesCategoria(id){
    const clientmongo = await connection.getConnection();
   console.log(clientmongo);
    const publicacion = await clientmongo.db('Proyecto_final')
                    .collection('publicacion')
                    .find({idCategoria: id})
                    .toArray();
    return publicacion;
}

async function getPublicacion(id){
    const clientmongo = await connection.getConnection();
    const publicacion = await clientmongo.db('Proyecto_final')
                    .collection('publicacion')
                    .findOne({_id: new objectId(id)});
    return publicacion;
}

async function addPublicacion(publicacion){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('Proyecto_final')
                    .collection('publicacion')
                    .insertOne(publicacion);
    return result;
}

async function updatePublicacion(publicacion){
    const clientmongo = await connection.getConnection();
    const query = {_id: new objectId(publicacion._id)};
    const newvalues = { $set:{
            nombre: publicacion.nombre,
            cantidadPostulantes: publicacion.cantidadPostulantes
        }
    };
    console.log(newvalues)
    const result = await clientmongo.db('Proyecto_final')
                    .collection('publicacion')
                    .updateOne(query, newvalues);
    return result;
}

async function deletePublicacion(id){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('Proyecto_final')
                    .collection('publicacion')
                    .deleteOne({_id: new objectId(id)});
    return result;
}

module.exports = {getPublicaciones, getPublicacion, addPublicacion, updatePublicacion, deletePublicacion, getPublicacionesUsuario, getPublicacionesCategoria};