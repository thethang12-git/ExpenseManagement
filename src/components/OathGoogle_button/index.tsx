"use client"
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

const clientId = "1090829690859-i89enmif243f8eb3k59gfimmsrmuccju.apps.googleusercontent.com";

function GoogleButton() {
  const router = useRouter();

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <GoogleLogin
          onSuccess={credentialResponse => {
            const token = credentialResponse.credential;
            console.log("Google credential:", token);
            if (!token) {
                console.log("No credential returned");
                return; 
                }
             fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`)
              .then(res => res.json())
              .then(user => {
                alert("Google user info: " + user.email + "chuyển trang ở đây");
                router.push("/"); 
              })
              .catch(err => {
                console.error("Failed to fetch user info", err);
              });
          }}
        onError={() => {
          console.log("Login Failed");}}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleButton;
