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
    title: "Configurations",
    path: "/configurations",
    icon: <FaCog />,
  },

  {
    title: "Profile Info",
    path: "/profile",
    icon: <AiOutlineUser />,
  },
  {
    title: "Créer une activité",
    path: "/create-activity",
    icon: <FaCog />,
  },
  {
    title: "Choisir un contrat",
    path: "/choose-contract",
    icon: <FaCog />,
  },
  {
    title: "Login Client",
    path: "/client-login",
    icon: <AiOutlineUser />,
  },
  {
    title: "Profile Client",
    path: "/client-profile",
    icon: <AiOutlineUser />,
  },
  {
    title: "Info Activité",
    path: "/client-activityInfo",
    icon: <AiOutlineUser />,
  },
  {
    title: "Avis Activité",
    path: "/client-myAvis",
    icon: <AiOutlineUser />,
  },
];
