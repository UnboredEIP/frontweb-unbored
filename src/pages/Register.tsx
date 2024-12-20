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
  useToast,
  Select,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/pages/Register.module.css";
import logoGoogle from "../google.png";
import logoFacebook from "../facebook.png";
import { ContextRegister, RegisterData } from "../contexts/RegisterContext";
import GoogleOuath from "./GoogleLogin"; // Import GoogleOAuthLogin component

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
    const response = await fetch("https://x2025unbored786979363000.francecentral.cloudapp.azure.com/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        gender,
        birthdate,
        preferences: ["basket", "foot"],
      }),
    });
    if (response.status === 201) {
      console.log("User created");
      return true;
    } else {
      const data = await response.json();
      console.error("Register Error:", data.error);
      return false;
    }
  } catch (error) {
    console.error("Request error:", error);
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
        <Heading color="whitesmoke"> Crée ton compte !</Heading>
        <Text fontSize={20}>
          Ou <Link href="/login">connecte-toi si tu en a déjà un</Link>
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

  const isFormValid = email !== "" && password !== "" && username !== "";
  const contextData = {
    email,
    password,
    username,
    number,
    birthdate,
    gender,
  };
  const toast = useToast();

  const showToast = (title: string, description: string, status: "error" | "success") => {
    toast({
      title,
      description,
      duration: 5000,
      isClosable: true,
      status,
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
    const dateValue = event.target.value;
    const formattedDate = new Date(dateValue).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    setBirthdate(formattedDate);
  };

  const handleGenderChange = (value: string) => {
    setGender(value);
  };

  const handleSubmit = async () => {
    if (password.length < 6) {
      showToast("Erreur", "Ton mot de passe doit avoir au moins 6 caractères", "error");
      return;
    }
    const success = await makeRegisterRequest(email, password, username, number, birthdate, gender);
    if (success) {
      onRegisterSuccess();
    } else {
      showToast("Erreur", "Registration failed", "error");
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
              placeholder="Entre ton nom d'utilisateur"
              textAlign="center"
              borderRadius={50}
              borderWidth={2}
              borderColor="#E1604D"
              onChange={handleUsernameChange}
            ></Input>
            <FormLabel textAlign="left">Email</FormLabel>
            <Input
              type="email"
              placeholder="Entre ton adresse mail"
              textAlign="center"
              borderRadius={50}
              borderWidth={2}
              borderColor="#E1604D"
              onChange={handleEmailChange}
            ></Input>
            <FormLabel textAlign="left">Mot de passe</FormLabel>
            <Input
              type="password"
              placeholder="Entre ton mot de passe"
              textAlign="center"
              borderRadius={50}
              borderWidth={2}
              borderColor="#E1604D"
              onChange={handlePasswordChange}
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
          <Select
            placeholder="Sélectionner le sexe"
            value={gender}
            onChange={(e) => handleGenderChange(e.target.value)}
            borderRadius={50}
            borderWidth={2}
            borderColor="#E1604D"
          >
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            <option value="Autre">Autre</option>
            <option value="Ne pas dire">Ne préfère pas dire</option>
          </Select>
          <br></br>
          <br></br>
          <Stack isInline justifyContent="space-between">
            <Box>
              <Checkbox>Se souvenir de moi</Checkbox>
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
            S'inscrire
          </Button>
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

  if (isCreated) {
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
        <GoogleOuath />
      </Box>
    </Flex>
  );
};

export default RegisterPage;
