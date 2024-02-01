import React, { useState, useContext } from "react";
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
import { ContextLogin, LoginData } from "../contexts/LoginContext";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />

interface LoginPageProps {
  onLoginSuccess: () => void;
}

async function makeLoginRequest(email: string, password: string) {
  try {
    const response = await fetch("http://20.216.143.86/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.status === 202) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data["refresh"]);
      return true;
    } else {
      console.error("Login error");
      return false;
    }
  } catch (error) {
    console.error("Request error: ", error);
    return false;
  }
}

const LoginHeader: React.FC<{}> = () => {
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
        <Heading color="whitesmoke"> Connectes toi !</Heading>
        <Text fontSize={20}>
          Ou <Link href="/register">crées ton compte </Link>
          si tu n'en a pas encore
        </Text>
      </Box>
    </Box>
  );
};



const LoginForm: React.FC<{ onLoginSuccess: () => void }> = ({
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isFormValid = email !== "" && password !== "";
  const contextData = {
    email: email,
    password: password,
  };
  const toast = useToast();

  const showToast = () => {
    toast({
      title: "Login",
      description: "Login failed",
      duration: 5000,
      isClosable: true,
      colorScheme: "red",
    });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async () => {
    const success = await makeLoginRequest(email, password);
    if (success) {
      console.log("Login success");
      onLoginSuccess();
    } else {
      showToast();
      console.log("error " , success);
    }
  };

  return (
    <Box textAlign="center">
      <ContextLogin.Provider value={contextData}>
        <form>
          <FormControl mt={10} textAlign="left">
            <FormLabel textAlign="left">Email</FormLabel>
            <Input
              type="email"
              placeholder="Entres ton addresse mail"
              textAlign="center"
              borderRadius={50}
              borderWidth={2}
              borderColor="#E1604D"
              onChange={handleEmailChange}
            ></Input>
            <FormLabel textAlign="left">Mot de passe</FormLabel>
            <Input
              type="password"
              placeholder="Entres ton mot de passe"
              textAlign="center"
              borderRadius={50}
              borderWidth={2}
              borderColor="#E1604D"
              onChange={handlePasswordChange}
            ></Input>
          </FormControl>
          <Stack isInline justifyContent="space-between">
            <Box>
              <Checkbox>Se souvenir de moi</Checkbox>
            </Box>
            <Box><a href="/update-password">Mot de passe oublié ?</a></Box>
          </Stack>
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
      </ContextLogin.Provider>
    </Box>
  );
};

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const HandleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  if (isLoggedIn === true) {
    navigate("/home");
  }

  return (
    <Flex minHeight="80vh" align="center" width="full" justifyContent="center">
      <Box
        borderColor="#E1604D"
        borderWidth={0}
        px={7}
        py={7}
        borderRadius={40}
        backgroundColor="white"
        boxShadow="md"
      >
        <LoginHeader />
        <LoginForm onLoginSuccess={HandleLoginSuccess} />
      </Box>
    </Flex>
  );
};

export default LoginPage;
