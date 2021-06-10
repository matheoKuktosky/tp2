const express = require('express')
const router = express.Router()
const categoriaData = require('../data/categoriadb')
const joi = require('joi')

router.get('/', async (req, res, next) => {
    let categorias = await categoriaData.getCategorias()
    res.json(categorias)
})

router.get('/:id', async (req,res) => {
    let categoria = await categoriaData.getCategoria(req.params.id)
    if(categoria)
        res.json(categoria)
    else
        res.status(404).send('categoria not found')
})

router.post('/new', async (req,res) => {
    const schema = joi.object({
        nombre: joi.string().min(3).required(),
    })
    const result  = schema.validate(req.body.categoria)
    if(result.error){
        res.status(400).send(result.error.details[0].message)
    }
    else{
        const categoria = req.body.categoria
        const insertedCategoria = await categoriaData.addCategoria(categoria)
        if(insertedCategoria)
            res.json(insertedCategoria)
        else
            res.status(404).send('Categoria not inserted')        
    }
    
})

router.put('/:id', async (req,res) => {
    const categoria = req.body.categoria
    const updatedPublicaicon = await categoriaData.updateCategoria({
        ...categoria,
        _id: req.params.id
    })
    if(updatedPublicaicon)
        res.json(updatedPublicaicon)
    else
        res.status(404).send('Categoria not updated')
})

router.delete('/:id', async (req,res) => {
    let categoria = await categoriaData.getCategoria(req.params.id)
    if(categoria){
        await categoriaData.deleteCategoria(req.params.id)
        res.status(200).send('Categoria deleted')
    }
    res.status(404).send('Categoria not found')
})

module.exports = router

