const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    genreTitle: String,
});

const BookGenre = mongoose.model('BookGenre', genreSchema);

module.exports = BookGenre