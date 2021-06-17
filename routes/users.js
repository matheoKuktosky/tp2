const express = require('express')
const router = express.Router()
const dataUser = require('../data/usersdb') 
const joi = require('joi')

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

router.post('/', async (req,res) => {
    const schema = joi.object({
        username: joi.string().min(3).max(15).required(),
        password: joi.string().min(3).max(15).required(),
        mail: joi.string().email().max(30).required()
    })
    const result  = schema.validate(req.body.user)
    if(result.error){
        res.status(400).send(result.error.details[0].message)
    }
    else{
        const user = req.body.user
        const userWithMail = await dataUser.getUserByEmail(user.mail)
        if(userWithMail){
            res.status(404).send('Email already registered')
        }
        else{
            const insertedUser = await dataUser.addUser(user)
            if(insertedUser)
                res.json(insertedUser)
            else
                res.status(404).send('User not inserted')
        }                
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

router.post('/login', async (req, res)=>{
    try {
      const user = await dataUser.findByCredentials(req.body.mail, req.body.password);
      const token = dataUser.generateAuthToken(user);
      res.send({user, token});
    } catch (error) {
        res.status(401).send(error.message);
    }
});

module.exports = router

