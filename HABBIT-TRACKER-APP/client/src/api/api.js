export const updateHabit = async (id, updatedData, token) => {
    const res = await fetch(`http://localhost:5000/api/habits/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Update failed');
    return data;
};
