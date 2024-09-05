const Book = require('../models/bookModel')

const getAllBooks = async (req, res) => {
    const queryPara = {...req.query}
    console.log(queryPara)
    delete queryPara.sort
    // delete queryPara.limit
    delete queryPara.select 
    delete queryPara.price 
    
    let books = Book.find(queryPara);
    
    if(req.query.sort) {
        books = books.sort(req.query.sort)
    }

    // books = books.limit(req.query.limit ? req.query.limit : 7)

    if(req.query.select){
        const spaceSeperated = req.query.select.replace(',', ' ')
        books = books.select(spaceSeperated)
    }
    if(req.query.price == "price" || req.query.price == "-price" ) books = books.sort(req.query.price)
    if(req.query.price == "-rating") books = books.sort(req.query.price)

    books = await books  
    res.json(books)
}
const getBookById = async (req, res) => { 
    try{
        const book = await Book.findById(req.params.bookId)
        if(book){
            res.status(200).json({
                massage: "Book found successfully",
                book: book
            })
        } else {
            res.status(404).json({
                massage: "Book not found"
            })
        }
    }
    catch(error){
        res.status(500).json({
            massage: "Error retrieving the book",
            error: error.massage
        })
    }
}
const addBook = async (req, res) => {
    const bookData = req.body
    const book = new Book(bookData)
    await book.save()
    res.json(book)
}
const updateBook = async (req, res) => {
    try{
        const updatedbook = await Book.findByIdAndUpdate(req.params.bookId, req.body, {new: true})

        if (updatedbook) {
            // If the book was found and updated
            res.status(200).json({
                message: 'Book data updated successfully',
                updatedbook: updatedbook
            });
        } else {
            // If no book was found with the given ID
            res.status(404).json({
                message: 'Book not found'
            });
        }
    }
    catch(error){
        res.status(500).json({
            message: 'Error updating the book data',
            error: error.message
        });
    }
}
const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findOneAndDelete({ _id: req.params.bookId });

        if (deletedBook) {
            res.status(200).json({
                message: 'Book deleted successfully',
                deletedBook: deletedBook
            });
        } else {
            res.status(404).json({
                message: 'Book not found'
            });
        }
    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({
            message: 'Error deleting the book',
            error: error.message
        });
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook
}