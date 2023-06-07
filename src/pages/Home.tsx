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

            <Text fontSize={20}>Laisse nous plannifier ta journée Drisskow !</Text>
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

const HomeForm: React.FC<{}> = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

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

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const validatePasswordsMatch = () => {
    setPasswordsMatch(password === confirmPassword);
  };

  return (
    <Box textAlign="center">
      <form>
        <FormControl mt={10} textAlign="left">
          <FormLabel textAlign="left" mt={4}></FormLabel>
          <Input
            type="username"
            placeholder="Entres ton nom d'utilisateur"
            textAlign="center"
            borderRadius={50}
            borderWidth={2}
            borderColor="#E1604D"
            value={username}
            onChange={handleUsernameChange}
          ></Input>
          <FormLabel textAlign="left" mt={4}></FormLabel>
          <Input
            type="email"
            placeholder="Entres ton addresse mail"
            textAlign="center"
            borderRadius={50}
            borderWidth={2}
            borderColor="#E1604D"
            value={email}
            onChange={handleEmailChange}
          ></Input>
          <FormLabel textAlign="left" mt={4}></FormLabel>
          <Input
            type="password"
            placeholder="Entres ton mot de passe"
            textAlign="center"
            borderRadius={50}
            borderWidth={2}
            borderColor="#E1604D"
            value={password}
            onChange={handlePasswordChange}
          ></Input>
          <FormLabel textAlign="left" mt={4}></FormLabel>
          <Input
            type="password"
            placeholder="Confirme ton mot de passe"
            textAlign="center"
            borderRadius={50}
            borderWidth={2}
            borderColor="#E1604D"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur={validatePasswordsMatch}
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
            isDisabled={!isFormValid}
          >
            S'inscrire
          </Button>
        </Link>
        <Stack isInline justifyContent="space-between" my={4}>
          <Button borderRadius={12} boxShadow="lg">
            <img src={logoGoogle} alt="Logo" className={styles["logo"]} />
            Continuer avec Google
          </Button>
          <Button borderRadius={12} boxShadow="lg">
            <img src={logoFacebook} alt="Logo" className={styles["logo"]} />
            Continuer avec Facebook
          </Button>
        </Stack>
      </form>
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
