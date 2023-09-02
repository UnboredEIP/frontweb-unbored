import React, { FC, useState } from "react";
import { SidebarItem } from "../../models/Sidebaritem";
import styles from "../../styles/components/Sidebar.module.css";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import styled from "styled-components";

type SidebarLinkProps = {
  item: SidebarItem;
};

const SidebarLink = styled(Link)`
  display: flex;
  // justify-content: flex-start;
  align-items: center;
  height: 3.75rem;
  font-size: 1rem;
  padding: 2rem;
  margin-top: 20px;
  transition: 100ms;
  &:hover {
    background-color: #e28576;
    border-left: 4px solid white;
    margin-left: 1rem;
  }
`;
const SidebarLabel = styled.span`
  margin-left: 0.75rem;
`;

const DropDownLink = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1rem;
  margin-left: 3rem;
  transition: 100ms;
  &:hover {
    background-color: #e28576;
    border-left: 4px solid white;
  }
`;

const Submenu: FC<SidebarLinkProps> = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  return (
    <>
      <SidebarLink to={item.path} onClick={showSubnav}>
        <div className={styles["sidebar-icon"]}>{item.icon}</div>
        <SidebarLabel>
          {/* className={styles["sidebar-text"]} */}
          <div className={styles["sidebar-text"]}>{item.title}</div>
        </SidebarLabel>
        <div className={styles["sidebar-subnav"]}>
          {item.subnav && subnav ? item?.iconOpened : item?.iconClosed}
        </div>
      </SidebarLink>
      {subnav &&
        item?.subnav?.map((subnavItem, index) => {
          return (
            <DropDownLink to={subnavItem.path} key={index}>
              <div className={styles["sidebar-subicon"]}>{subnavItem.icon}</div>
              <SidebarLabel>
                <div className={styles["sidebar-subtext"]}>
                  {subnavItem.title}
                </div>
              </SidebarLabel>
            </DropDownLink>
          );
        })}
    </>
  );
};

export default Submenu;
