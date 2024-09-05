
const Auther = require('../models/autherModel');

const getAllAuthers = async (req, res) =>{
    const authers = await Auther.find({});
    res.json(authers)
}
const getAutherById = async (req, res) =>{
    try{
        console.log(req.params)
        const auther = await Auther.findById(req.params.autherId)
        if(auther){
            res.status(200).json({
                massage: "Auther found successfully",
                auther: auther
            })
        } else {
            res.status(404).json({
                massage: "Auther not found"
            })
        }
    }
    catch(error){
        res.status(500).json({
            massage: "Error retrieving the auther",
            error: error.massage
        })
    }
}
const addAuther = async (req, res) =>{
    const autherData = req.body
    const auther = new Auther(autherData)
    await auther.save()
    res.json(auther)
}
const updateAuther = async (req, res) =>{
    try{
        const updatedAuther = await Auther.findByIdAndUpdate(req.params.autherId, req.body, {new: true})

        if (updatedAuther) {
            // If the book was found and updated
            res.status(200).json({
                message: 'Auther data updated successfully',
                updatedAuther: updatedAuther
            });
        } else {
            // If no book was found with the given ID
            res.status(404).json({
                message: 'Auther not found'
            });
        }
    }
    catch(error){
        res.status(500).json({
            message: 'Error updating the Auther data',
            error: error.message
        });
    }
}
const deleteAuther = async (req, res) =>{
    // console.log(req.params.autherId)
    try {
        // Find the auther with the given ID and delete it
        const deletedAuther = await Auther.findOneAndDelete({ _id: req.params.autherId });

        if (deletedAuther) {
            // If a auther was found and deleted
            res.status(200).json({
                message: 'Auther deleted successfully',
                deletedAuther: deletedAuther
            });
        } else {
            // If no auther was found with the given ID
            res.status(404).json({
                message: 'Auther not found'
            });
        }
    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({
            message: 'Error deleting the auther',
            error: error.message
        });
    }
    // res.send("Here can delete specific auther")
}

module.exports = {
    getAllAuthers,
    getAutherById,
    addAuther,
    updateAuther,
    deleteAuther
}