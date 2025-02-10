import { X } from "lucide-react";
import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line} from "recharts";

const Progress = ({workouts}) => {
    const aggregateData = workouts.reduce((acc, workout) => {
        if(workout.timestamp) {
            const date = workout.timestamp.split(",")[0];
            acc[date] = (acc[date] || 0) + 1;
        }

        return acc;
    }, {});

    const chartData = Object.entries(aggregateData).map(([date, count]) => ({
        date,
        count,
    }));

    //Exercise search state
    const [exerciseSearch, setExerciseSearch] = useState("");

    //Filter workouts by exercise
    const filteredExerciseWorkouts = workouts.filter((workout) => {
        return workout.exercise && workout.exercise.toLowerCase() === exerciseSearch.toLowerCase()
    });

    // Create Chart Data
    const exerciseChartData = filteredExerciseWorkouts.length > 0
        ? filteredExerciseWorkouts
            // Filter out any workouts missing required properties to avoid errors
            .filter(workout => workout.timestamp && workout.weight)
            .map(workout => ({
                date: workout.timestamp.split(",")[0],
                weight: parseFloat(workout.weight),
            }))
            .sort((a, b) => new Date(a.date) - new Date(b.date))
    : [];

    return (
        <div className="container px-4 sm:px-6 lg:px-8 max-w-full overflow-hidden mx-auto">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">Progress Tracking</h2>
            <h3 className="text-lg font-bold">Activity</h3>
            <div className="w-full h-80 mb-4">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
                    <XAxis dataKey="date" stroke="#6b7280"/>
                    <YAxis stroke="#6b7280"/>
                    <Tooltip contentStyle={{ backgroundColor: "#101828", border: "none", color: ""}} />
                    <Bar dataKey="count" fill="#4A90E2" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div >
                <h3 className="text-lg font-bold mb-4">Exercise Search</h3>
                <input type="text" value={exerciseSearch} onChange={(e) => setExerciseSearch(e.target.value)} placeholder="Enter exercise name (e.g., Push-ups)" className="w-full p-2 border rounded mb-4"/>
                {exerciseSearch ? (
                    filteredExerciseWorkouts.length > 0 ? (
                        <div>
                        <h4 className="text-md font-semibold mb-2">
                            Weight Progress for {exerciseSearch}
                        </h4>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={exerciseChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="weight" stroke="#FF5733" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                        </div>
                    ) : (
                        <p className="text-gray-500">No workouts found for "{exerciseSearch}".</p>
                    )
                ) : null}
            </div>
        </div>
    );
};

export default Progress;
