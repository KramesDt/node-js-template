import express from "express";
import {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedback.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const feedbackRouter = express.Router();

feedbackRouter.post("/", createFeedback);
feedbackRouter.get("/", protect, authorize("admin"), getAllFeedbacks);
feedbackRouter.get("/:id", getFeedbackById); 
feedbackRouter.put("/:id", protect, authorize("admin"), updateFeedback); 
feedbackRouter.delete("/:id", protect, authorize("admin"), deleteFeedback); 

export default feedbackRouter;
