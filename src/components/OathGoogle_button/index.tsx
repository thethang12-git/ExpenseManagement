"use client"
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import UserService from "@/src/service/dataService";

const clientId = "1090829690859-i89enmif243f8eb3k59gfimmsrmuccju.apps.googleusercontent.com";

function GoogleButton() {
  const router = useRouter();

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
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
              .then(async user => {
                const validate = await UserService.validateUser(user.email)
                if(validate) {
                    localStorage.setItem("email", JSON.stringify(user.email));
                    localStorage.setItem("user", JSON.stringify(user.name ));
                    localStorage.setItem("avatar", JSON.stringify(user.picture));
                    alert("Google user info: " + user.email + "chuyển trang");
                    router.push("/");
                }
                else {
                    UserService.addUser({
                        name: user.name,
                        email: user.email,
                        password: "",
                    });
                    localStorage.setItem("email", JSON.stringify(user.email));
                    localStorage.setItem("user", JSON.stringify(user.name ));
                    localStorage.setItem("avatar", JSON.stringify(user.picture));
                    alert("Thêm mới user, chuyển trang");
                    router.push("/");
                }
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
