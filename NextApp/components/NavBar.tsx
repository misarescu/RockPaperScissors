"use client";
import { NavbarContext } from "@/context/NavbarContext";
import { PlayerContext } from "@/context/PlayerContext";
import React, { useContext } from "react";

type Props = {};

function NavBar({}: Props) {
  const navbarContext = useContext(NavbarContext);
  const playerContext = useContext(PlayerContext);
  return (
    <nav
      className={`flex flex-row ${
        playerContext.state.name === "" ? "justify-center" : "justify-between"
      } items-center w-full py-2 px-6 mb-2 bg-secondary drop-shadow-accent-bold dark:drop-shadow-accent-light`}
    >
      <p className="drop-shadow-accent-light hover:drop-shadow-accent-bold text-accent">
        {playerContext.state.name}
      </p>
      <p className="drop-shadow-accent-light hover:drop-shadow-accent-bold text-accent">
        {navbarContext.state.navTitle}
      </p>
    </nav>
  );
}

export default NavBar;
