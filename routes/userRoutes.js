const express = require('express')
const { addUser, getAllUsers } = require('../controllers/userControllers')
const router = express.Router()

router.get('/', getAllUsers)
router.post('/', addUser)

module.exports = router