// controllers/reviewsController.js
const reviewsController = {};
import reviewsModel from "../models/Reviews.js";

// SELECT
reviewsController.getReviews = async (req, res) => {
    try {
        const reviews = await reviewsModel.find().populate("idClient");
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// INSERT 
reviewsController.insertReviews = async (req, res) => {
    try {
        const { comment, rating, idClient } = req.body;
        const newReview = new reviewsModel({ comment, rating, idClient });
        await newReview.save();
        res.status(201).json({ message: "Review saved", review: newReview });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// DELETE
reviewsController.deleteReviews = async (req, res) => {
    try {
        const review = await reviewsModel.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ error: "Review no encontrada" });
        }
        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// UPDATE - CORREGIDO
reviewsController.updateReviews = async (req, res) => {
    try {
        const { comment, rating, idClient } = req.body;
        const updatedReview = await reviewsModel.findByIdAndUpdate(
            req.params.id,
            {
                comment,  // Era "commet" (error tipográfico)
                rating,
                idClient,
            },
            { new: true } // Era "newReview" (incorrecto)
        );
        
        if (!updatedReview) {
            return res.status(404).json({ error: "Review no encontrada" });
        }
        
        res.json({ message: "Review updated successfully", review: updatedReview });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export default reviewsController;