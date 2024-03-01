import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Image,
  Text,
  Link,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Button,
  Flex,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import styles from "../styles/ProLoginRegister.css";
import logoGoogle from "../../google.png";
import logoUnbored from "../../Logo_UNBORED.png"
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";

const ProLoginHeader: React.FC<{}> = () => {
  return (
    <Box textAlign="center" mt={4}>
      <Image
        src={logoUnbored}
        alt="Unbored-PRO Logo"
        boxSize="200px"
        objectFit="cover"
        borderRadius="full"
        mx="auto"
      />
      <Text fontSize={20} fontWeight="bold">Pro</Text>
    </Box>
  );
};

const ProLoginForm: React.FC<{}> = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toast = useToast();
  const isFormValid = email !== "" && password !== "";
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    const storedRememberMe = localStorage.getItem("rememberMe");
  
    if (storedEmail && storedPassword && storedRememberMe === "true") {
      console.log(storedEmail);
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      try {
        const response = await axios.post("http://20.216.143.86/auth/login", {
          email,
          password,
        });

        if (response.status === 202) {
          localStorage.setItem('token', response.data.token);
          if (rememberMe) {
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            localStorage.setItem("rememberMe", "true");
          } else {
            localStorage.removeItem("email");
            localStorage.removeItem("password");
            localStorage.removeItem("rememberMe");
          }
          console.log("User connected");
          setIsLoggedIn(true);
        }
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Adress mail ou mot de passe incorrect",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/Pro-menu");
      window.location.reload();
    }
  }, [isLoggedIn, navigate]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box textAlign="center" width="500px">
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
            value={email}
          ></Input>
          <FormLabel textAlign="left">Mot de passe</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Entrez votre mot de passe"
              textAlign="center"
              borderRadius={50}
              borderWidth={2}
              borderColor="#E1604D"
              bg="white"
              onChange={handlePasswordChange}
            ></Input>
            <InputRightElement>
              {showPassword ? (
                <FaEyeSlash onClick={toggleShowPassword} />
              ) : (
                <FaEye onClick={toggleShowPassword} />
              )}
            </InputRightElement>
          </InputGroup>
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
          <Box><Link href="/Pro-forgetpwd">Mot de passe oublié ?</Link></Box>
        </Stack>
        <Text fontSize={15} textAlign="center" color="gray">
          Je n'ai pas de compte <Link color="orange" href="/Pro-register">s'inscrire</Link>
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
              textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)" // Ombre sur le texte
              width="200px" // Ajuster la largeur du bouton
              height="50px" // Ajuster la hauteur du bouton
            >
              Se connecter
            </Button>
          </Link>
        </Link>
        <Stack isInline justifyContent="space-between" my={4}>
          <Button borderRadius={12} boxShadow="lg" color={"black"}>
            <img src={logoGoogle} alt="Logo" className={styles["logo"]} width="20" height="20" />
            Continuer avec Google
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

const ProLoginPage: React.FC<{}> = () => {
  return (
    <Flex minHeight="100vh" align="center" width="full" justifyContent="center">
      <Box borderColor="#E1604D"
        borderWidth={0}
        px={7}
        py={7}
        borderRadius={40}
        backgroundColor="white"
        boxShadow="md">
        <ProLoginHeader />
        <ProLoginForm />
      </Box>
    </Flex>
  );
};

export default ProLoginPage;
