import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Stack,
  Button,
  Link,
} from "@chakra-ui/react";
import styles from "../styles/pages/Register.module.css";
import logoInstagram from "../instagram.png";

const PresentationHeader: React.FC<{}> = () => {
  return (
    <Box textAlign="center" mt={4}>
      <Heading>
        <Box
          borderRadius={40}
          backgroundColor="#E1604D"
          color="whitesmoke"
          boxShadow="lg"
          textShadow="lg"
          padding={7}
        >
          <Text>Bienvenue sur UnBored</Text>

          <Text fontSize={20}>
            L'application qui te satisfera de l'utilisation
          </Text>
          <Text fontSize={20}>de ton temps libre tout en prenant du fun</Text>
          <Text fontSize={20}>
            N'hésite pas à nous suivre sur instagram juste
          </Text>
          <Text fontSize={20}>
            en dessous pour être au courant de l'avancé du projet !
          </Text>
        </Box>
      </Heading>
    </Box>
  );
};

const PresentationPage: React.FC<{}> = () => {
  return (
    <Flex minHeight="auto" align="center" width="full" justifyContent="center">
      <Box
        borderColor="#E1604D"
        borderWidth={0}
        px={7}
        py={7}
        borderRadius={40}
        backgroundColor="white"
        boxShadow="md"
      >
        <PresentationHeader />
        <Box padding={150}></Box>
        <Link href="https://www.instagram.com/unbored_paris/">
          <Button borderRadius={12} boxShadow="lg" color={"black"}>
            <img src={logoInstagram} alt="Logo" className={styles["logo"]} />
            Rejoins nous sur Instagram
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default PresentationPage;
