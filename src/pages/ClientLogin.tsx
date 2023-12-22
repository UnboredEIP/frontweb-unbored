import React, { useState } from "react";
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
import styles from "../styles/pages/Register.module.css";
import logoGoogle from "../google.png";
import logoFacebook from "../facebook.png";
import logoUnbored from "../Logo_UNBORED.png"
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ClientLoginHeader: React.FC<{}> = () => {
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
        <Text fontSize={20} fontWeight="bold">Se Connecter</Text>
    </Box>
  );
};




const ClientLoginForm: React.FC<{}> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
            <Checkbox>Se souvenir de moi</Checkbox>
          </Box>
          <Box><Link href="/client-forgetpwd">Mot de passe oublié ?</Link></Box>
        </Stack>
        <Text fontSize={15} textAlign="center" color="gray">
          Je n'ai pas de compte <Link color="orange" href="/client-register">s'inscrire</Link>
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
        backgroundColor="white"
        boxShadow="md">
        <ClientLoginHeader />
        <ClientLoginForm />
      </Box>
    </Flex>
  );
};

export default ClientLoginPage;
