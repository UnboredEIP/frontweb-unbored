import React, { useState } from "react";
import styles from "../styles/pages/Register.module.css";
import { Box, Flex } from "@chakra-ui/react";
import * as data from "../components/Timeline/timeline.json";
import Timeline from "../components/Timeline/Timeline";

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
  return (
    <div>
      {timelineItems.map((event: Event) => {
        return <Timeline key={event.id} items={[event]} />;
      })}
    </div>
  );
};

const HomePage: React.FC<{}> = () => {
  return (
    <Flex minHeight="100vh" align="center" width="full" justifyContent="center">
      <HomeHeader />
    </Flex>
  );
};

export default HomePage;
