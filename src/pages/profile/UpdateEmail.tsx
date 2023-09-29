import React, { useState } from "react";
import styles from "../styles/pages/Register.module.css";
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
import logoGoogle from "../google.png";
import logoFacebook from "../facebook.png";
import jwt from "jsonwebtoken";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Calendar,
  CalendarDefaultTheme,
  CalendarControls,
  CalendarPrevButton,
  CalendarNextButton,
  CalendarMonths,
  CalendarMonth,
  CalendarMonthName,
  CalendarWeek,
  CalendarDays,
  CalendarValues,
  CalendarDate,
} from "@uselessdev/datepicker";
import { DateTimePicker } from "smart-webcomponents-react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { ContextUpdateEmail } from "../../contexts/UpdateEmailContext";

type SelectedDate = Date | null;
interface UpdateEmailPageProps {
  onUpdateSuccess: () => void;
}

async function makeUpdateEmailRequest(email: string) {
  try {
    const response = await fetch("http://localhost:8080/profile/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")?.toString()}`,
      },
      body: JSON.stringify({ email }),
    });
    if (response.status === 200) {
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

const UpdateEmailHeader: React.FC<{}> = () => {
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
          Mets à jour ton adresse mail !
        </Box>
      </Heading>
    </Box>
  );
};

function getTodayFormatted(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = today.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const UpdateEmailForm: React.FC<{ onUpdateSuccess: () => void }> = ({
  onUpdateSuccess,
}) => {
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");

  const defaultBirthday: CalendarValues = {
    start: 12,
    end: 13,
  };

  const [birthday, setBirthday] = useState<CalendarValues>(defaultBirthday);
  const handleSelectDate = (values: CalendarValues) => setBirthday(values);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const usernamePlaceholder =
    localStorage.getItem("token")?.toString() ?? "username";
  const genderPlaceholder = "M" ?? "No gender";
  const birthdayPlaceholder =
    localStorage.getItem("token")?.toString() ?? "Default Placeholder";

  const [selectedDate, setSelectedDate] = useState<SelectedDate>(null);

  const handleDateChange = (date: SelectedDate) => {
    setSelectedDate(date);
  };

  const contextData = {
    email: email,
  };

  const isFormValid =
    username !== "" &&
    email !== "" &&
    password !== "" &&
    confirmPassword !== "" &&
    passwordsMatch &&
    gender !== "";

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    const success = await makeUpdateEmailRequest(email);
    if (success) {
      console.log("Update success");
      onUpdateSuccess();
    } else {
      console.log("error");
    }
  };

  return (
    <Box textAlign="center">
      <ContextUpdateEmail.Provider value={contextData}>
        <form>
          <FormControl mt={10} textAlign="left">
            <FormLabel textAlign="left" mt={4}>
              Email
            </FormLabel>
            <Input
              placeholder={"toto@toto.fr"}
              textAlign="center"
              borderRadius={50}
              borderWidth={2}
              borderColor="#E1604D"
              onChange={handleEmailChange}
            ></Input>

            {/* <FormLabel textAlign="left" mt={4}>
            Date d'anniversaire
          </FormLabel>

          <ChakraProvider theme={CalendarDefaultTheme}>
            <Calendar value={birthday} setBirthday={handleSelectDate}>
              <CalendarControls>
                <CalendarPrevButton />
                <CalendarNextButton />
              </CalendarControls>

              <CalendarMonths>
                <CalendarMonth>
                  <CalendarMonthName />
                  <CalendarWeek />
                  <CalendarDays />
                </CalendarMonth>
              </CalendarMonths>
            </Calendar>
          </ChakraProvider> */}
            {/* <Input
            type="birthday"
            placeholder={usernamePlaceholder}
            textAlign="center"
            borderRadius={50}
            borderWidth={2}
            borderColor="#E1604D"
            value={confirmPassword}
          ></Input> */}

            {!passwordsMatch && (
              <Text color="red">Mot de pass non identique !</Text>
            )}
          </FormControl>
          <Stack isInline justifyContent="space-between">
            <Box>
              <Checkbox>Se souvenir de moi</Checkbox>
            </Box>
            <Box>*Mot de passe oublié ?</Box>
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
      </ContextUpdateEmail.Provider>
    </Box>
  );
};

const UpdateEmailPage: React.FC<UpdateEmailPageProps> = ({
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
        <UpdateEmailHeader />
        <UpdateEmailForm onUpdateSuccess={HandleLoginSuccess} />
      </Box>
    </Flex>
  );
};

export default UpdateEmailPage;
