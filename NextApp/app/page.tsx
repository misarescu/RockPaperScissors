"use client";
import { Inter } from "next/font/google";
import StyledLink from "@/components/StyledLink";
import { useContext, useEffect } from "react";
import { NavbarContext } from "@/context/NavbarContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const navbarContext = useContext(NavbarContext);
  useEffect(() => {
    navbarContext.dispatch({ type: "RESET" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <StyledLink href={"/game/create"}>Create Game</StyledLink>
      <StyledLink href={"/game/join"}>Join Game</StyledLink>
    </>
  );
}
