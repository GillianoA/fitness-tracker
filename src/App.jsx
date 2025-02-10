import {Routes, Route} from 'react-router-dom';
import { useState, useEffect, Suspense, lazy} from 'react';
import Dashboard from './pages/Dashboard';
import NavBar from './components/NavBar';

const WorkoutLog = lazy(() => import('./pages/WorkoutLog'));
const Progress = lazy(() => import('./pages/Progress'));

function App() {
      const [workouts, setWorkouts] = useState([]);
      //Load workouts from local storage
      useEffect(() => {
          const workouts = localStorage.getItem("workouts");
          if(workouts) {
              setWorkouts(JSON.parse(workouts));
          }
      }, []);

      //Save workouts to local storage
      useEffect(() => {
          localStorage.setItem("workouts", JSON.stringify(workouts));
      }, [workouts]);

  return (
    <div className="min-h-screen bg-gray-900 max-w-full overflow-x-hidden">
      <NavBar />
      <div className="p-4 max-w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard workouts={workouts}/>} />
            <Route path="/log" element={<WorkoutLog workouts={workouts} setWorkouts={setWorkouts}/>} />
            <Route path="/progress" element={<Progress workouts={workouts}/>} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
