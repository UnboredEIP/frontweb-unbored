import React, { useState } from "react";
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
import styles from "../styles/pages/Register.module.css";
import logoGoogle from "../google.png";
import logoFacebook from "../facebook.png";
import axios from "axios";

const ClientLoginHeader: React.FC<{}> = () => {
  return (
    <Box textAlign="center" mt={4}>
      <Box
        borderRadius={40}
        backgroundColor="#E1604D"
        color="whitesmoke"
        boxShadow="lg"
        textShadow="lg"
        padding={7}
      >
        <Heading color="whitesmoke">Unbored-PRO </Heading>
        <Text fontSize={20}>
          Connexion
        </Text>
      </Box>
    </Box>
  );
};



const ClientLoginForm: React.FC<{}> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = email !== "" && password !== "";

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      try {
        const response = await axios.post("http://20.216.143.86/auth/login", {
          email,
          password,
        });
  
        if (response.status === 201) {
          localStorage.setItem('token', response.data.token);
  
          console.log("User connected");
          window.location.href = 'http://20.216.143.86/';
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  return (
    <Box textAlign="center">
      <form>
        <FormControl mt={10} textAlign="left">
          <FormLabel textAlign="left">Email</FormLabel>
          <Input
            type="email"
            placeholder="Entrez votre addresse mail"
            textAlign="center"
            borderRadius={50}
            borderWidth={2}
            borderColor="#E1604D"
            bg="white"
            onChange={handleEmailChange}
          ></Input>
          <FormLabel textAlign="left">Mot de passe</FormLabel>
          <Input
            type="password"
            placeholder="Entrez votre mot de passe"
            textAlign="center"
            borderRadius={50}
            borderWidth={2}
            borderColor="#E1604D"
            bg="white"
            onChange={handlePasswordChange}
          ></Input>
        </FormControl>
        <Stack isInline justifyContent="space-between">
          <Box>
            <Checkbox>Se souvenir de moi</Checkbox>
          </Box>
          <Box><Link href="/client-forgetpwd">Mot de passe oublié ?</Link></Box>
        </Stack>
        <Text fontSize={20} textAlign="center" color="white">
          Ou <Link href="/client-register">créez votre compte</Link>
        </Text>
        <Link href="/home">
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
              onClick={handleSubmit}
            >
              Se connecter
            </Button>
          </Link>
        </Link>
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

const ClientLoginPage: React.FC<{}> = () => {
  return (
    <Flex minHeight="100vh" align="center" width="full" justifyContent="center">
      <Box borderColor="#E1604D"
        borderWidth={0}
        px={7}
        py={7}
        borderRadius={40}
        backgroundColor="lightgray"
        boxShadow="md">
        <ClientLoginHeader />
        <ClientLoginForm />
      </Box>
    </Flex>
  );
};

export default ClientLoginPage;
