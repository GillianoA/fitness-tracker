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

        const newWorkout = {
            ...form,
            timestamp: new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            }),
        };
        setWorkouts([...workouts, newWorkout]);
        setForm({
            date: "",
            exercise: "",
            sets: "",
            reps: "",
            weight: "",
        });
    };

    return(
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-">Log your Workout</h2>
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
                        <input type="number" name="weight" value={form.weight} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="e.g. 50lbs"/>
                    </div>
                </div>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded flex items-center justify-center gap-2"><Plus className="w-5 h-5" />Add Workout</button>
            </form>
            <div className="mt-4">
                <h3 className="text-lg font-bold">Workout Log</h3>
                {workouts.length === 0 ? (
                    <p className="text-gray-500">No workouts logged yet</p>
                ) : (
                    <ul className="space-y-2">
                        {workouts.map((workout, index) => (
                            <li key={index} className="border border-gray-300 p-2 rounded">
                                <h4 className="text-lg font-bold">{workout.exercise}</h4>
                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <p>Sets: {workout.sets}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p>Reps: {workout.reps}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p>Weight: {workout.weight}lbs</p>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500">Logged on: {workout.timestamp}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default WorkoutLog;
