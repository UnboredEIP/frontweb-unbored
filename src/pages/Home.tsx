import React, { useState, useEffect } from "react";
import styles from "../styles/pages/Register.module.css";
import { Box, Flex, Button, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Timeline from "../components/Timeline/Timeline";

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
  const [events, setEvents] = useState<Event[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [eventToDisplay, setEventToDisplay] = useState("Sport");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllEvents, setShowAllEvents] = useState(true);

  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
  
        const response = await fetch('http://20.216.143.86/event/lists', config);
  
        if (response.status === 401) {
          // Handle unauthorized access, e.g., redirect to login page
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
  }, []);
  
  const previousEvent = () => {
    if (currentEventIndex > 0) {
      setCurrentEventIndex(currentEventIndex - 1);
    }
  };

  const nextEvent = () => {
    if (currentEventIndex < events.length - 1) {
      setCurrentEventIndex(currentEventIndex + 1);
    }
  };

  const right_arrow = "→";
  const left_arrow = "←";

  // Filter events by category or show all events
  const eventsToDisplay = showAllEvents
    ? events || []  // Use empty array if events is undefined
    : (events || []).filter((event) => event.categories.includes(eventToDisplay));

  // Filter events by search query
  const filteredEvents = eventsToDisplay.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get unique event categories
  const uniqueCategories: string[] = Array.from(new Set((events || []).map((event) => event.categories).flat()));

  const changeEventCategory = (category: string) => {
    setEventToDisplay(category);
    setShowAllEvents(false); // Reset to category-based filtering
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const showAllEventsHandler = () => {
    setShowAllEvents(true); // Show all events when the button is clicked
  };

  // if (!isLoggedIn) {
  //   console.log("toto est pas connecté");
  //   //navigate('/');
  //   //return null; // You can return null or any other placeholder while redirecting
  // }

  return (
    <Flex direction="column">
      {/* Search bar */}
      <Input
        type="text"
        placeholder="Recherche les activités par titre"
        style={{ fontSize: "36px", position: "relative", left: "350px" }}
        value={searchQuery}
        onChange={handleSearch}
      />

      {/* Ajout d'un espace */}
      <Box style={{ margin: "50px 0" }} />

      <Flex>
        <Button
          onClick={showAllEventsHandler}
          style={{ position: "relative", left: "350px", top: "0px", fontSize: "36px" }}
          variant={showAllEvents ? "solid" : "outline"}
          bg="#e1604d"
          color="white"
          mr={2}
        >
          Tout les thémes
        </Button>

        <Box style={{ margin: "30px 0" }} />

        {uniqueCategories.map((category, index) => (
          <Button
            key={index}
            style={{ position: "relative", left: "350px", top: "0px", fontSize: "36px" }}
            onClick={() => changeEventCategory(category)}
            variant={category === eventToDisplay ? "solid" : "outline"}
            bg="#e1604d"
            color="white"
            _notFirst={{ ml: "30px" }}
          >
            {category}
          </Button>
        ))}
      </Flex>
      
      <Box style={{ position: "relative" }}>
        <Timeline items={filteredEvents} />
      </Box>
    </Flex>
  );
};


const HomePage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);

  // // Check if the user is not logged in, then redirect to "/"
  return (
    <Flex minHeight="100vh" align="center" width="full" justifyContent="center">
      <HomeHeader />
      {/* Add other content of your page here */}
    </Flex>
  );
};

export default HomePage;
