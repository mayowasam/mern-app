const express = require('express')
const router = express.Router()
const {auth,getData,getOne, updateUser, newUser, login, deleteUser, Token,logout} = require('./controller')



router.get('/',auth, getData )

router.get('/:id', getOne )

router.post('/newuser', newUser)
router.post('/login', login)
router.post('/token', Token)


router.patch('/updateuser/:id', updateUser)
router.post('/deleteuser', deleteUser)
router.post('/logout', logout)


module.exports= router

