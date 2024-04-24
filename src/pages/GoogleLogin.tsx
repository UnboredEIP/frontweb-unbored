import React from 'react';
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useToast } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";

// Define the prop types for MyCustomButton
interface MyCustomButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

// Use the defined prop types for MyCustomButton
const MyCustomButton: React.FC<MyCustomButtonProps> = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);


async function makeLoginRequest(email: string, navigate: ReturnType<typeof useNavigate>,showToast: (text: string) => void) {
  
  try {
    const response = await fetch("http://20.216.143.86/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password : "toto" }),
    });
    if (response.status === 202) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data["token"]);
      navigate("/home");
      window.location.reload();
      return true;
    } else {
      console.error("Login error");
      showToast("Login with google error");
      return false;
    }
  } catch (error) {
    console.error("Request error: ", error);
    showToast("Login with google error");
    return false;
  }
}

async function makeRegisterRequest(email: string, username: string, navigate: ReturnType<typeof useNavigate>, showToast: (text: string) => void) {
  try {
    const response = await fetch("http://20.216.143.86/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username,
        email,
        password:"toto",
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
      showToast("Account already exist");
      //console.error("Register Error");
      return false;
    }
  } catch (error) {
    console.error("Request error: ", error);
    showToast("Register with Ouath2 error");
    return false;
  }
}

const GoogleOAuthLogin = () => {
  const navigate = useNavigate(); // Move this line inside your component

  const toast = useToast();

  const showToast = (text: string) => {
    toast({
      title: "Ouath2 google",
      description: text,
      duration: 5000,
      isClosable: true,
      colorScheme: "red",
    });
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      //console.log("email reponse: " , tokenResponse);
      //const decoded = jwtDecode(JSON.stringify(tokenResponse.credential));
      //console.log("Rep finale " , decoded);
    },
    flow: 'auth-code',
    onError: (error) => {
      console.error('Error during Google OAuth login:', error);
    }
  });


  return (
    <div>
      <div>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            //console.log("toto gogo coco " , credentialResponse.credential);
            const decoded = jwtDecode(JSON.stringify(credentialResponse.credential));
            //console.log("Repkkpkp finale " , decoded.email,decoded.name,"dododo");
            const isLoginPage = window.location.pathname.includes('login');
            //console.log("test " , isLoginPage);
            if (isLoginPage === false) { 
              makeRegisterRequest(decoded.email,decoded.name,navigate,showToast);
            }

            else {
              makeLoginRequest(decoded.email,navigate,showToast);
              console.log("je suis ici");
            }

          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
        <MyCustomButton onClick={() => login()}></MyCustomButton>
      </div>
    </div>
  );
};

const GoogleOuath = () => {
  return (
    <GoogleOAuthProvider clientId="487961174475-pn9neff45nc2qq1d6unl0veedigfj359.apps.googleusercontent.com">
      <GoogleOAuthLogin />
    </GoogleOAuthProvider>
  );
};

export default GoogleOuath;