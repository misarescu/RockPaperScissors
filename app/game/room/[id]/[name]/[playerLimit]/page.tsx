"use client";
import { NavbarContext } from "@/context/NavbarContext";
import { useContext, useEffect } from "react";

type Props = {
  params: {
    id: string;
    name: string;
    playerLimit: number;
  };
};

function GameRoom({ params }: Props) {
  const navbarContext = useContext(NavbarContext);
  let connectedPlayers = 1;
  const roomTitle = `${decodeURI(
    params.name
  )} | player count: ${connectedPlayers}/${params.playerLimit}`; // need to decode in case the room name contains encoded characters
  useEffect(() => {
    navbarContext.dispatch({
      type: "UPDATE",
      payload: { navTitle: roomTitle },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="h-full py-12">
      <p>Waiting for others to join...</p>
    </div>
  );
}

export default GameRoom;
