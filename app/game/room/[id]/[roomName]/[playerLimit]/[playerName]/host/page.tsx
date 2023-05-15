"use client";
import Button from "@/components/Button";
import { NavbarContext } from "@/context/NavbarContext";
import { useContext, useEffect } from "react";

type Props = {
  params: {
    id: string;
    roomName: string;
    playerLimit: number;
    playerName: string;
  };
};

function GameRoom({ params }: Props) {
  return (
    <>
      <Button>Copy room id</Button>
      <p>Waiting for others to join...</p>
    </>
  );
}

export default GameRoom;
