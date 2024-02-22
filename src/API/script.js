const appKey = "504848";
const appSecret = "e9iSobbC8PWrnrcamXNAE5uX404dM8GP";
const redirectUri = "https://merchantco.netlify.app/home";
const systemUrl = "https://api-sg.aliexpress.com/rest";
const businessUrl = "https://api-sg.aliexpress.com/sync?method=";

export const getCode = () => {
  const URLParams = new URLSearchParams(window.location.search);
  const code = URLParams.get("code");
  if (code) {
    localStorage.setItem("authCode", code);
  }
  return code;
};

export const getToken = async () => {
  try {
    const code = localStorage.getItem("authCode");
    const timestamp = Date.now();
    const response = await fetch(`${systemUrl}/auth/token/security/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: new URLSearchParams({
        app_key: appKey,
        timestamp: timestamp,
        code: code,
      }),
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error getting token");
  }
};
