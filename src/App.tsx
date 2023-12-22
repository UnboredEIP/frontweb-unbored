import React, { useEffect, useState } from "react";
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
import CreateActivityPage from "./pages/CreateActivityPage";
import ChooseContractPage from "./pages/ChooseContractPage";
import { useNavigate } from "react-router-dom";
import UpdateProfilePage from "./pages/profile/UpdateProfile";
import ClientLoginPage from "./pages/ClientLogin";
import ClientRegisterPage from "./pages/ClientRegister";
import ClientForgetPwd from "./pages/ClientForgetPwd";
import ClientProfile from "./pages/ClientProfile";
import ClientMyAccount from "./pages/ClientMyAccount";
import ClientMyActivities from "./pages/ClientMyActivites";
import ClientActivityInfo from "./pages/ClientActivityInfo";
import ClientMyContract from "./pages/ClientMyContract";
import ClientModifyActivity from "./pages/ClientModifyActivity";
import UpdateEmailPage from "./pages/profile/UpdateEmail";
import UpdatePasswordPage from "./pages/profile/UpdatePassword";
import ProfilePage from "./pages/Profile";
import AvisActivityPage from "./pages/ClientAvisActivity";

function App() {
  const [jsonData, setJsonData] = useState<any>(null);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const storedJsonData = localStorage.getItem("myJsonData");
    if (storedJsonData) {
      setJsonData(JSON.parse(storedJsonData));
    }

    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn) {
      setIsLoggedIn(JSON.parse(storedIsLoggedIn));
    }
  }, []);

  const updateJsonData = (newData: any) => {
    setJsonData(newData);
    localStorage.setItem("myJsonData", JSON.stringify(newData));
  };

  const updateLoginStatus = (status: boolean) => {
    setIsLoggedIn(status);
    localStorage.setItem("isLoggedIn", JSON.stringify(status));
  };

  const HandleLoginSuccess = () => {
    const navigation = useNavigate();
    navigation("/home");
  };

  return (
    <>
      <ParticleBackground />
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<PresentationPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/login"
            element={<LoginPage onLoginSuccess={HandleLoginSuccess} />}
          />
          <Route
            path="/register"
            element={<RegisterPage onRegisterSuccess={HandleLoginSuccess} />}
          />
          <Route
            path="/update-profile"
            element={<UpdateProfilePage onUpdateSuccess={HandleLoginSuccess} />}
          />
          <Route
            path="/update-email"
            element={<UpdateEmailPage onUpdateSuccess={HandleLoginSuccess} />}
          />
          <Route
            path="/update-password"
            element={<UpdatePasswordPage onUpdateSuccess={HandleLoginSuccess} />}
          />
          <Route path="/create-activity" element={<CreateActivityPage />} />
          <Route
            path="/choose-contract"
            element={<ChooseContractPage />}
          />
          <Route path="/client-login" element={<ClientLoginPage />} />
          <Route
            path="/client-register"
            element={<ClientRegisterPage />}
          />
          <Route path="/client-forgetpwd" element={<ClientForgetPwd />} />
          <Route path="/client-profile" element={<ClientProfile />} />
          <Route
            path="/client-myAccount"
            element={<ClientMyAccount />}
          />
          <Route
            path="/client-myActivites"
            element={<ClientMyActivities />}
          />
          <Route
            path="/client-activityInfo"
            element={<ClientActivityInfo />}
          />
          <Route
            path="/client-modifyActivity"
            element={<ClientModifyActivity />}
          />
          <Route
            path="/client-myAvis"
            element={<AvisActivityPage />}
          ></Route>
          <Route
            path="/client-myContract"
            element={<ClientMyContract />}
          />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
      <header className={styles["App-header"]}></header>
    </>
  );
}

export default App;
