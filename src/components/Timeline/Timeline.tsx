import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Event {
  _id: string;
  name: string;
  address: string;
  rate: number[];
  pictures: { id: string; userId: string }[];
  categories: string[];
  creator: string;
  participents: [];
  description?: string;
}

interface TimelineProps {
  items: Event[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div>
      <Flex flexWrap="wrap" justifyContent="flex-end" marginLeft="300px">
        {items.map((item) => (
          <Box
            key={item._id}
            width={{ base: "100%", md: "48%" }}
            mb={{ base: "20px", md: "5%" }}
            marginRight={{ md: "20px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box
              borderWidth={10}
              px={7}
              py={7}
              borderRadius={40}
              boxShadow="md"
              textAlign={"center"}
              textColor={"E1604D"}
            >
              <strong>
                {/* Make the title clickable */}
                <Link
                  to={`/activity/${item._id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  state={{ activity: item }} // Pass the activity information as state
                >
                  <h2 style={{ fontSize: "24px" }}>{item.categories.join(', ')}</h2>
                </Link>
              </strong>
              <div
                style={{
                  marginBottom: "20px",
                  alignItems: "center",
                }}
              >
                <img
                  src={`http://20.216.143.86/getimage?imageName=${item.pictures[0].id}`}
                  alt={`Image for item ${item._id}`}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/EPITECH_Paris_Campus.jpg/1280px-EPITECH_Paris_Campus.jpg";
                  }}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                />
                <div
                  style={{
                    fontSize: "24px",
                  }}
                >
                  <h3>
                    <strong>{item.name}</strong>
                  </h3>
                  <p>{item.address}</p>
                  <p>{item.description}</p>
                  <p>{item.date}</p>
                </div>
              </div>
            </Box>
          </Box>
        ))}
      </Flex>
    </div>
  );
};

export default Timeline;
