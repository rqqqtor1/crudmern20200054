import express from "express";
import registerclientController from "../controllers/registerclientController.js";

const router = express.Router();

router.route("/").post(registerclientController.register)
router.route("/verifyCodeEmail").post(registerclientController.verifyEmail)

export default router;