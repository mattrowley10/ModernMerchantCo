import React from "react";
import { useEffect } from "react";
import { getToken } from "./API/script";
import { getCode } from "./API/script";

export default function Home() {
  useEffect(() => {
    getCode();
    getToken();
  });
  return <div>Home</div>;
}
