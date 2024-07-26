// import logo from './logo.svg';
import "./App.css";
// import NavBar from './Components/NavBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CurrentUserProvider from "./Contexts/CurrentUser";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
// import AppAppBar from './Components/AppAppBar';
import LandingPage from "./Components/LandingPage";
import DeveloperView from "./Components/DeveloperView";
import RecruiterView from "./Components/RecruiterView";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <CurrentUserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/developer" element={<DeveloperView />} />
            <Route path="/recruiter" element={<RecruiterView />} />
          </Routes>
          <Footer />
        </Router>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
