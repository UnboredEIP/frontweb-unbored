import {
  AiOutlineHome,
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
} from "react-icons/ai";
import { FaCog } from "react-icons/fa";
import { SidebarItem } from "../../models/Sidebaritem";
import { AiOutlineCalendar } from 'react-icons/ai';

export const SidebarData: SidebarItem[] = [
  {
    title: "Home",
    path: "/home",
    icon: <AiOutlineHome />,
  },
  {
    title: "Profile",
    path: "#",
    icon: <AiOutlineHome />,
    iconClosed: <AiFillCaretDown />,
    iconOpened: <AiFillCaretUp />,
    subnav: [
      {
        title: "Màj profile",
        path: "/update-profile",
        icon: <AiOutlineUser />,
      },
      {
        title: "Màj email",
        path: "/update-email",
        icon: <AiOutlineMail />,
      },
      {
        title: "Màj mot de passe",
        path: "/update-password",
        icon: <AiOutlineLock />,
      },
    ],
  },
  {
    title: "Profile Info",
    path: "/profile",
    icon: <AiOutlineUser />,
  },
  {
    title: "Login Pro",
    path: "/Pro-login",
    icon: <AiOutlineUser />,
  },
  {
    title: "Menu Pro",
    path: "/Pro-menu",
    icon: <AiOutlineUser />,
  },
  {
    title: "Calendrier",
    path: "/calendar",
    icon: <AiOutlineCalendar />,
  },
  
];
