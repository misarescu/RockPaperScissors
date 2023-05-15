"use client";
import { NavbarContext } from "@/context/NavbarContext";
import React, { useContext } from "react";

type Props = {};

function NavBar({}: Props) {
  const navbarContext = useContext(NavbarContext);
  return (
    <nav className="flex flex-row justify-center items-center w-full pt-2 pb-2 mb-2 bg-secondary drop-shadow-accent-bold dark:drop-shadow-accent-light">
      <p className="drop-shadow-accent-light hover:drop-shadow-accent-bold text-accent">
        {navbarContext.state.navTitle}
      </p>
    </nav>
  );
}

export default NavBar;
