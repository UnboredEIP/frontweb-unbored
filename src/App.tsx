import styles from "./styles/App.module.css";
import Nav from "./components/Nav/Nav";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Overview from "./pages/Overview";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import CreateActivityPage from './pages/CreateActivityPage';
import ChooseContractPage from './pages/ChooseContractPage';

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/overview" element={<Overview />}></Route>
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
