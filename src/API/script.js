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

const generateSign = (
  appKey,
  appSecret,
  code,
  signMethod,
  timestamp,
  apiName = ""
) => {
  // Step 1: Sort all request parameters alphabetically by parameter name
  const params = {
    app_key: appKey,
    timestamp: timestamp,
    sign_method: signMethod,
    code: code,
  };
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((acc, key) => {
      acc[key] = params[key];
      return acc;
    }, {});

  // Step 2: Concatenate the sorted parameters and their values into a string
  let concatenatedString = "";
  if (apiName) {
    concatenatedString += apiName;
  }
  for (const key in sortedParams) {
    concatenatedString += key + sortedParams[key];
  }

  // Step 3: Encode the concatenated string in UTF-8 format
  const encodedString = encodeURIComponent(concatenatedString);

  // Step 4: Generate a digest using the HMAC-SHA256 algorithm with the application secret
  const hash = CryptoJS.HmacSHA256(encodedString, appSecret);

  // Step 5: Convert the digest to hexadecimal format
  const signature = hash.toString(CryptoJS.enc.Hex);

  return signature;
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
