import { Link } from 'react-router-dom';
import { Dumbbell, ClipboardList, BarChart } from "lucide-react";

const NavBar = () => {
    return (
        <nav className="min-w-screen bg-gray-800 p-4 text-white flex flex-col sm:flex-row justify-between mx-auto items-center">
            <h1 className="font-bold text-lg mb-2 sm:mb-0">FitTrack</h1>
            <div className="flex space-x-4 justify-center space-x-8">
                <Link to="/" className="text-gray-400 hover:text-white mx-2 flex items-center gap-2 text-inherit no-underline" >
                <Dumbbell className="w-5 h-5" />Dashboard
                </Link>
                <Link to="/log" className="text-gray-400 hover:text-white mx-2 flex items-center gap-2 text-inherit no-underline whitespace-nowrap">
                <ClipboardList className="w-5 h-5" />Workout Log
                </Link>
                <Link to="/progress" className="text-gray-400 hover:text-white mx-2 flex items-center gap-2 text-inherit no-underline">
                <BarChart className="w-5 h-5" />Progress</Link>
            </div>
        </nav>
    );
};

export default NavBar;