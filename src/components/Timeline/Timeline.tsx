import React from "react";
import { Box, Flex } from "@chakra-ui/react";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  hour: string;
  imageUrl: string;
  catégorie: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div>
      <Box
        //borderColor="white"
        borderWidth={10}
        px={7}
        py={7}
        borderRadius={40}
        //backgroundColor="#E1604D"
        boxShadow="md"
        textAlign={"center"}
        mb={"20px"}
        textColor={"E1604D"}
      >
        {items.map((item) => (
          <li key={item.id}>
            <strong>
              <h2
                style={{
                  fontSize: "30px",
                }}
              >
                {item.catégorie}
              </h2>
            </strong>
            <div
              style={{
                marginBottom: "50px",
                alignItems: "center",
              }}
            >
              <img
                src={item.imageUrl}
                alt={`Image for item ${item.id}`}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/EPITECH_Paris_Campus.jpg/1280px-EPITECH_Paris_Campus.jpg";
                }}
                style={{
                  maxWidth: "600px",
                  maxHeight: "600px",
                  marginBottom: "25px",
                  marginTop: "25px",
                }}
              />
              <div
                style={{
                  fontSize: "30px",
                }}
              >
            <h3><strong>{item.title}</strong></h3>
            <p>
              {item.date}
              <br />
              {item.hour}
              <br />
            </p>
            </div>
            </div>
          </li>
        ))}
      </Box>
    </div>
  );
};

export default Timeline;
