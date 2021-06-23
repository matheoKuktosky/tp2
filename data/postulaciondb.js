const connection = require('./connection');
let objectId = require('mongodb').ObjectId;

async function getPostulacionesxUsuario(idUsuario){
    const clientmongo = await connection.getConnection();
    const postulaciones = await clientmongo.db('Proyecto_final')
                    .collection('postulacion')
                    .find({idUsuario: idUsuario})
                    .toArray();
    return postulaciones;
}

async function getPostulacionesxPublicacion(idPublicacion){
    const clientmongo = await connection.getConnection();
    const postulaciones = await clientmongo.db('Proyecto_final')
                    .collection('postulacion')
                    .find({idPublicacion: idPublicacion})
                    .toArray();
    return postulaciones;
}

async function getPostulacion(id){
    const clientmongo = await connection.getConnection();
   console.log(clientmongo);
    const publicacion = await clientmongo.db('Proyecto_final')
                    .collection('postulacion')
                    .findOne({_id: new objectId(id)});
    return publicacion;
}

async function addPostulacion(postulacion){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('Proyecto_final')
                    .collection('postulacion')
                    .insertOne(postulacion);
    return result;
}

async function updatePostulacion(postulacion){
    const clientmongo = await connection.getConnection();
    const query = {_id: new objectId(postulacion._id)};
    const newvalues = { $set:{
            estado: postulacion.estado
        }
    };
    console.log(newvalues)
    const result = await clientmongo.db('Proyecto_final')
                    .collection('postulacion')
                    .updateOne(query, newvalues);
    return result;
}

async function deletePostulacion(id){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('Proyecto_final')
                    .collection('postulacion')
                    .deleteOne({_id: new objectId(id)});
    return result;
}

module.exports = {getPostulacionesxUsuario, getPostulacion, getPostulacionesxPublicacion, addPostulacion, updatePostulacion, deletePostulacion};