import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Link,  // Add Link component
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

interface ForgetPassProps {
  onUpdateSuccess: () => void;
}

async function makePasswordResetRequest(email: string) {
  try {
    const response = await fetch("https://x2025unbored786979363000.francecentral.cloudapp.azure.com/auth/askreset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (response.status === 200) {
      //console.log("EMAIL SENT");
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

const ForgetPass: React.FC<ForgetPassProps> = ({ onUpdateSuccess }) => {

  const toast = useToast();

  const showToast = () => {
    toast({
      title: "Login",
      description: "Regarder votre boite mail",
      duration: 5000,
      isClosable: true,
      colorScheme: "green",
    });
  };
  
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(""); // Resetting error when email changes
  };

  const handleSubmit = async () => {
    // Validate email
    showToast()
    if (!email) {
      setEmailError("Email is required");
      return;
    }

    const success = await makePasswordResetRequest(email);
    if (success) {
      //console.log("Password reset request successful");
      onUpdateSuccess();
    } else {
      //console.log("Password reset request failed");
    }
  };

  const handleHomeClick = () => {
    // Redirect to "/home" when the "Home" link is clicked
    navigate("/home");
  };
  
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
        <Link to="/home" onClick={handleHomeClick}>
          Home
        </Link>
        <Heading textAlign="center" mb={4}>
          Reset ton mot de passe !
        </Heading>
        <form>
          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="toto@toto.fr"
              textAlign="center"
              borderRadius={50}
              borderWidth={2}
              borderColor="#E1604D"
              onChange={handleEmailChange}
              isInvalid={!!emailError}
            />
            {emailError && <Text color="red">{emailError}</Text>}
          </FormControl>
          <Button
            mt={4}
            borderRadius={50}
            boxShadow="lg"
            backgroundColor="#E1604D"
            color="whitesmoke"
            onClick={handleSubmit}
          >
            Soumettre
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default ForgetPass;
