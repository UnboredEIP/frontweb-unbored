import React, { useState, useEffect } from "react";
import styles from "../styles/pages/Register.module.css";
import { Box, Flex, Button,Input } from "@chakra-ui/react";
import * as data from "../components/Timeline/timeline.json";
import Timeline from "../components/Timeline/Timeline";
import { useNavigate } from "react-router-dom";

const timelineString = JSON.stringify(data);
const timelineItems = JSON.parse(timelineString).events;

type Event = {
  id: number;
  title: string;
  date: string;
  hour: string;
  imageUrl: string;
  catégorie: string;
};


const HomeHeader: React.FC<{}> = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [eventToDisplay, setEventToDisplay] = useState("Sport");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllEvents, setShowAllEvents] = useState(true); // State to control displaying all events

  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);

  const previousEvent = () => {
    if (currentEventIndex > 0) {
      setCurrentEventIndex(currentEventIndex - 1);
    }
  };

  const nextEvent = () => {
    if (currentEventIndex < timelineItems.length - 1) {
      setCurrentEventIndex(currentEventIndex + 1);
    }
  };

  const right_arrow = "→";
  const left_arrow = "←";

  // Filter events by category or show all events
  const eventsToDisplay = showAllEvents
    ? timelineItems
    : timelineItems.filter((event: Event) => event.catégorie === eventToDisplay);

  // Filter events by search query
  const filteredEvents = eventsToDisplay.filter((event: Event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get unique event categories
  const uniqueCategories: string[] = Array.from(new Set(timelineItems.map((event: Event) => event.catégorie)));

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

  if (!isLoggedIn) {
    console.log("toto est pas connecté");
    //navigate('/');
    //return null; // You can return null or any other placeholder while redirecting
  }

  return (
    <Flex direction="column">
      {/* Search bar */}
      <Input
        type="text"
        placeholder="Recherche les activités par titre"
        style={{ fontSize: "36px" }}
        value={searchQuery}
        onChange={handleSearch}
      />

      {/* Ajout d'un espace */}
      <Box style={{ margin: "50px 0" }} />

      <Flex>
        <Button
          onClick={showAllEventsHandler}
          style={{ position: "relative", left: "10px", top: "0px", fontSize: "36px" }}
          variant={showAllEvents ? "solid" : "outline"} // Change button style based on the state
          bg="#e1604d"
          color="white"
          mr={2} // Add right margin to separate it from category buttons
        >
          Tout les thémes
        </Button>

        <Box style={{ margin: "30px 0" }} />

        {uniqueCategories.map((category, index) => (
          <Button
            key={index}
            style={{ position: "relative", left: "10px", top: "0px", fontSize: "36px" }}
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

  // if (!isLoggedIn) {
  //   console.log("toto est pas connecté");
  //   //navigate('/');
  //   //return null; // You can return null or any other placeholder while redirecting
  // }
  
  // else {
  //   console.log("toto est connecté");
  // }
  
};

export default HomePage;
