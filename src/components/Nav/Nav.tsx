import React, { useState, useEffect } from "react";
import styles from "../../styles/components/Nav.module.css";
import * as data from "./links.json";
import logo from "../../unboredlogo.png";
import Sidebar from "../sidebar/Sidebar";
import { Link as RouterLink, Routes, Route, useNavigate } from "react-router-dom";
import { Text, Button } from "@chakra-ui/react";

const linkString = JSON.stringify(data);

type Link = {
  label: string;
  href: string;
};

const removeToken = async () => {
  localStorage.removeItem("token");
  setIsLoggedIn(false); // Update state to trigger re-render
};


const LinkRedirection: React.FC<{ isLoggedIn: boolean; setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }> = ({ isLoggedIn, setIsLoggedIn }) => {
  var links;

  if (!isLoggedIn) {
    links = JSON.parse(linkString).navbar_links_not_connected;
  } else {
    links = JSON.parse(linkString).navbar_links_connected;
  }

  const removeToken = async () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className={styles["links-container"]}>
      {links.map((link: Link) => (
        <Button
          key={link.href}
          borderRadius={50}
          mr={4}
          boxShadow="lg"
          onClick={async () => {
            if (link.label === "Se déconnecter") {
              removeToken();
              <RouterLink to="\">
              <Text>{link.label}</Text>
            </RouterLink>
            }
          }}
        >
          <div className={styles["link"]}>
            <RouterLink to={link.href}>
              <Text>{link.label}</Text>
            </RouterLink>
          </div>
        </Button>
      ))}
    </div>
  );
};

const Nav: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const isExcludedPage = window.location.pathname === "/forgot-password" || window.location.pathname === "/site_vitrine";
  

  useEffect(() => {
    const currentUrl = window.location.href;
    console.log(currentUrl);
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []); // Run on mount to initialize login status

  if (isExcludedPage) {
    return null;
  }

  return (
    <nav className={styles["navbar"]}>
      {isLoggedIn && <Sidebar />} {/* Render Sidebar only if user is logged in */}
      <h1>
        <RouterLink to="/">
          <Text textShadow="lg" style={{ marginLeft: "-200px" }}>UnBored</Text>
        </RouterLink>
      </h1>
      <Routes>
        <Route
          path="/*"
          element={<LinkRedirection isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </nav>
  );
};

export default Nav;

