const express = require('express')
const { register,login,getUser, userLogout, getAllUsers, updateUser } = require('../controllers/user.controller')
const { authToken } = require('../middlewares/userDetails')

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/user',authToken,getUser)
router.get('/logout',userLogout)
router.get('/get-all-users',authToken,getAllUsers)
router.post('/update-user',authToken,updateUser)
module.exports = router