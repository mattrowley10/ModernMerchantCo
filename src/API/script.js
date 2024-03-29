import CryptoJS from "crypto-js";

const appKey = "504848";
const sign_method = "sha256";
const appSecret = "e9iSobbC8PWrnrcamXNAE5uX404dM8GP";
const redirectUri = "https://modernmerchantco.netlify.app/home";
const systemUrl = "https://api-sg.aliexpress.com/rest";
const systemUrlApi = "/auth/token/security/create";
const businessUrl = "https://api-sg.aliexpress.com/sync?method=";
const timestamp = Date.now().toString();

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
  const params = {
    app_key: appKey,
    timestamp: timestamp,
    sign_method: sign_method,
    code: code,
  };
  console.log(params);

  const sortedKeys = Object.keys(params).sort();

  let concatenatedString = "";
  for (const key of sortedKeys) {
    concatenatedString += key + params[key];
  }

  const apiName = "/auth/token/security/create";
  concatenatedString = `${apiName}${concatenatedString}`;
  console.log(concatenatedString);

  const hash = CryptoJS.HmacSHA256(concatenatedString, appSecret);
  console.log(hash);
  const signature = hash.toString(CryptoJS.enc.Hex).toUpperCase();

  console.log(signature);

  return signature;
};

export const getToken = async () => {
  try {
    const code = localStorage.getItem("authCode");
    console.log(code);
    const sign = generateSign();
    console.log(sign);
    const encodedParams = {
      app_key: encodeURIComponent(appKey),
      code: encodeURIComponent(code),
      sign_method: encodeURIComponent(sign_method),
      timestamp: encodeURIComponent(timestamp),
      sign: encodeURIComponent(sign),
    };

    const queryParams = Object.entries(encodedParams)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    console.log(queryParams);
    const url = `${systemUrl}${systemUrlApi}?${queryParams}`;
    console.log(url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error getting token", error.message);
  }
};
