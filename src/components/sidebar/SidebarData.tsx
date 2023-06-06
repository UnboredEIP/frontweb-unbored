import {
  AiOutlineHome,
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineUser,
} from "react-icons/ai";
import { FaCog } from "react-icons/fa";
import { SidebarItem } from "../../models/Sidebaritem";

export const SidebarData: SidebarItem[] = [
  {
    title: "Overview",
    path: "/overview",
    icon: <AiOutlineHome/>,
    iconClosed: <AiFillCaretDown/>,
    iconOpened: <AiFillCaretUp/>,
    subnav: [
      {
        title: "Users",
        path: "/overview/users",
        icon: <AiOutlineUser/>,
      },
    ],
  },
  {
    title: "Configurations",
    path: "/configurations",
    icon: <FaCog/>,
  },
  {
    title: "Créer une activité",
    path: "/create-activity",
    icon: <FaCog/>,
  },
  {
    title: "Choisir un contrat",
    path: "/choose-contract",
    icon: <FaCog/>,
  },
];
