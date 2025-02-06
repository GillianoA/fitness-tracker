import {Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import WorkoutLog from './components/WorkoutLog';
import Progress from './components/Progress';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="p-4">
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
