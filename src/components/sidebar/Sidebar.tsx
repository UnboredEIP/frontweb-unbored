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
  width: 250px;
  min-height: 100vh; /* Adjusted */
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  background-color: rgba(225, 96, 77, ${({ sidebar }) => (sidebar ? "1" : "0")});
  transition: 400ms;
  overflow-y: auto; /* Added */
`;

const BackgroundCover = styled.div<{ sidebar: boolean }>`
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
  height: 100%;
`;

const Sidebar: React.FC<{}> = () => {
  const [sidebar, setSidebar] = useState(true); // Set sidebar to true by default

  return (
    <IconContext.Provider value={{ color: "whitesmoke" }}>
      <Nav>
        {/* Remove the button and directly set the sidebar state to true */}
      </Nav>
      <BackgroundCover sidebar={sidebar}>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            {SidebarData.map((item, index) => {
              return <Submenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </BackgroundCover>
    </IconContext.Provider>
  );
};

export default Sidebar;
