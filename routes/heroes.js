//    <iframe width="100%" height="710" frameborder="0" scrolling="no" src="https://www.sofascore.com/embed/player/neymar/124712" id="sofa-player-embed-124712">    </iframe><script>    (function (el) {      window.addEventListener("message", (event) => {        if (event.origin.startsWith("https://www.sofascore")) {          if (el.id === event.data.id) {            el.style.height = event.data.height + "px";          }        }      });    })(document.getElementById("sofa-player-embed-124712"));    </script>  
const express = require('express')
const router = express.Router()
const dataHeroe = require('../data/heroes')
const joi = require('joi')
/* GET users listing. */
router.get('/', async (req, res, next) => {
    let heroes = await dataHeroe.getHeroes()
    res.json(heroes)
})

router.get('/:id', async (req,res) => {
    let heroe = await dataHeroe.getHeroe(req.params.id)
    if(heroe)
        res.json(heroe)
    else
        res.status(404).send('Heroe not found')
    
})

router.post('/new', async (req,res) => {
    const schema = joi.object({
        name: joi.string().min(3).required(),
        power: joi.number().min(0).max(9999).required(),
        iq: joi.number().min(0).max(9999).required(),
    })
    const result  = schema.validate(req.body.heroe)
    if(result.error){
        res.status(400).send(result.error.details[0].message)
    }
    else{
        const heroe = req.body.heroe
        const insertedHeroe = await dataHeroe.addHeroe(heroe)
        if(insertedHeroe)
            res.json(insertedHeroe)
        else
            res.status(404).send('Heroe not inserted')        
    }
    
})

router.put('/:id', async (req,res) => {
    const heroe = req.body.heroe
    const updatedHeroe = await dataHeroe.updateHeroe({
        ...heroe,
        id: req.params.id
    })
    if(updatedHeroe)
        res.json(updatedHeroe)
    else
        res.status(404).send('Heroe not updated')
    
})

router.delete('/:id', async (req,res) => {
    //hacer get de heroe para saber si existe antes de borrarlo asi muestro 200
    await dataHeroe.deleteHeroe(req.params.id)    
})

module.exports = router

