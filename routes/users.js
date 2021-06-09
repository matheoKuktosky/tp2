//    <iframe width="100%" height="710" frameborder="0" scrolling="no" src="https://www.sofascore.com/embed/player/neymar/124712" id="sofa-player-embed-124712">    </iframe><script>    (function (el) {      window.addEventListener("message", (event) => {        if (event.origin.startsWith("https://www.sofascore")) {          if (el.id === event.data.id) {            el.style.height = event.data.height + "px";          }        }      });    })(document.getElementById("sofa-player-embed-124712"));    </script>  
const express = require('express')
const router = express.Router()
const dataUser = require('../data/users')
const joi = require('joi')
/* GET users listing. */
router.get('/', async (req, res, next) => {
    let users = await dataUser.getUsers()
    res.json(users)
})

router.get('/:id', async (req,res) => {
    let user = await dataUser.getUser(req.params.id)
    if(user)
        res.json(user)
    else
        res.status(404).send('User not found')
    
})

router.post('/new', async (req,res) => {
    const schema = joi.object({
        name: joi.string().min(3).max(15).required(),
        username: joi.string().min(3).max(15).required(),
        password: joi.string().min(3).max(15).required(),
        email: Joi.string().email().max(15).required()
    })
    const result  = schema.validate(req.body.user)
    if(result.error){
        res.status(400).send(result.error.details[0].message)
    }
    else{
        const user = req.body.user
        const insertedUser = await dataUser.addUser(user)
        if(insertedUser)
            res.json(insertedUser)
        else
            res.status(404).send('User not inserted')        
    }
    
})

router.put('/:id', async (req,res) => {
    const user = req.body.user
    const updatedUser = await dataUser.updateUser({
        ...user,
        id: req.params.id
    })
    if(updatedUser)
        res.json(updatedUser)
    else
        res.status(404).send('User not updated')
    
})

router.delete('/:id', async (req,res) => {
    let user = await dataUser.getUser(req.params.id)
    
    if(user){
        await dataUser.deleteUser(req.params.id)    
        res.status(202).send('User deleted')
    }
    else
        res.status(404).send('User not found')
})

module.exports = router

