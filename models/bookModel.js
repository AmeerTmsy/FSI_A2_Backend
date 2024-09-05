const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: String,
    thumbnail: String,
    rating: Number,
    price: Number,
    discription: String,
    auther: {
        type: mongoose.ObjectId,
        ref: 'Auther'
    },
    bookGenre: {
        type: mongoose.ObjectId,
        ref: 'BookGenre'
    } 
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book 