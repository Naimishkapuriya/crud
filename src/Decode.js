import React from "react";
import jwt_decode from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Decode = () => {
  return (
    <GoogleOAuthProvider clientId="535080794510-kdg33875a7juefd1u7mq3ils0u9r0ohe.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          var decoded = jwt_decode(credentialResponse.credential);
          console.log(decoded);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default Decode;
