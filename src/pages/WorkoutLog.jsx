import React, { useState } from "react";
import { Plus } from "lucide-react";

const WorkoutLog = () => {
    //Initial state for the form and workouts
    const [workouts, setWorkouts] = useState([]);
    const [form, setForm] = useState({
        date: "",
        exercise: "",
        sets: "",
        reps: "",
        weight: "",
    });

    //function to handle input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    //function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setWorkouts([...workouts, form]);
        setForm({
            exercise: "",
            sets: "",
            reps: "",
            weight: "",
            date: "",
        });
    };

    return(
        <div className="container max-w-xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-">Log your Workout</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Exercise Name</label>
                    <input type="text" name="exercise" value={form.exercise} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="e.g. Push-ups"/>
                </div>
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="block mb-1">Sets</label>
                        <input type="number" name="sets" value={form.sets} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="e.g. 3"/>
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1">Reps</label>
                        <input type="number" name="reps" value={form.reps} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="e.g. 10"/>
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1">Weight</label>
                        <input type="number" name="weight" value={form.weight} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="e.g. 50"/>
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1">Date</label>
                        <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                </div>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded flex items-center justify-center gap-2"><Plus className="w-5 h-5" />Add Workout</button>
            </form>
        </div>
    );
};

export default WorkoutLog;
