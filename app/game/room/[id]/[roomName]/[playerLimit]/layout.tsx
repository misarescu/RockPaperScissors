"use client";
import Button from "@/components/Button";
import { NavbarContext } from "@/context/NavbarContext";
import { useContext, useEffect } from "react";

type Props = {
  params: {
    id: string;
    roomName: string;
    playerLimit: number;
  };
  children: React.ReactNode;
};

function GameRoomLayout({ params, children }: Props) {
  const navbarContext = useContext(NavbarContext);
  let connectedPlayers = 1;
  const roomTitle = `${decodeURI(
    params.roomName
  )} | player count: ${connectedPlayers}/${params.playerLimit}`; // need to decode in case the room name contains encoded characters
  useEffect(() => {
    navbarContext.dispatch({
      type: "UPDATE",
      payload: { navTitle: roomTitle },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="h-full py-12 flex flex-col justify-start items-center">
      {children}
    </div>
  );
}

export default GameRoomLayout;
