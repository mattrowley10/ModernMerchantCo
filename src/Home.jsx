import React from "react";
import { useEffect } from "react";
import { getToken } from "./API/script";

export default function Home() {
  useEffect(() => {
    getToken();
  });
  return <div>Home</div>;
}
