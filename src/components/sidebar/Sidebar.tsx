import React, { useState } from "react";
import logo from "../../unboredlogo.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import styles from "../../styles/components/Sidebar.module.css";
import { IconContext } from "react-icons";
import { HiMenu } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { SidebarData } from "./SidebarData";
import Submenu from "./Submenu";

const Nav = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 3rem;
  width: 250px;
  background-color: var(--mainColor);
`;

const SidebarNav = styled.div<{ sidebar: boolean }>`
  // background-color: var(--mainColor);
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  background-color: rgba(225, 96, 77, ${({ sidebar }) => (sidebar ? "0.8" : "0")});
  transition: 400ms;
`;

const BackgroundCover = styled.div<{ sidebar: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, ${({ sidebar }) => (sidebar ? "0.5" : "0")});
  z-index: 999;
`;

const NavIcon = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 5rem;
  font-size: 2rem;
  margin-left: 2rem;
`;

const SidebarWrap = styled.div`
  // display: flex;
  // justify-content: flex-start;
  align-items: center;
  height: 6.2rem;
  // background-color: var(--mainColor);
  // padding-left: 75px;
`;

const Sidebar: React.FC<{}> = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <IconContext.Provider value={{ color: "whitesmoke" }}>
      <Nav>
        <NavIcon to="#" onClick={showSidebar}>
          <HiMenu />
        </NavIcon>
      </Nav>
      <BackgroundCover sidebar={sidebar}>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#" onClick={showSidebar}>
              <IoCloseSharp />
            </NavIcon>
            {/* <div className={styles["sidebar-text"]}> */}
            {SidebarData.map((item, index) => {
              return <Submenu item={item} key={index} />;
            })}
            {/* </div> */}
          </SidebarWrap>
        </SidebarNav>
      </BackgroundCover>
    </IconContext.Provider>
  );
};

export default Sidebar;
