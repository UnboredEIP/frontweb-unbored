import React, { useState, useEffect } from "react";
import styles from "../styles/pages/Register.module.css";
import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Button,
  Flex,
  Select,
} from "@chakra-ui/react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import { ContextUpdateProfile } from "../../contexts/UpdateProfileContext";
import axios from "axios"; // Import axios

type SelectedDate = Date | null;
interface UpdateProfilePageProps {
  onUpdateSuccess: () => void;
}

async function makeUpdateProfileRequest(
  username: string,
  email: string,
  password: string,
  gender: string,
  birthdate: string,
  preferences: string
) {
  try {
    const token = localStorage.getItem('token');
    const bodyData: any = {};

    if (username) bodyData['username'] = username;
    if (email) bodyData['email'] = email;
    if (gender) bodyData['gender'] = gender;
    if (password) bodyData['password'] = password;
    if (birthdate) bodyData['birthdate'] = birthdate;
    if (preferences) bodyData['preferences'] = String(preferences).split(',');

    const response = await fetch("https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyData),
    });

    if (response.status === 200) {
      console.log("USER UPDATED");
      return true;
    } else {
      console.log("oooooo");
      console.error("toto , " , response , " tata");
      console.error("UPDoiojiojATE ERROR");
      return false;
    }
  } catch (error) {
    console.error("Request error: ", error);
    return false;
  }
}

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
        </Box>
      </Heading>
    </Box>
  );
};

const UpdateProfileForm: React.FC<{ onUpdateSuccess: () => void }> = ({
  onUpdateSuccess,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [preferences, setPreferences] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getProfileInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token === null) {
          navigate("/");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const url = "https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile";
        const response = await axios.get(url, config);
        const profileDetails = response.data.user;
        const birthdate = profileDetails.birthdate?.toString().substring(0, 10);
        console.log("Info Profil");
        console.log(profileDetails);
        setUsername(profileDetails.username);
        setEmail(profileDetails.email);
        setGender(profileDetails.gender);
        setBirthdate(birthdate);
        setPreferences(profileDetails.preferences);
      } catch (error) {
        console.error("Token value: ", localStorage.getItem("token"));
        console.error(error);
      }
    };

    getProfileInfo();
  }, []);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordsMatch(event.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
    setPasswordsMatch(password === event.target.value);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };

  const handleBirthdateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthdate(event.target.value);
  };

  const handlePreferencesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPreferences(event.target.value);
  };

  const handleSubmit = async () => {
    const success = await makeUpdateProfileRequest(
      username,
      email,
      password,
      gender,
      birthdate,
      preferences
    );
    if (success) {
      console.log("Update success");
      onUpdateSuccess();
    } else {
      console.log("error");
    }
  };

  const isFormValid =
    username !== "" &&
    email !== "" &&
    password !== "" &&
    confirmPassword !== "" &&
    gender !== "" &&
    birthdate !== "" &&
    password === confirmPassword;

  return (
    <Box textAlign="center">
      <ContextUpdateProfile.Provider value={{ username, gender }}>
        <form>
          <FormControl mt={10} textAlign="left">
            <FormLabel textAlign="left" mt={4}>
              Nom d'utilisateur
            </FormLabel>
            <Input
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={handleUsernameChange}
            />
            <FormLabel textAlign="left" mt={4}>
              Email
            </FormLabel>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <FormLabel textAlign="left" mt={4}>
              Mot de passe
            </FormLabel>
            <Input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={handlePasswordChange}
            />
            <FormLabel textAlign="left" mt={4}>
              Confirmer le mot de passe
            </FormLabel>
            <Input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {!passwordsMatch && (
              <Text color="red">Les mots de passe ne correspondent pas!</Text>
            )}
            <FormLabel textAlign="left" mt={4}>
              Genre
            </FormLabel>
            <Select
              placeholder="Sélectionner le genre"
              value={gender}
              onChange={handleGenderChange}
            >
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
              <option value="Autre">Autre</option>
            </Select>
            <FormLabel textAlign="left" mt={4}>
              Date de naissance
            </FormLabel>
            <Input
              type="date"
              value={birthdate}
              onChange={handleBirthdateChange}
            />
            <FormLabel textAlign="left" mt={4}>
              Préférences
            </FormLabel>
            <Input
              placeholder="Préférences"
              value={preferences}
              onChange={handlePreferencesChange}
            />
          </FormControl>
          <Button
            mt={4}
            my={4}
            borderRadius={50}
            boxShadow="lg"
            backgroundColor="#E1604D"
            color="whitesmoke"
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Soumettre
          </Button>
        </form>
      </ContextUpdateProfile.Provider>
    </Box>
  );
};

const UpdateProfilePage: React.FC<UpdateProfilePageProps> = ({
  onUpdateSuccess,
}) => {
  const [isUpdateIn, setIsUpdateIn] = useState(false);
  const navigate = useNavigate();

  const HandleLoginSuccess = () => {
    setIsUpdateIn(true);
  };

  if (isUpdateIn === true) {
    navigate("/home");
  }

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
        <UpdateProfileForm onUpdateSuccess={HandleLoginSuccess} />
      </Box>
    </Flex>
  );
};

export default UpdateProfilePage;
