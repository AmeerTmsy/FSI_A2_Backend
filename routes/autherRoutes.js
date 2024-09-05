const express = require('express')
const { getAllAuthers, getAutherById, addAuther, updateAuther, deleteAuther } = require('../controllers/autherControllers')
const router = express.Router()

router.get('/', getAllAuthers)
router.get('/:autherId',getAutherById)
router.post('/', addAuther)
router.patch('/:autherId', updateAuther)
router.delete('/:autherId', deleteAuther)

module.exports = router