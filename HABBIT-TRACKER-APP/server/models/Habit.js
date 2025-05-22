import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    habitName: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['completed', 'missed', 'pending'],
      default: 'pending',
    },
    notes: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Habit = mongoose.model('Habit', habitSchema);
export default Habit;
