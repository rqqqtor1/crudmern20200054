const reviewsController = {};

//select

import reviewsModel from "../models/Reviews.js";

reviewsController.getReviews = async (req, res) =>{
    const reviews = await reviewsModel.find().populate("idClient")
    res.json(reviews)
}

//INSERT 

reviewsController.insertReviews = async (req, res) =>{
    const {comment, rating, idClient} = req.body;
    const newReview = new reviewsModel({comment, rating, idClient})
    await newReview.save()
    res.json({message: "Review saved"})
}

//Delete

reviewsController.deleteReviews = async(req, res) =>{
    await reviewsModel.findByIdAndDelete(req.params.id)
    res.json({message:"Reviews delete"})
}

//update

reviewsController.updateReviews = async(req, res) =>{
    const {comment, rating, idClient} = req.body;
    await reviewsModel.findByIdAndUpdate(
        req.params.id,
        {
            commet,
            rating,
            idClient,
        },
        {newReview}
    )
    
}
// Exportación por defecto
export default reviewsController;