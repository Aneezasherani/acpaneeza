import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createHabit,
  getHabits,
  deleteHabit,
  updateHabit, // <-- import this
} from '../controllers/habitController.js';

const router = express.Router();

router.post('/', protect, createHabit);
router.get('/', protect, getHabits);
router.delete('/:id', protect, deleteHabit);
router.put('/:id', protect, updateHabit); // <-- this line

export default router;
