import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Flex,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useLocation  } from "react-router-dom";
import { ContextUpdatePassword } from "../../contexts/UpdatePasswordContext";

interface ForgotPasswordPageProps {
  onUpdateSuccess: () => void;
}

async function makeUpdatePasswordRequest(id: string, password: string) {
  try {
    const response = await fetch(`http://20.216.143.86/auth/reset?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });
    if (response.status === 202) {
      console.log("USER UPDATED");
      return true;
    } else {
      console.error("UPDATE ERROR");
      return false;
    }
  } catch (error) {
    console.error("Request error: ", error);
    return false;
  }
}

const UpdatePasswordHeader: React.FC<{}> = () => {
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
          Mot de passe oulbié ? Change le !
        </Box>
      </Heading>
    </Box>
  );
};

const UpdatePasswordForm: React.FC<{ onUpdateSuccess: () => void }> = ({
  onUpdateSuccess,
}) => {
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id') ?? '';


  const [password, setPassword] = useState("");


  const contextData = {
    password: password,
    id : id,
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    const success = await makeUpdatePasswordRequest(id, password);
    if (success) {
      console.log("Update success");
      onUpdateSuccess();
    } else {
      console.log("error");
    }
  };

  return (
    <Box textAlign="center">
      <ContextUpdatePassword.Provider value={contextData}>
        <form>
          <FormControl mt={10} textAlign="left">
            <FormLabel textAlign="left" mt={4}>
              Nouveau mot de passe
            </FormLabel>
            <Input
              type="password"
              textAlign="center"
              borderRadius={50}
              borderWidth={2}
              borderColor="#E1604D"
              onChange={handlePasswordChange}
            ></Input>

          </FormControl>
          <Stack isInline justifyContent="space-between">
          </Stack>
          <Button
            // type="submit"
            mt={4}
            my={4}
            borderRadius={50}
            boxShadow="lg"
            backgroundColor="#E1604D"
            color="whitesmoke"
            onClick={handleSubmit}
          >
            Soumettre
          </Button>
        </form>
      </ContextUpdatePassword.Provider>
    </Box>
  );
};

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({
  onUpdateSuccess,
}) => {
  const [isUpdateIn, setIsUpdateIn] = useState(false);

  const navigate = useNavigate();

  const HandleLoginSuccess = () => {
    setIsUpdateIn(true);
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
        <UpdatePasswordHeader />
        <UpdatePasswordForm onUpdateSuccess={HandleLoginSuccess} />
      </Box>
    </Flex>
  );
};

export default ForgotPasswordPage;
