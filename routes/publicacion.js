const express = require('express')
const router = express.Router()
const publicacionData = require('../data/publicacion')
const joi = require('joi')

router.get('/', async (req, res, next) => {
    let publicaciones = await publicacionData.getPublicaciones()
    res.json(publicaciones)
})

router.get('/:id', async (req,res) => {
    let publicacion = await publicacionData.getPublicacion(req.params.id)
    if(publicacion)
        res.json(publicacion)
    else
        res.status(404).send('publicacion not found')
})

router.post('/new', async (req,res) => {
    const schema = joi.object({
        nombre: joi.string().min(3).required(),
        categoria: joi.string().min(3).required(),
        cantidadPostulantes: joi.number().min(0).max(100).required(),
    })
    const result  = schema.validate(req.body.publicacion)
    if(result.error){
        res.status(400).send(result.error.details[0].message)
    }
    else{
        const publicacion = req.body.publicacion
        const insertedPublicacion = await publicacionData.addPublicacion(publicacion)
        if(insertedPublicacion)
            res.json(insertedPublicacion)
        else
            res.status(404).send('Publicacion not inserted')        
    }
    
})

router.put('/:id', async (req,res) => {
    const publicacion = req.body.publicacion
    const updatedPublicaicon = await publicacionData.updatePublicacion({
        ...publicacion,
        id: req.params.id
    })
    if(updatedPublicaicon)
        res.json(updatedPublicaicon)
    else
        res.status(404).send('Publicacion not updated')
    
})

router.delete('/:id', async (req,res) => {
    let publicacion = await publicacionData.getPublicacion(req.params.id)
    if(publicacion){
        await publicacionData.deletePublicacion(req.params.id)
        res.status(200).send('Publicacion deleted')
    }
    res.status(404).send('Publicacion not found')
})

module.exports = router

