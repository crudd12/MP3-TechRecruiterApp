// import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
// import AppAppBar from './Components/AppAppBar';
import LandingPage from './Components/LandingPage';
import DeveloperView from './Components/DeveloperView';
import RecruiterView from './Components/RecruiterView';


function App() {
  return (
    <div className="App">
      <Router>
      <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/developer" element={<DeveloperView />} />
          <Route path="/recruiter" element={<RecruiterView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
