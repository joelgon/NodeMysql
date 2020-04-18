const express = require('express')
const router = express.Router()
const db = require('../models')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
require('dotenv/config')


//Select All
router.get('/all', async (req, res) => {
    const user = await db.user.findAll()
    user.Password = undefined
    return res.send(user)
})

//Select by Id
router.get('/find/:id', async (req, res) => {
    const user = await db.user.findAll({
        where: {
            id: req.params.id
        }
    })
    user.Password = undefined
    return res.send(user)
})

//Create token
router.post('/login', async (req, res) => {

    try {
        const user = await db.user.findAll({
            where: { 
                Email: req.body.Email, 
                Password:  crypto.createHash('md5').update(req.body.Password).digest('hex') 
            }
        })

        if (!user) {
            return res.send(401)            
        }
        const token = jwt.sign( {user: user.id}, process.env.secret, {expiresIn: 600} )
        user.Password = undefined
        res.send({ user, token: token})
    } catch (error) {
        res.send(error)
    }

})

//Create new user
router.post('/new', async(req, res) => {
    try {
        const user = await db.user.create({
            Name: req.body.Name,
            Email: req.body.Email,
            Password: crypto.createHash('md5').update(req.body.Password).digest('hex')
        })
        user.Password = undefined
        return  res.send(user)
    } catch (error) {
        res.send(error)
    }
})

//delete User
router.delete('/del/:id', async (req, res) => {
    await db.user.destroy({
        where: {
            id: req.params.id
        }
    })
    return res.send('Success')
})

//Update User
router.put('/edit', async ( req, res ) => {
    const user = await db.user.update({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password
    }, {
        where:{
            id: req.body.id
        }
    })
    user.Password = undefined
    return res.send(user)
})

module.exports = router