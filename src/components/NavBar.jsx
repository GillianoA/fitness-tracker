import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="bg-gray-800 p-4 text-white flex justify-between">
            <h1 className="font-bold text-xl">Fitness Tracker</h1>
            <div className="space-x-4">
            <Link to="/" className="hover:text-gray-300">Dashboard</Link>
            <Link to="/log" className="hover:text-gray-300">Workout Log</Link>
            <Link to="/progress" className="hover:text-gray-300">Progress</Link>
            </div>
        </nav>
    );
};

export default NavBar;