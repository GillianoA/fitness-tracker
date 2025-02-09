import {Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import WorkoutLog from './pages/WorkoutLog';
import Progress from './pages/Progress';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 max-w-full">
      <NavBar />
      <div className="p-4 max-w-full">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/log" element={<WorkoutLog />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
