const express = require('express')
const router = express.Router()
const publicacionData = require('../data/publicaciondb')
const postulacionData = require('../data/postulaciondb')
const usuarioData = require('../data/usersdb')
const categoriaData = require('../data/categoriadb')
const joi = require('joi')
const auth = require('../middleware/auth')

const getPostulacionesXpub = async(pubs) => {
    let arrayPubs = await Promise.all(pubs.map(async pub => {
        let idPublicacion = pub._id.toString()
        let posts = await postulacionData.getPostulacionesxPublicacion(idPublicacion)
        .then(async posts => await Promise.all(posts.map(async post  =>{
            let idUsuario = post.idUsuario
            let usuario = await usuarioData.getUser(idUsuario)
            let newPost = {...post, username: usuario.username}
            return newPost
        })))
        let userCreador = await usuarioData.getUser(pub.idUsuario)
        let categoria = await categoriaData.getCategoria(pub.idCategoria)
        let newpub = {...pub, creador: userCreador.username, categoria: categoria.nombre, postulaciones: posts}
        return newpub
    }))
    return arrayPubs
}

router.get('/', auth, async (req, res, next) => {
    await publicacionData.getPublicaciones()
    .then(async pubs =>  getPostulacionesXpub(pubs))
    .then(result => res.status(200).json(result))
    
})

router.get('/publicacion-user/:id', async (req,res) => {
    await publicacionData.getPublicacionesUsuario(req.params.id)
    .then(async pubs => getPostulacionesXpub(pubs))
    .then(result => {
        if(result)
            res.status(200).json(result)
        else
            res.status(404).send('publicaciones not found')
    })
})

router.get('/publicacion-categoria/:id', async (req,res) => {
    await publicacionData.getPublicacionesCategoria(req.params.id)
    .then(async pubs => getPostulacionesXpub(pubs))
    .then(result => {
        if(result)
            res.status(200).json(result)
        else
            res.status(404).send('publicaciones not found')
    })
})

router.post('/', async (req,res) => {
    const schema = joi.object({
        titulo: joi.string().min(1).required(),
        idUsuario: joi.string().min(1).required(),
        idCategoria: joi.string().min(1).required(),
        cantBuscada: joi.number().min(1).max(200).required(),
    })
    const result  = schema.validate(req.body)
    if(result.error){
        res.status(400).send(result.error.details[0].message)
    }
    else{
        const publicacion = req.body
        const insertedPublicacion = await publicacionData.addPublicacion(publicacion)
        if(insertedPublicacion)
            res.status(200).send('Publicacion created')    
        else
            res.status(404).send('Publicacion not inserted')        
    }  
})

router.put('/:id', async (req,res) => {
    const publicacion = req.body.publicacion
    const updatedPublicacion = await publicacionData.updatePublicacion({
        ...publicacion,
        _id: req.params.id
    })
    if(updatedPublicacion)
        res.json(updatedPublicacion)
    else
        res.status(404).send('Publicacion not updated')
})

router.delete('/:id', async (req,res) => {
    await publicacionData.getPublicacion(req.params.id).then(async pub => {
        if(pub){
            await publicacionData.deletePublicacion(req.params.id)
            await postulacionData.deletePostulacionesxPublicacion(req.params.id)
            res.status(200).send('Publicacion deleted')
        }
        else{
            res.status(404).send('Publicacion not found')
        }
    })
})

module.exports = router