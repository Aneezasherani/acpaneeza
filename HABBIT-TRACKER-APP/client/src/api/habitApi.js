export const updateHabit = async (id, updatedData, token) => {
    const res = await fetch(`http://localhost:5000/api/habits/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update habit');
    }
    return await res.json();
};
