import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditExercisePage from './pages/EditExercisePage';
import CreateExercisePage from './pages/CreateExercisePage';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <Router>
      <header>
        <div className="title-box">
          <h1>Fitness App</h1>
          <p>Track your fitness routines</p>
        </div>
      </header>

    <Navigation /> 

    <main>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit/:id" element={<EditExercisePage />} />
          <Route path="/create" element={<CreateExercisePage />} />
      </Routes>
    </main>



      <footer>@ 2025 Torkuma Ugbah</footer>
    </Router>
  );
}

export default App
