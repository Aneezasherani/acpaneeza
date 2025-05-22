import User from '../models/User.js';
import Habit from '../models/Habit.js';

// @desc    Get all users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching users' });
  }
};

// @desc    Delete a user (Admin only)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.deleteOne();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting user' });
  }
};

// @desc    Get all habits from all users (Admin only)
export const getAllHabits = async (req, res) => {
  try {
    const habits = await Habit.find().populate('user', 'username email');
    res.json(habits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching habits' });
  }
};

// @desc    Delete any habit (Admin only)
export const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    await habit.deleteOne();
    res.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting habit' });
  }
};
