const express = require('express')
const usercontroller = express()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const fs = require('fs')
const multer = require('multer') 
const path = require('path')



const stockage = multer.diskStorage({
  destination: './uploads', 
  filename: function (req, file, cb) {    
      cb(null, Date.now() + path.extname(file.originalname)) 
  }
})

function check(file, cb) {
  
  const types = /jpeg|jpg|png|gif|pdf /;
  const verifExt = types.test(path.extname(file.originalname).toLowerCase()) 
  const verifMime = types.test(file.mimetype)

  if (verifExt && verifMime) {
      return cb(null, true) 
  }
  else {
      cb('Invalid File Type')
  }
}

const upload = multer({
  storage: stockage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
      check(file, cb)
  }
})
/*********** UserController API ***********/
usercontroller.get('/', (req, res) => {
    res.status(200).send("Welcome to userController")
})

/*********** Signup API ***********/
usercontroller.post('/signup',upload.single('photo'),async (req, res) => {
    try {
        let data = req.body
        let url=req.protocol+'://'+req.get('host')
        data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))
        let user = new User({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            photo: url+'/uploads/'+req.file.filename,
            service: data.service,
            post: data.post,
            password: data.password,
        })
            let userFromDb = await user.save()
            res.status(201).send({ message: 'user registred succefully' })
		
    } catch (error) {
        res.status(400).send({ message: 'email all ready exist', error })
    }
})

/*********** Get All API ***********/
usercontroller.get('/all', async (req, res) => {
    try {

        let users = await User.findAll()

        res.status(200).send(users)

    } catch (error) {

        res.status(400).send({ message: 'API failed', error })
    }
})

/*********** Get One API ***********/
usercontroller.get('/one/:id', async (req, res) => {
    try {
        let id = req.params.id;

        let user = await User.findOne({where:{id:id}})

        if (!user) {
            res.status(404).send({ message: "user cannot found" })
        }
        else {
            res.status(200).send(user)
        }
    } catch (error) {
        res.status(400).send({ message: 'API failed', error })
    }
})

/*********** Delete API ***********/
usercontroller.delete('/remove/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let deletedUser = await User.destroy({ where: { id:id } })
        if (!deletedUser) {
            res.status(404).send({ message: 'User not found' })
        }
        else {
            res.status(200).send({ message: 'User deleted succefuly' })
        }
    } catch (error) {
        res.status(400).send({ message: 'API failed', error })
    }
})

/*********** Update API ***********/
usercontroller.put('/update/:id',upload.single('photo'),async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body
        let url=req.protocol+'://'+req.get('host')
        data.photo= url+'/uploads/'+req.file.filename
        if (data.password){
        data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))
        }
        let updatedUser = await User.update(data,{where: { id: id }})
        if (updatedUser==false) {
            res.status(404).send({ message: 'User not found' })
        }
        else {
            res.status(200).send({ message: 'User updated succefuly' })
        }
    } catch (error) {
        res.status(400).send({ message: 'API failed', error })
    }
})

/*********** Signin API ***********/
usercontroller.post('/signin', async (req, res) => {
    try {
        let data = req.body
        let userFromDb = await User.findOne({where:{ email: data.email }})
        if (!userFromDb) {
            res.status(404).send({ message: 'Email Adress is invalid' })
        }
        else {
            let compare = bcrypt.compareSync(data.password, userFromDb.password)
            if (!compare) {
                res.status(404).send({ message: 'Password is invalid' })
            }
            else {
                let token=jwt.sign({id:userFromDb.id,role:userFromDb},"SECRET")
                res.status(200).send({token})
            }
        }
    } catch (error) {
        res.status(400).send({ message: 'API failed', error })
    }
})



module.exports = usercontroller