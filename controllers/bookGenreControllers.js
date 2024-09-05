const BookGenre = require("../models/bookGenreModel");

const getAllGenre = async (req, res) => {
    const genres = await BookGenre.find({});
    res.json(genres)
}

const getGenreById = async (req, res) => { 
    try{
        const genre = await BookGenre.findById(req.params.genreId)
        if(genre){
            res.status(200).json({
                massage: "Genre found successfully",
                genre: genre
            })
        } else {
            res.status(404).json({
                massage: "Genre not found"
            })
        }
    }
    catch(error){
        res.status(500).json({
            massage: "Error retrieving the Genre",
            error: error.massage
        })
    }
}
const addGenre = async (req, res) => {
    const genre = new BookGenre(req.body);
    await genre.save()
    res.json(genre)
}

module.exports = {
    getAllGenre,
    getGenreById,
    addGenre
}