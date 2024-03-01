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
import CreateActivityPage from "./pro/pages/ProCreateActivityPage";
import ChooseContractPage from "./pro/pages/ProChooseContractPage";
import { useNavigate } from "react-router-dom";
import UpdateProfilePage from "./pages/profile/UpdateProfile";
import ProLoginPage from "./pro/pages/ProLogin";
import ProRegisterPage from "./pro/pages/ProRegister";
import ProForgetPwd from "./pro/pages/ProForgetPwd";
import ProProfile from "./pro/pages/ProProfile";
import ProMyAccount from "./pro/pages/ProMyAccount";
import ProMyActivities from "./pro/pages/ProMyActivites";
import ProActivityInfo from "./pro/pages/ProActivityInfo";
import ProMyContract from "./pro/pages/ProMyContract";
import ProModifyActivity from "./pro/pages/ProModifyActivity";
import UpdateEmailPage from "./pages/profile/UpdateEmail";
import UpdatePasswordPage from "./pages/profile/UpdatePassword";
import ProfilePage from "./pages/Profile";
import AvisActivityPage from "./pro/pages/ProAvisActivity";
import ForgotpasswordPage from "./pages/profile/ForgotPassword";
import CalendarComponent from './pages/CalendarComponent';
import timelineData from "./components/Timeline/timeline.json";
import ProMenuPage from "./pro/pages/ProMenu";
import ForgetPass from "./pages/profile/ForgotPass"
import ManageAvatarPage from "./pages/ManageAvatar"

import ActivityPage from "./pages/ActivityPage";


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
          <Route
            path="/forgetpass"
            element={<ForgetPass onUpdateSuccess={HandleLoginSuccess} />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotpasswordPage onUpdateSuccess={HandleLoginSuccess} />}
          />
          <Route
            path="/forgot-pass"
            element={<ForgotpasswordPage onUpdateSuccess={HandleLoginSuccess} />}
          />
          <Route path="/create-activity" element={<CreateActivityPage />} />
          <Route
            path="/choose-contract"
            element={<ChooseContractPage />}
          />
          <Route path="/Pro-login" element={<ProLoginPage />} />
          <Route
            path="/Pro-register"
            element={<ProRegisterPage />}
          />
          <Route path="/Pro-forgetpwd" element={<ProForgetPwd />} />
          <Route path="/Pro-profile" element={<ProProfile />} />
          <Route
            path="/Pro-myAccount"
            element={<ProMyAccount />}
          />
          <Route
            path="/Pro-myActivites"
            element={<ProMyActivities />}
          />
          <Route
            path="/Pro-activityInfo/:id"
            element={<ProActivityInfo />}
          />
          <Route
            path="/Pro-modifyActivity/:id"
            element={<ProModifyActivity />}
          />
          <Route
            path="/Pro-myAvis"
            element={<AvisActivityPage />}
          ></Route>
          <Route
            path="/Pro-myContract"
            element={<ProMyContract />}
          />
          <Route
            path="/Pro-menu"
            element={<ProMenuPage />}
          />
          <Route
            path="/ManageAvatar"
            element={<ManageAvatarPage />}
          />
          
          <Route
            path="/calendar"
            element={<CalendarComponent events={timelineData.events} />}
          />

          <Route path="/activity/:id" element={<ActivityPage />} />

          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
      <header className={styles["App-header"]}></header>
    </>
  );
}

export default App;
