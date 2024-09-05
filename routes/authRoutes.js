const express = require('express')
const { login, verifyLogin, logout } = require('../controllers/authControllers')
const { checkLogin } = require('../middlewares/checkLogin')
const router = express.Router()

router.post('/login', login)
router.post('/logout', logout)
router.get('/verify', checkLogin, verifyLogin)

module.exports = router