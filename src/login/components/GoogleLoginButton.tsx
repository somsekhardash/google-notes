import React from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { Navigate } from "react-router-dom";

function LoginButton() {
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { data: responseData }: any = await fetch(
        "http://localhost:4000/api/auth",
        {
          body: JSON.stringify({ code: tokenResponse.code }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (responseData) {
        const { access_token, refresh_token, id_token } = responseData;
        window.localStorage.setItem("access_token", access_token);
        window.localStorage.setItem("refresh_token", refresh_token);
        window.localStorage.setItem("id_token", id_token);
        return <Navigate to="/dashboard" replace={true} />
      } else {
        console.error("There is an error");
      }
    },
    onError: () => {
      console.error("Google login failed");
    },
    flow: "auth-code",
    scope: "openid email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/tasks",
  });

  return (
    <Button variant="outline" className="w-full" onClick={() => googleLogin()}>
      Login with Google
    </Button>
  );
}

export default function GoogleLoginButton() {
  return (
    <GoogleOAuthProvider clientId="517672700164-j9qglhth4qq9lrb16v3q5cjrqd46lahm.apps.googleusercontent.com">
      <LoginButton />
    </GoogleOAuthProvider>
  );
}
