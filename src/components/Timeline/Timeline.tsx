import React from "react";
import { Box, Grid } from "@chakra-ui/react";
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
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={6}
        ml={{ base: "0", md: "100px", lg: "200px" }}
      >
        {items.map((item) => (
          <Box
            key={item._id}
            borderWidth={1}
            borderRadius="lg"
            overflow="hidden"
            p={4}
            boxShadow="md"
          >
            <Box textAlign="center" mb={4}>
              <strong>
                <Link
                  to={`/activity/${item._id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  state={{ activity: item }} // Pass the activity information as state
                >
                  <h2 style={{ fontSize: "24px" }}>{item.categories.join(', ')}</h2>
                </Link>
              </strong>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={4}
              >
                <Link
                  to={`/activity/${item._id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  state={{ activity: item }} // Pass the activity information as state
                >
                <img
                  src={`https://x2025unbored786979363000.francecentral.cloudapp.azure.com/getimage?imageName=${item.pictures[0].id}`}
                  alt={`Image for item ${item._id}`}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/EPITECH_Paris_Campus.jpg/1280px-EPITECH_Paris_Campus.jpg";
                  }}
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                />
                </Link>
              </Box>
              <div>
                <h3>
                  <strong>{item.name}</strong>
                </h3>
                <p>{item.address}</p>
                <p>{item.date}</p>
              </div>
            </Box>
          </Box>
        ))}
      </Grid>
    </div>
  );
};

export default Timeline;
