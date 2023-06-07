import styles from "./styles/App.module.css";
import Nav from "./components/Nav/Nav";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Overview from "./pages/Overview";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import HomePage from "./pages/Home";
import PresentationPage from "./pages/Presentation";
import ParticleBackground from "./components/ParticleBackground";
import CreateActivityPage from './pages/CreateActivityPage';
import ChooseContractPage from './pages/ChooseContractPage';

function App() {
  return (
    <>
      <ParticleBackground />
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<PresentationPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/create-activity" element={<CreateActivityPage />}></Route>
          <Route path="/choose-contract" element={<ChooseContractPage />}></Route>
        </Routes>
      </Router>
      <header className={styles["App-header"]}></header>
    </>
  );
}

export default App;
