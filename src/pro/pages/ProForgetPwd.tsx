import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Link as ChakraLink,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

const ProLoginHeader: React.FC<{}> = () => {
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
        <Heading color="whitesmoke">Unbored-PRO</Heading>
        <Text fontSize={20}>Mot de passe oublié</Text>
      </Box>
    </Box>
  );
};

const ProLoginForm: React.FC<{}> = () => {
  const [email, setEmail] = useState("");
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [code, setCode] = useState("");
  const [isEmailVisible, setIsEmailVisible] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const [isPasswordFormValid, setIsPasswordFormValid] = useState(false);

  const isFormValid = email !== "";

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  async function makePasswordResetRequest(email: string) {
    try {
      const response = await fetch("http://20.216.143.86/auth/askreset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.status === 202) {
        console.log("EMAIL SENT");
        return true;
      } else {
        console.error("EMAIL SEND ERROR:", await response.text());
        return false;
      }
    } catch (error) {
      console.error("Request error: ", error);
      return false;
    }
  } 

  const handleCodeChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // try {
    //   const response = await axios.post("url", {
    //     code: event.target.value,
    //   });
    //   if (response.status === 200) {
    setCode(event.target.value);
    //   } else {
    //     console.error('Request failed');
    //   }
    // } catch (error) {
    //   console.error('Error sending request:', error);
    // }
  };

  const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
    handleConfirmPassword();
  };

  const handleConfirmNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(event.target.value);
    handleConfirmPassword();
  };

  const handleSendCode = async () => {
    // try {
    //   const response = await axios.post("url", {
    //     email,
    //   });
    //   if (response.status === 200) {
    setIsCodeVisible(true);
    setIsEmailVisible(false);
    //   } else {
    //     console.error('Request failed');
    //   }
    // } catch (error) {
    //   console.error('Error sending request:', error);
    // }
  };

  const toast = useToast();
  const navigate = useNavigate();

  const handleSendEmail = async () => {
    const isEmailSent = await makePasswordResetRequest(email);
    if (isEmailSent) {
      toast({
        title: "Succès",
        description: "Un mail vous a été envoyé",
        status: "success",
        duration: 3000, // Durée d'affichage du toast en millisecondes
        isClosable: true
      });
      
      setTimeout(() => {
        navigate('/Pro-login');
      }, 3000);   
    } else {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envois du mail",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChangePassword = async () => {
    if (newPassword === confirmNewPassword) {
      try {
        const response = await axios.post("url", {
          newPassword,
        });
        if (response.status === 200) {
          return <Link to="/Pro-login" />;
        } else {
          console.error('Request failed');
        }
      } catch (error) {
        console.error('Error sending request:', error);
      }
    } else {
      console.log("password pas similaire " + newPassword + " et " + confirmNewPassword + "\n");
    }
  };

  const handleConfirmCode = () => {
    setIsCodeConfirmed(true);
  };

  const handleConfirmPassword = () => {
    setIsPasswordFormValid(newPassword !== "" && confirmNewPassword !== "");
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      try {
        const response = await axios.post("http://192.168.43.91:3000/Pro-forgetpwd", {
          email,
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Box textAlign="center">
      <form>
        {isEmailVisible && (
          <FormControl mt={10} marginBottom={10} textAlign="left">
            <FormLabel textAlign="left">Entrez l'email de votre compte</FormLabel>
            <Input
              type="email"
              placeholder="Entrez votre adresse mail"
              textAlign="center"
              borderRadius={50}
              borderWidth={2}
              borderColor="#E1604D"
              bg="white"
              onChange={handleEmailChange}
            ></Input>
          </FormControl>
        )}
        {!isCodeVisible && isEmailVisible && (
          <>
            <Text fontSize={16} color="white">
              Un mail avec un lien pour réinitialiser votre mot de passe vous sera envoyé
            </Text>
            <Button
              mt={4}
              my={4}
              borderRadius={50}
              boxShadow="lg"
              backgroundColor="#E1604D"
              color="whitesmoke"
              isDisabled={!isFormValid}
              onClick={handleSendEmail}
            >
              Envoyer
            </Button>
          </>
        )}
        {isCodeVisible && !isCodeConfirmed && (
          <>
            <FormControl mt={10} marginBottom={10} textAlign="left">
              <FormLabel textAlign="left">Entrez le code à 6 chiffres</FormLabel>
              <Input
                type="text"
                placeholder="Entrez le code"
                textAlign="center"
                borderRadius={50}
                borderWidth={2}
                borderColor="#E1604D"
                bg="white"
                onChange={handleCodeChange}
              ></Input>
            </FormControl>
            <Button
              mt={4}
              my={4}
              borderRadius={50}
              boxShadow="lg"
              backgroundColor="#E1604D"
              color="whitesmoke"
              isDisabled={!code}
              onClick={handleConfirmCode}
            >
              Confirmer
            </Button>
          </>
        )}
        {isCodeConfirmed && (
          <>
            <FormControl mt={10} marginBottom={10} textAlign="left">
              <FormLabel textAlign="left">Nouveau mot de passe</FormLabel>
              <Input
                type="password"
                placeholder="Entrez le nouveau mot de passe"
                textAlign="center"
                borderRadius={50}
                borderWidth={2}
                borderColor="#E1604D"
                bg="white"
                onChange={handleNewPasswordChange}
              ></Input>
            </FormControl>
            <FormControl mt={10} marginBottom={10} textAlign="left">
              <FormLabel textAlign="left">Confirmer le nouveau mot de passe</FormLabel>
              <Input
                type="password"
                placeholder="Confirmez le nouveau mot de passe"
                textAlign="center"
                borderRadius={50}
                borderWidth={2}
                borderColor="#E1604D"
                bg="white"
                onChange={handleConfirmNewPasswordChange}
              ></Input>
            </FormControl>
            {/* <Link to="/Pro-login"> */}
            <Button
              as={ChakraLink}
              mt={4}
              my={4}
              borderRadius={50}
              boxShadow="lg"
              backgroundColor="#E1604D"
              color="whitesmoke"
              isDisabled={!isPasswordFormValid}
              onClick={handleChangePassword}
            >
              Confirmer
            </Button>
            {/* </Link> */}
          </>
        )}
      </form>
    </Box>
  );
};

const ProForgetPwd: React.FC<{}> = () => {
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
        <ProLoginHeader />
        <ProLoginForm />
      </Box>
    </Flex>
  );
};

export default ProForgetPwd;
