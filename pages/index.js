import { useApp } from "../components";
import { useState, useLayoutEffect } from "react";

const Home = () => {
  const { toggle, appearance } = useApp();
  return (
    <>
      <h1
        style={{
          color: `${appearance === "light" ? "blue" : "red"}`,
        }}
      >
        Welcome to Next JS
      </h1>
      <button onClick={toggle}>Toggle Theme</button>
    </>
  );
};

export default Home;
