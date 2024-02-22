const appKey = "504848";
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

export const getToken = async (systemUrl, appKey) => {
  try {
    const code = localStorage.getItem("authCode");
    const timestamp = Date.now();
    const response = await fetch(systemUrl + "auth/token/security/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: new URLSearchParams({
        app_key: appKey,
        sign_method: "sha256",
        timestamp: timestamp,
        code: code,
        uuid: uuid,
      }),
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error getting token");
  }
};
