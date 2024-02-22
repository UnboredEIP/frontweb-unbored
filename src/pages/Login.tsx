import React, { useState, useEffect } from "react";
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
import { ContextLogin } from "../contexts/LoginContext";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

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
      localStorage.setItem("token", data["token"]);
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
          si tu n'en as pas encore
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
  const [rememberMe, setRememberMe] = useState(false);
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

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async () => {
    const success = await makeLoginRequest(email, password);

    if (success) {
      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("rememberMe");
      }

      onLoginSuccess();
    } else {
      showToast();
      console.log("error ", success);
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    const storedRememberMe = localStorage.getItem("rememberMe");

    if (storedEmail && storedPassword && storedRememberMe === "true") {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

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
              value={email}
            />
            <FormLabel textAlign="left">Mot de passe</FormLabel>
            <Input
              type="password"
              placeholder="Entres ton mot de passe"
              textAlign="center"
              borderRadius={50}
              borderWidth={2}
              borderColor="#E1604D"
              onChange={handlePasswordChange}
              value={password}
            />
          </FormControl>
          <Stack isInline justifyContent="space-between">
            <Box>
              <Checkbox
                isChecked={rememberMe}
                onChange={handleRememberMeChange}
              >
                Se souvenir de moi
              </Checkbox>
            </Box>
            <Box>
              <a href="/forgetpass">Mot de passe oublié ?</a>
            </Box>
          </Stack>
          <Button
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
              Continuer avec Google
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

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
      window.location.reload();
    }
  }, [isLoggedIn, navigate]);

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
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </Box>
    </Flex>
  );
};

export default LoginPage;
