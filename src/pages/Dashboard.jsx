import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Dumbbell, Flame, BicepsFlexed, Plus, LineChart as LucideLineChart} from "lucide-react";

const Dashboard = ({workouts}) => {
    //Calculate total weight lifted
    const totalWeight = workouts.reduce((total, workout) => {
        return total + (workout.sets * workout.reps * workout.weight);
    }, 0);


    const dailyGoal = 7;
    const totalReps = workouts.reduce((acc, curr) => acc + parseInt(curr.reps || 0), 0);

    const today = new Date().toLocaleDateString();
    const workoutsToday = workouts.filter(workout => workout.timestamp?.split(",")[0] === today).length;

    const aggregatedData = workouts.reduce((acc, workout) => {
        if (workout.timestamp) {
            const date = workout.timestamp.split(",")[0];
            acc[date] = (acc[date] || 0) + 1;
        }
        return acc;
    }, {});

    const chartData = Object.entries(aggregatedData).map(([date, count]) => ({ date, count }));

    return (
        <div className="container px-4 sm:px-6 lg:px-8 max-w-full overflow-hidden mx-auto">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">Welcome to Your Fitness Dashboard</h2>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="card bg-gray-700 rounded-lg shadow p-4 flex-1 flex flex-col items-center justify-center">
                    <Dumbbell className="w-12 h-12 text-gray-300 " />
                    <h3 className="text-lg font-semibold text-gray-300">Total Weight Lifted</h3>
                    <p className="text-2xl font-bold text-gray-400">{totalWeight} lbs</p>
                </div>
                <div className="card bg-gray-700 rounded-lg shadow p-4 flex-1 flex flex-col items-center justify-center">
                    <BicepsFlexed className="w-12 h-12 text-gray-300 " />
                    <h3 className="text-lg font-semibold text-gray-300">Total Reps </h3>
                    <p className="text-2xl font-bold text-gray-400">{totalReps} Reps</p>
                </div>
                <div className="card bg-gray-700 rounded-lg shadow p-4 flex-1 flex flex-col items-center justify-center">
                    <Flame className="w-12 h-12 text-gray-300 " />
                    <h3 className="text-lg font-semibold text-gray-300">Exercises </h3>
                    <p className="text-2xl font-bold text-gray-400">{workoutsToday}/{dailyGoal}</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <Link to="/log" className="block flex-1">
                    <div className="group bg-gray-800 rounded-lg shadow p-4 flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors">
                        <Plus className="w-6 h-6 text-gray-400 group-hover:text-white" />
                        <h3 className="text-lg font-semibold text-gray-400 group-hover:text-white">Log Workout</h3>
                    </div>
                </Link>
                <Link to="/progress" className="block flex-1">
                    <div className="group bg-gray-800 rounded-lg shadow p-4 flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-colors">
                        <LucideLineChart className="w-6 h-6 text-gray-400 group-hover:text-white" />
                        <h3 className="text-lg font-semibold text-gray-400 group-hover:text-white">View Progress</h3>
                    </div>
                </Link>
            </div>

            <div className="w-full h-70">
                <h3 className="text-lg font-bold mb-4">Activity Log</h3>
                <ResponsiveContainer width="100%" height={230}>
                    <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip contentStyle={{ backgroundColor: "#101828", borderRadius: "8px", color: "#fff" }} />
                    <Line type="monotone" dataKey="count" stroke="#4A90E2" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;