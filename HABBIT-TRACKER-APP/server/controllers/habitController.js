import Habit from '../models/Habit.js'; // Make sure this file exists and model is named correctly

// @desc    Create a new habit
// @route   POST /api/habits
// @access  Private
export const createHabit = async (req, res) => {
    try {
        const { habitName, status, notes } = req.body;

        if (!habitName) {
            return res.status(400).json({ message: "Habit name is required" });
        }

        const newHabit = new Habit({
            user: req.user.id,
            habitName,
            status: status || "pending",
            notes,
        });

        const savedHabit = await newHabit.save();
        res.status(201).json(savedHabit);
    } catch (error) {
        console.error("Create habit error:", error);
        res.status(500).json({ message: "Server error creating habit" });
    }
};

// @desc    Get all habits for logged-in user
// @route   GET /api/habits
// @access  Private
export const getHabits = async (req, res) => {
    try {
        const habits = await Habit.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(habits);
    } catch (error) {
        console.error("Get habits error:", error);
        res.status(500).json({ message: "Server error fetching habits" });
    }
};

// @desc    Update a habit by ID
// @route   PUT /api/habits/:id
// @access  Private
export const updateHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }

        if (habit.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to update this habit" });
        }

        habit.habitName = req.body.habitName || habit.habitName;
        habit.status = req.body.status ?? habit.status;
        habit.notes = req.body.notes || habit.notes;

        const updatedHabit = await habit.save();
        res.json(updatedHabit);
    } catch (error) {
        console.error("Update habit error:", error);
        res.status(500).json({ message: "Server error updating habit" });
    }
};

// @desc    Delete a habit by ID
// @route   DELETE /api/habits/:id
// @access  Private
export const deleteHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }

        if (habit.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to delete this habit" });
        }

        await habit.deleteOne();
        res.json({ message: "Habit deleted successfully" });
    } catch (error) {
        console.error("Delete habit error:", error);
        res.status(500).json({ message: "Server error deleting habit" });
    }
};
