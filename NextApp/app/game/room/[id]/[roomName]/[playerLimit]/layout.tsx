"use client";
import { NavbarContext } from "@/context/NavbarContext";
import { useContext, useEffect } from "react";
import { socket } from "@/utils/socket";

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
  const roomName = decodeURI(params.roomName);
  const roomTitle = `${roomName} | player count: ${connectedPlayers}/${params.playerLimit}`; // need to decode in case the room name contains encoded characters
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket");
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
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
