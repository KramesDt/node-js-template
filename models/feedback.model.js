import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema({
  helpful: {
    type: Boolean,
  },
  feedback: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Feedback", feedbackSchema);