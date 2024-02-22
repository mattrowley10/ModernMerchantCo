const appKey = "504848";
const appSecret = "e9iSobbC8PWrnrcamXNAE5uX404dM8GP";
const redirectUri = "https://merchantco.netlify.app/home";
const systemUrl = "https://api-sg.aliexpress.com/rest";
const businessUrl = "https://api-sg.aliexpress.com/sync?method=";

export const getCode = async () => {
  const URLParams = new URLSearchParams(window.location.search);
  const code = URLParams.get("code");
  if (code) {
    localStorage.setItem("authCode", code);
  }
  console.log(code);
  return code;
};

const generateSign = () => {
  const code = localStorage.getItem("authCode");
  const timestamp = Date.now().toString;
  const string = `${appKey}${timestamp}${code}${appSecret}`;
  const hash = crypto.createHash("sha256").update(string).digest("base64");

  return hash;
};

export const getToken = async () => {
  try {
    const code = localStorage.getItem("authCode");
    console.log(code);
    const timestamp = Date.now().toString();
    console.log(timestamp);
    const encodedTimestamp = encodedURIComponent(timestamp);
    const signMethod = "sha256";
    const sign = generateSign(appKey, timestamp, code, appSecret);
    console.log(sign);
    const params = new URLSearchParams();
    params.append("app_key", appKey);
    params.append("timestamp", timestamp);
    params.append("code", code);
    params.append("sign_method", signMethod);
    params.append("sign", sign);
    const apiUrl = `${systemUrl}/auth/token/security/create${params.toString()}`;
    console.log(apiUrl);
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error getting token");
  }
};

if (code) {
  getToken();
}
