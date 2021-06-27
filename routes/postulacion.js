const express = require('express')
const router = express.Router()
const postulacionData = require('../data/postulaciondb')
const usuarioData = require('../data/usersdb')
const joi = require('joi')

router.get('/mis-postulaciones/:idUsuario', async (req, res, next) => {
    let postulaciones = await postulacionData.getPostulacionesxUsuario(req.params.idUsuario)
    res.json(postulaciones)
})

router.get('/', async (req, res, next) => {
    let postulacion = await postulacionData.getPostulaciones()
    res.json(postulacion)
})

router.get('/publicacion/:idPublicacion', async (req,res) => {
    let postulaciones = await postulacionData.getPostulacionesxPublicacion(req.params.idPublicacion)
    if(postulaciones)
        res.json(postulaciones)
    else
        res.status(404).send('postulaciones not found')
})

router.post('/', async (req,res) => {
    const schema = joi.object({
        estado: joi.string().min(3).required(),
        idUsuario: joi.string().min(1).required(),
        idPublicacion: joi.string().min(1).required(),
    })
    const result  = schema.validate(req.body)
    if(result.error){
        res.status(400).send(result.error.details[0].message)
    }
    else{
        const postulacion = req.body
        const insertedPostulacion = await postulacionData.addPostulacion(postulacion)
        if(insertedPostulacion)
            res.status(200).send('Postulacion created')    
        else
            res.status(404).send('Postulacion not inserted')        
    }  
})

router.put('/:id', async (req,res) => {
    const postulacion = req.body.postulacion
    const updatePostulacion = await postulacionData.updatePostulacion({
        ...postulacion,
        _id: req.params.id
    })
    if(updatePostulacion){
        const updatedPostulacion = await postulacionData.getPostulacion(req.params.id)
        .then(async post =>{
            let idUsuario = post.idUsuario
            let usuario = await usuarioData.getUser(idUsuario)
            let newPost = {...post, username: usuario.username}
            return newPost
            }
        )
        res.json(updatedPostulacion)
    }
    else
        res.status(404).send('Postulacion not updated')
})

router.delete('/:id', async (req,res) => {
    let postulacion = await postulacionData.getPostulacion(req.params.id)
    if(postulacion){
        await postulacionData.deletePostulacion(req.params.id)
        res.status(200).send('Postulacion deleted')
    }
    else
        res.status(404).send('Postulacion not found')
})

module.exports = router

