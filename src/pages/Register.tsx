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
} 

from "@chakra-ui/react";
import styles from "../styles/pages/Register.module.css";
import logoGoogle from "../google.png";
import logoFacebook from "../facebook.png";
import { ContextRegister, RegisterData } from "../contexts/RegisterContext";
import { useToast } from "@chakra-ui/react";
import { Select, RadioGroup, Radio} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface RegisterPageProps {
  onRegisterSuccess: () => void;
}

async function makeRegisterRequest(
  email: string,
  password: string,
  username: string,
  number: string,
  birthdate: string,
  gender: string,
) {
  try {
    const response = await fetch("http://20.216.143.86/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username,
        email,
        password,
        "gender": "Homme",
        "birthdate": "2002-01-01",
        "preferences": ["basket", "foot"]
      }),
      
    });
    if (response.status === 201) {
      console.log("User created");
      return true;
    } else {
      const data = await response.json();
      console.error("Register Error ca:", data.error);
      //console.error("Register Error");
      return false;
    }
  } catch (error) {
    console.error("Request error: ", error);
    return false;
  }
}

const RegisterHeader: React.FC<{}> = () => {
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
        <Heading color="whitesmoke"> Crées ton compte !</Heading>
        <Text fontSize={20}>
          Ou <Link href="/login">connectes-toi si tu en a déjà un</Link>
          si tu n'en a pas encore
        </Text>
      </Box>
    </Box>
  );
};

const RegisterForm: React.FC<{ onRegisterSuccess: () => void }> = ({
  onRegisterSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [number, setNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("Homme");


  
  const isFormValid = email !== "" && password !== "" && username !== "" && number !== "";
  const contextData = {
    email: email,
    password: password,
    username: username,
    //number: number,
    birthdate: birthdate,
    gender: gender,
  };
  const toast = useToast();

  const showToast = () => {
    toast({
      title: "Register",
      description: "Registration failed",
      duration: 5000,
      isClosable: true,
      colorScheme: "red",
    });
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  };
  
  const handleBirthdateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthdate(event.target.value);
  };

  const handleGenderChange = (value: string) => {
    setGender(value);
  };

  const handleSubmit = async () => {
    const success = await makeRegisterRequest(email, password, username,number,birthdate,gender);
    if (success) {
      console.log("Login success");
      onRegisterSuccess();
    } else {
      showToast();
      console.log("error");
    }
  };

  return (
    <Box textAlign="center">
      <ContextRegister.Provider value={contextData}>
        <form>
          <FormControl mt={10} textAlign="left">
            <FormLabel textAlign="left">Nom d'utilisateur</FormLabel>
            <Input
              type="username"
              placeholder="Entres ton nom d'utilisateur"
              textAlign="center"
              borderRadius={50}
              borderWidth={2}
              borderColor="#E1604D"
              onChange={handleUsernameChange}
            ></Input>
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
            <FormLabel textAlign="left">Numéro de téléphone</FormLabel>
            <Input
              //type="tel"
              placeholder="Entres ton numéro de téléphone"
              textAlign="center"
              borderRadius={50}
              borderWidth={2}
              borderColor="#E1604D"
              onChange={handleNumberChange}
            ></Input>
            <FormLabel textAlign="left">Date de naissance</FormLabel>
            <Input
              type="date"
              placeholder="Entrez votre date de naissance"
              textAlign="center"
              borderRadius={50}
              borderWidth={2}
              borderColor="#E1604D"
              onChange={handleBirthdateChange}
            ></Input>
          </FormControl>
          <FormLabel textAlign="left">Sexe</FormLabel>
          <RadioGroup onChange={handleGenderChange} value={gender}>
            <Stack direction="row">
              <Radio value="Homme">Homme</Radio>
              <Radio value="Femme">Femme</Radio>
              <Radio value="Autre">Autre</Radio>
            </Stack>
          </RadioGroup>
          <br></br>
          <br></br>
          <Stack isInline justifyContent="space-between">
            <Box>
              <Checkbox>Se souvenir de moi</Checkbox>
            </Box>
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
            S'inscrire
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
      </ContextRegister.Provider>
    </Box>
  );
};

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess }) => {
  const [isCreated, setIsCreated] = useState(false);

  const navigate = useNavigate();
  const HandleLoginSuccess = () => {
    setIsCreated(true);
  };

  if (isCreated === true) {
    navigate("/login");
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
        <RegisterHeader />
        <RegisterForm onRegisterSuccess={HandleLoginSuccess} />
      </Box>
    </Flex>
  );
};

export default RegisterPage;
