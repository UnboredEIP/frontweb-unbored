import React, { useState, useEffect } from "react";
import { Box, Flex, Button, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Timeline from "../components/Timeline/Timeline";
import axios from 'axios';

type Event = {
  _id: string;
  name: string;
  address: string;
  rate: number[];
  pictures: { id: string; userId: string }[];
  categories: string[];
  creator: string;
  participents: string[];
};

const HomeHeader: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [eventToDisplay, setEventToDisplay] = useState("Sport");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllEvents, setShowAllEvents] = useState(true);

  const [userData, setUserData] = useState({
    name: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token === null) {
          navigate("/");
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
  
        const response = await fetch('https://x2025unbored786979363000.francecentral.cloudapp.azure.com/events/lists', config);
  
        if (response.status === 401) {
          console.error('Unauthorized access');
          return;
        }

        const data = await response.json();
        console.log(data);
        setEvents(data.events);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
    getProfileInfo();
  }, []);

  const getProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token === null) {
        navigate("/");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = "https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile";
      const response = await axios.get(url, config);
      const profileDetails = response.data.user;

      console.log("Profile Infos ", profileDetails);

      if (profileDetails.profilePhoto) {
        const firstPictureId = profileDetails.profilePhoto;
        const urlImage = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/getimage?imageName=${firstPictureId}`;
        const responseImage = await axios.get(urlImage, { responseType: "blob", ...config });

        const img = URL.createObjectURL(responseImage.data);
      }

      setUserData({
        name: profileDetails.username,
      });

      console.log("Toooooto " , profileDetails.username);
    } catch (error) {
      const token = localStorage.getItem("token");
      console.error("Token value: ", token);
      console.error(error);
    }
  };
  
  const previousCategory = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
    }
  };

  const nextCategory = () => {
    if (currentCategoryIndex < uniqueCategories.length - 5) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    }
  };

  const right_arrow = "→";
  const left_arrow = "←";

  const eventsToDisplay = showAllEvents
    ? events || []
    : (events || []).filter((event) => event.categories.includes(eventToDisplay));

  const filteredEvents = eventsToDisplay.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const uniqueCategories: string[] = Array.from(new Set((events || []).map((event) => event.categories).flat()));

  const changeEventCategory = (category: string) => {
    setEventToDisplay(category);
    setShowAllEvents(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const showAllEventsHandler = () => {
    setShowAllEvents(true);
  };

  const handleStartButtonClick = () => {
    navigate("/activity-favorite");
  };

  return (
    <Flex direction="column">
      <Input
        type="text"
        placeholder="Recherche les activités par titre"
        style={{ fontSize: "36px", position: "relative", left: "200px", width: "530px" }}
        value={searchQuery}
        onChange={handleSearch}
      />

      <Box style={{ margin: "50px 0" }} />

      <Button
        onClick={showAllEventsHandler}
        style={{ position: "relative", left: "200px", top: "0px", fontSize: "36px" }}
        variant={showAllEvents ? "solid" : "outline"}
        bg="#e1604d"
        color="white"
        mr={2}
      >
        Tout les thémes
      </Button>
      
      <br />
      <Flex align="center" justifyContent="space-between">
        <Button
          onClick={previousCategory}
          style={{ fontSize: "72px", background: "none", border: "none", color: "#e1604d", marginLeft: "190px" }}
          disabled={currentCategoryIndex === 0}
        >
          {left_arrow}
        </Button>

        <Flex justify="center" align="center" flex="1">
          {(uniqueCategories.slice(currentCategoryIndex, currentCategoryIndex + 5)).map((category, index) => (
            <Button
              key={index}
              style={{ margin: "0 10px", fontSize: "36px" }}
              onClick={() => changeEventCategory(category)}
              variant={category === eventToDisplay ? "solid" : "outline"}
              bg="#e1604d"
              color="white"
            >
              {category}
            </Button>
          ))}
        </Flex>

        <Button
          onClick={nextCategory}
          style={{ fontSize: "72px", background: "none", border: "none", color:"#e1604d", marginRight: "-200px" }}
          disabled={currentCategoryIndex >= uniqueCategories.length - 5}
        >
          {right_arrow}
        </Button>
      </Flex>

      <br />
      <br />
      <br />

      <Box style={{ position: "relative" }}>
        <Timeline items={filteredEvents} />
      </Box>

      <br />
      <br />
      <br />

      <Button
        onClick={handleStartButtonClick}
        style={{ position: "relative", left: "200px", top: "0px", fontSize: "36px" }}
        variant="solid"
        bg="#e1604d"
        color="white"
      >
        ⭐Activitées
      </Button>

      <Box position="absolute" top="120px" right="20px" fontSize="36px" color="#333">
        {userData.name}
      </Box>
    </Flex>
  );
};

const HomePage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <Flex minHeight="100vh" align="center" width="full" justifyContent="center">
      <HomeHeader />
    </Flex>
  );
};

export default HomePage;
