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
    const [oneRepMax, setOneRepMax] = useState(null);

    //Filter workouts by exercise
    const filteredExerciseWorkouts = workouts.filter(
        (workout) => workout.exercise.toLowerCase() === exerciseSearch.toLowerCase()
    );

    // Create Chart Data
    const exerciseChartData = filteredExerciseWorkouts.map((workout) => ({
        date: workout.timestamp.split(",")[0],
        weight: parseFloat(workout.weight),
    }));

    //Function to calculate one rep max
    const calculateOneRepMax = (exerciseName) => {
        const filteredWorkouts = filteredExerciseWorkouts.filter(
            (workout) => parseFloat(workout.weight) > 0 
        );

        if(filteredWorkouts.length === 0) {
            setOneRepMax(null);
            return;
        }

        //Get the execercise with the highest weight
        const maxWeightExercise = filteredWorkouts.reduce((max, workout) =>
            parseFloat(workout.weight) > parseFloat(max.weight) ? workout : max, filteredWorkouts[0]
        );

        const { weight, reps } = maxWeightExercise;
        const oneRM = Math.round(weight / (1.0278 - 0.0278 * reps));

        setOneRepMax(oneRM);
    }

    return (
        <div className="container px-4 sm:px-6 lg:px-8 max-w-full overflow-hidden mx-auto">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">Progress Tracking</h2>
            <h3 className="text-lg font-bold">Activity (Exercises Completed)</h3>
            <div className="w-full h-80 mb-4">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
                    <XAxis dataKey="date" stroke="#6b7280"/>
                    <YAxis stroke="#6b7280"/>
                    <Tooltip wrapperStyle={{ transition: "transform 0.15s linear" }} contentStyle={{ borderRadius: "5px", backgroundColor: "#101828", border: "none", color: ""}} cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}/>
                    <Bar dataKey="count" fill="#4A90E2" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div >
                <h3 className="text-lg font-bold mb-4">Exercise Search</h3>
                <input type="text" 
                    value={exerciseSearch} 
                    onChange={(e) => setExerciseSearch(e.target.value) && calculateOneRepMax(e.target.value)}
                    placeholder="Enter exercise name (e.g., Push-ups)" 
                    className="w-full p-2 border rounded mb-4"
                />
                {exerciseSearch ? (
                    filteredExerciseWorkouts.length > 0 ? (
                        <>
                            {oneRepMax && (
                                <div className="flex items-center justify-between bg-gray-800 p-4 rounded mb-4">
                                    <h3 className="text-lg font-bold">Estimated 1RM for {exerciseSearch}</h3>
                                    <p className="text-xl font-semibold">{oneRepMax} lbs</p>
                                </div>
                            )}
                            <div>
                                <h4 className="text-md font-semibold mb-2">
                                    Weight Progress for {exerciseSearch}
                                </h4>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={exerciseChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip wrapperStyle={{ transition: "transform 0.15s linear" }} contentStyle={{ borderRadius: "8px", backgroundColor: "#101828", border: "none", color: ""}}/>
                                    <Line type="monotone" dataKey="weight" stroke="#FF5733" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-500">No workouts found for "{exerciseSearch}".</p>
                    )
                ) : null}
            </div>
        </div>
    );
};

export default Progress;
