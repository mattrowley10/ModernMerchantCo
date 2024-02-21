import React from "react";

export default function Login() {
  const redirectToAli = () => {
    const authUrl =
      "https://api-sg.aliexpress.com/oauth/authorize?response_type=code&force_auth=true&redirect_uri=https://modernmerchantco.netlify.app/home&client_id=504848";
    window.location.href = authUrl;
  };

  return (
    <div>
      <button onClick={() => redirectToAli()}>Login</button>
    </div>
  );
}
