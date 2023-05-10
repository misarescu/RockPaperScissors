"use client";
// we need to outsource the initial page to be in a separate component
// so we can use client in order to pass button props down

import React from "react";
import Button from "./Button";
import StyledLink from "./StyledLink";

type Props = {};

function WelcomePage({}: Props) {
  return (
    <>
      <StyledLink href={"/game/create"}>Create Game</StyledLink>
      <StyledLink href={"/game/join"}>Join Game</StyledLink>
    </>
  );
}

export default WelcomePage;
