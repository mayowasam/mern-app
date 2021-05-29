const express = require('express')
const router = express.Router()
const {getData,getOne, updateUser, newUser, login, deleteUser} = require('./controller')



router.get('/', getData )

router.get('/:id', getOne )

router.post('/newuser', newUser)
router.post('/login', login)


router.patch('/updateuser/:id', updateUser)
router.post('/deleteuser', deleteUser)


module.exports= router

