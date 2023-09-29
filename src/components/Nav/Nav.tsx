import React from "react";
import styles from "../../styles/components/Nav.module.css";
import * as data from "./links.json";
import logo from "../../unboredlogo.png";
import Sidebar from "../sidebar/Sidebar";
import { Link, Text, Button } from "@chakra-ui/react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const linkString = JSON.stringify(data);

type Link = {
  label: string;
  href: string;
};

const removeToken = async () => {
  localStorage.removeItem("token");
};

const LinkRedirection: React.FC<{}> = () => {
  var links;

  if (localStorage.getItem("token") === null) {
    links = JSON.parse(linkString).navbar_links_not_connected;
  } else links = JSON.parse(linkString).navbar_links_connected;

  return (
    <div className={styles["links-container"]}>
      {links.map((link: Link) => {
        return (
          <Button
            borderRadius={50}
            mr={4}
            boxShadow="lg"
            onClick={async () => {
              if (link.label === "Se déconnecter")
                localStorage.removeItem("token");
            }}
          >
            <div key={link.href} className={styles["link"]}>
              <a href={link.href}>{link.label}</a>
            </div>
            {/* <nav className={styles.bubble}>
            <div key={link.href} className={styles["link"]}>
              <a href={link.href}>{link.label}</a>
            </div>
          </nav> */}
          </Button>
        );
      })}
    </div>
  );
};

const Nav: React.FC<{}> = () => {
  return (
    <nav className={styles["navbar"]}>
      <Sidebar />
      <div className={styles["logo-container"]}>
        <span>
          <img src={logo} className={styles["nav-logo"]} alt="logo" />
        </span>
      </div>

      <h1>
        <Link href="/">
          <Text textShadow="lg">UnBored</Text>
        </Link>
      </h1>
      <Routes>
        <Route path="/*" element={<LinkRedirection />}></Route>
      </Routes>
    </nav>
  );
};

export default Nav;
