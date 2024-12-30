import Feedback from "../models/feedback.model.js"

// Create new feedback
export const createFeedback = async (req, res) => {
  try {
  const { helpful, feedback} = req.body
    const feedbacks = await Feedback.create({ helpful, feedback });
    await feedbacks.save();
    res.status(201).json({ success: true, data: feedbacks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating feedback", error: error.message });
  }
};

// Get all feedbacks
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json({ success: true, count: feedback.length, data: feedbacks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving feedbacks", error: error.message });
  }
};

// Get a single feedback by ID
export const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ success: false, message: "Feedback not found" });
    }
    res.json({ success: true, data: feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving feedback", error: error.message });
  }
};

// Update feedback by ID
export const updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feedback) {
      return res.status(404).json({ success: false, message: "Feedback not found" });
    }
    res.json({ success: true, data: feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating feedback", error: error.message });
  }
};

// Delete feedback by ID
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ success: false, message: "Feedback not found" });
    }
    res.json({ success: true, message: "Feedback deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting feedback", error: error.message });
  }
};
