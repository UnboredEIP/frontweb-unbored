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
import jwt from "jsonwebtoken";

const UpdateProfileHeader: React.FC<{}> = () => {
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
          Mets à jour ton profile !
          <Text fontSize={20}>
            Ou <Link href="/login">connectes-toi </Link>
            si tu en as déjà un
          </Text>
        </Box>
      </Heading>
    </Box>
  );
};

const UpdateProfileForm: React.FC<{}> = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const usernamePlaceholder =
    localStorage.getItem("token")?.toString() ?? "Default Placeholder";

  const isFormValid =
    username !== "" &&
    email !== "" &&
    password !== "" &&
    confirmPassword !== "" &&
    passwordsMatch;

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Box textAlign="center">
      <form>
        <FormControl mt={10} textAlign="left">
          <FormLabel textAlign="left" mt={4}>
            Prénom
          </FormLabel>
          <Input
            placeholder={usernamePlaceholder}
            textAlign="center"
            borderRadius={50}
            borderWidth={2}
            borderColor="#E1604D"
            // onChange={handleUsernameChange}
          ></Input>
          <FormLabel textAlign="left" mt={4}>
            Nom de famille
          </FormLabel>
          <Input
            type="email"
            placeholder={usernamePlaceholder}
            textAlign="center"
            borderRadius={50}
            borderWidth={2}
            borderColor="#E1604D"
          ></Input>
          <FormLabel textAlign="left" mt={4}>
            Nom d'utilisateur
          </FormLabel>
          <Input
            placeholder={usernamePlaceholder}
            textAlign="center"
            borderRadius={50}
            borderWidth={2}
            borderColor="#E1604D"
            onChange={handlePasswordChange}
          ></Input>
          <FormLabel textAlign="left" mt={4}>
            Biographie
          </FormLabel>
          <Input
            placeholder={usernamePlaceholder}
            textAlign="center"
            borderRadius={50}
            borderWidth={2}
            borderColor="#E1604D"
          ></Input>
          <FormLabel textAlign="left" mt={4}>
            Date d'anniversaire
          </FormLabel>
          <Input
            type="password"
            placeholder={usernamePlaceholder}
            textAlign="center"
            borderRadius={50}
            borderWidth={2}
            borderColor="#E1604D"
            value={confirmPassword}
          ></Input>
          {!passwordsMatch && (
            <Text color="red">Mot de pass non identique !</Text>
          )}
        </FormControl>
        <Stack isInline justifyContent="space-between">
          <Box>
            <Checkbox>Se souvenir de moi</Checkbox>
          </Box>
          <Box>*Mot de passe oublié ?</Box>
        </Stack>
        <Link href="/home">
          <Button
            // type="submit"
            mt={4}
            my={4}
            borderRadius={50}
            boxShadow="lg"
            backgroundColor="#E1604D"
            color="whitesmoke"
          >
            Soumettre
          </Button>
        </Link>
      </form>
    </Box>
  );
};

const UpdateProfilePage: React.FC<{}> = () => {
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
        <UpdateProfileHeader />
        <UpdateProfileForm />
      </Box>
    </Flex>
  );
};

export default UpdateProfilePage;
