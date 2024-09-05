const express = require('express')
const { getAllGenre, addGenre, getGenreById } = require('../controllers/bookGenreControllers')
const router = express.Router()

router.get('/', getAllGenre)
router.get('/:genreId', getGenreById)
router.post('/', addGenre)

module.exports = router