const fs = require('fs').promises
const path = './data/publicaciones.json'

async function getPublicaciones(){
    const publicaciones = await fs.readFile(path, 'utf-8')
    return JSON.parse(publicaciones)
}

async function getPublicacion(id){
    const publicaciones = await getPublicaciones()
    return publicaciones.find(publicacion => publicacion.id == id)
}

async function addPublicacion(publicacion){
    const publicaciones = await getPublicaciones()
    publicaciones.sort((a, b)  => a.id - b.id)
    const lastId = publicaciones[publicaciones.length-1].id
    publicacion.id = lastId + 1
    publicaciones.push(publicacion)
    await fs.writeFile(path, JSON.stringify(publicaciones, null, ' '))
    
    return publicacion
}

async function updatePublicacion(publicacion){
    const publicaciones = await getPublicaciones()
    const index = publicaciones.findIndex(publ => publ.id == publicacion.id)
    if(publicacion.nombre){
        publicaciones[index].nombre = publicacion.nombre
    }
    if(publicacion.categoria){
        publicaciones[index].categoria = publicacion.categoria
    }
    if(publicacion.cantidadPostulantes){
        publicaciones[index].cantidadPostulantes = publicacion.cantidadPostulantes
    }

    await fs.writeFile(path, JSON.stringify(publicaciones, null, ' '))

    return publicaciones[index]
}

async function deletePublicacion(id){
    const publicaciones = await getPublicaciones()
    const index = publicaciones.findIndex(publ => publ.id == id)
    publicaciones.splice(index, 1)
    await fs.writeFile(path, JSON.stringify(publicaciones, null, ' '))
}

module.exports = {getPublicaciones, getPublicacion, addPublicacion, updatePublicacion, deletePublicacion}