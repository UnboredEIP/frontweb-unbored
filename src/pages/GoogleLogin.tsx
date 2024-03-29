import React from 'react';
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

// Define the prop types for MyCustomButton
interface MyCustomButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

// Use the defined prop types for MyCustomButton
const MyCustomButton: React.FC<MyCustomButtonProps> = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);

const GoogleOAuthLogin = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log("email reponse: " , tokenResponse),
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
            console.log("toto gogo coco " , credentialResponse.credential);
            const decoded = jwtDecode(JSON.stringify(credentialResponse.credential));
            console.log("Rep finale " , decoded);


          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
        <MyCustomButton onClick={() => login()}>Sign in with Google 🚀</MyCustomButton>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <GoogleOAuthProvider clientId="487961174475-pn9neff45nc2qq1d6unl0veedigfj359.apps.googleusercontent.com">
      <GoogleOAuthLogin />
    </GoogleOAuthProvider>
  );
};

export default App;
