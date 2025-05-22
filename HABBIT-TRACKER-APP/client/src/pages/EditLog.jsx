// src/editlog.js

// Function to update a habit via API
export const updateHabit = async (id, updatedData, token) => {
    try {
        const res = await fetch(`http://localhost:5000/api/habits/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedData),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Failed to update habit');
        }

        return data; // updated habit object
    } catch (error) {
        console.error('Error updating habit:', error.message);
        throw error;
    }
};
