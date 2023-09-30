import React, { useCallback, useEffect, useState } from "react";
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
  Button,
  Flex,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import logoGoogle from "../google.png";
import logoFacebook from "../facebook.png";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterHeader: React.FC<{}> = () => {
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
          Unbored-PRO
          <Text fontSize={20}>Création de compte</Text>
        </Box>
      </Heading>
    </Box>
  );
};

const RegisterForm: React.FC<{}> = () => {
  const [number, setNumber] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const validatePasswordsMatch = useCallback(() => {
    setPasswordsMatch(password === confirmPassword);
  }, [confirmPassword, password]);

  const isFormValid =
    number !== "" &&
    username !== "" &&
    email !== "" &&
    password !== "" &&
    confirmPassword !== "" &&
    passwordsMatch;

  const handleNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumber(event.target.value);
    console.log("setNumber:", number);
  };

  const handleUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsername(event.target.value);
    console.log("setUsername:", username);
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
    console.log("setEmail:", email);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);

  };

  useEffect(() => {
    validatePasswordsMatch();
  }, [confirmPassword, validatePasswordsMatch]);

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      try {
        const response = await axios.post("http://localhost:3000/auth/register", {
          username,
          email,
          password,
          "gender": "Homme",
          number,
          "birthdate": "2002-01-01",
          "preferences": ["basket", "foot"]
        });
        console.log(response.status);
        if (response.status === 201) {
          console.log("User created");
          window.location.href = 'http://localhost:3001/'
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box textAlign="center">
      <form>
        <FormControl mt={10} textAlign="left">
          <FormLabel textAlign="left" mt={4}></FormLabel>
          <Input
            type="username"
            placeholder="Entrez votre nom d'utilisateur"
            textAlign="center"
            borderRadius={50}
            borderWidth={2}
            borderColor="#E1604D"
            value={username}
            bg="white"
            onChange={handleUsernameChange}
          ></Input>
          <FormLabel textAlign="left" mt={4}></FormLabel>
          <Input
            type="email"
            placeholder="Entrez votre adresse mail"
            textAlign="center"
            borderRadius={50}
            borderWidth={2}
            borderColor="#E1604D"
            value={email}
            bg="white"
            onChange={handleEmailChange}
          ></Input>
          <FormLabel textAlign="left" mt={4}></FormLabel>
          <Input
            type="number"
            placeholder="Entrez votre numéro de téléphone"
            textAlign="center"
            borderRadius={50}
            borderWidth={2}
            borderColor="#E1604D"
            value={number}
            bg="white"
            onChange={handleNumberChange}
          ></Input>
          <FormLabel textAlign="left" mt={4}></FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Entrez votre mot de passe"
              textAlign="center"
              borderRadius={50}
              borderWidth={2}
              borderColor="#E1604D"
              value={password}
              bg="white"
              onChange={handlePasswordChange}
            />
            <InputRightElement>
              {showPassword ? (
                <FaEyeSlash onClick={toggleShowPassword} />
              ) : (
                <FaEye onClick={toggleShowPassword} />
              )}
            </InputRightElement>
          </InputGroup>
          <FormLabel textAlign="left" mt={4}></FormLabel>
          <InputGroup>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmez votre mot de passe"
              textAlign="center"
              borderRadius={50}
              borderWidth={2}
              borderColor="#E1604D"
              value={confirmPassword}
              bg="white"
              onChange={handleConfirmPasswordChange}
            ></Input>
            <InputRightElement>
              {showConfirmPassword ? (
                <FaEyeSlash onClick={toggleShowConfirmPassword} />
              ) : (
                <FaEye onClick={toggleShowConfirmPassword} />
              )}
            </InputRightElement>
          </InputGroup>
          {!passwordsMatch && (
            <Text color="red">Les mots de passe ne correspondent pas !</Text>
          )}
        </FormControl>
        <Text fontSize={20} textAlign="center" color="white">
          Ou <Link href="/client-login">Connectez-vous</Link>
        </Text>
        {/* <Link href="/home"> */}
        <Button
          type="submit"
          mt={4}
          my={4}
          borderRadius={50}
          boxShadow="lg"
          backgroundColor="#E1604D"
          color="whitesmoke"
          isDisabled={!isFormValid}
          onClick={handleSubmit}
        >
          S'inscrire
        </Button>

        {/* </Link> */}
        <Stack isInline justifyContent="space-between" my={4}>
          <Button borderRadius={12} boxShadow="lg" color={"black"}>
            <img src={logoGoogle} alt="Logo" className={styles["logo"]} />
            Continuer avec Google
          </Button>
          <Button borderRadius={12} boxShadow="lg" color={"black"}>
            <img src={logoFacebook} alt="Logo" className={styles["logo"]} />
            Continuer avec Facebook
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

const ClientRegisterPage: React.FC<{}> = () => {
  return (
    <Flex minHeight="100vh" align="center" width="full" justifyContent="center">
      <Box
        borderColor="#E1604D"
        borderWidth={0}
        px={7}
        py={7}
        borderRadius={40}
        backgroundColor="lightgray"
        boxShadow="md"
      >
        <RegisterHeader />
        <RegisterForm />
      </Box>
    </Flex>
  );
};

export default ClientRegisterPage;
