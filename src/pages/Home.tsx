import React, { useState } from "react";
import styles from "../styles/pages/Register.module.css";
import {
  Box,
  Heading,
  Text,
  Link,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Button,
  Flex,
} from "@chakra-ui/react";
import logoGoogle from "../google.png";
import logoFacebook from "../facebook.png";

const HomeHeader: React.FC<{}> = () => {
  return (
    <Box textAlign="center" mt={4}>
      <Link href="/create-schedule">
        <Heading>
          <Box
            borderRadius={40}
            backgroundColor="#E1604D"
            color="whitesmoke"
            boxShadow="lg"
            textShadow="lg"
            padding={7}
          >
            <Text>Crées ton Emploi du temps !</Text>

            <Text fontSize={20}>
              Laisse nous plannifier ta journée Drisskow !
            </Text>
          </Box>
        </Heading>
      </Link>
      <Link href="/invit-friends">
        <Heading mt={5}>
          <Box
            borderRadius={40}
            backgroundColor="#E1604D"
            color="whitesmoke"
            boxShadow="lg"
            textShadow="lg"
            padding={7}
          >
            <Text>Invite tes amis</Text>

            <Text fontSize={20}>Plus on est, mieux on dahek</Text>
          </Box>
        </Heading>
      </Link>
      <Link href="/update-profile">
        <Heading mt={5}>
          <Box
            borderRadius={40}
            backgroundColor="#E1604D"
            color="whitesmoke"
            boxShadow="lg"
            textShadow="lg"
            padding={7}
          >
            <Text>Mets à jour tes informations</Text>

            <Text fontSize={20}>
              Qui es-tu ? D'où viens tu ? Quelle a été ton parcours scolaire
            </Text>
          </Box>
        </Heading>
      </Link>
      <Link href="/create-avatar">
        <Heading mt={5}>
          <Box
            borderRadius={40}
            backgroundColor="#E1604D"
            color="whitesmoke"
            boxShadow="lg"
            textShadow="lg"
            padding={7}
          >
            <Text>Crées ton avatar</Text>

            <Text fontSize={20}>C'est important de flex sur ses amis</Text>
          </Box>
        </Heading>
      </Link>
    </Box>
  );
};

const HomePage: React.FC<{}> = () => {
  return (
    <Flex minHeight="100vh" align="center" width="full" justifyContent="center">
      <Box
        borderColor="#E1604D"
        borderWidth={0}
        px={7}
        py={7}
        borderRadius={40}
        backgroundColor="white"
        boxShadow="md"
      >
        <HomeHeader />
      </Box>
    </Flex>
  );
};

export default HomePage;
