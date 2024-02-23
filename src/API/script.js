import CryptoJS from "crypto-js";

const appKey = "504848";
const sign_method = "sha256";
const appSecret = "e9iSobbC8PWrnrcamXNAE5uX404dM8GP";
const redirectUri = "https://merchantco.netlify.app/home";
const systemUrl = "https://api-sg.aliexpress.com/rest";
const systemUrlApi = "/auth/token/security/create";
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
  console.log(code);
  const timestamp = Date.now().toString();
  console.log(timestamp);
  const string = `${appKey}${code}${sign_method}${timestamp}`;
  console.log(string);
  const hash = CryptoJS.HmacSHA256(string, appSecret);
  const signature = hash.toString(CryptoJS.enc.Hex);
  const sigToUpper = signature.toUpperCase();
  console.log(hash);
  return sigToUpper;
};

export const getToken = async () => {
  try {
    const code = localStorage.getItem("authCode");
    console.log(code);
    const timestamp = Date.now().toString();
    console.log(timestamp);
    const sign = generateSign();
    console.log(sign);
    const url =
      `${systemUrl}${systemUrlApi}` +
      `?app_key=${appKey}&` +
      `timestamp=${timestamp}&` +
      `sign_method=${sign_method}&` +
      `code=${code}&` +
      `sign=${sign}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error getting token");
  }
};
