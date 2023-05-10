"use client";
// we need to outsource the initial page to be in a separate component
// so we can use client in order to pass button props down

import React from "react";
import Button from "./Button";

type Props = {};

function WelcomePage({}: Props) {
  return (
    <>
      <Button
        onClick={() => {
          console.log("Create Game button pressed");
        }}
      >
        Create Game
      </Button>
      <Button
        onClick={() => {
          console.log("Join Game button pressed");
        }}
      >
        Join Game
      </Button>
    </>
  );
}

export default WelcomePage;
