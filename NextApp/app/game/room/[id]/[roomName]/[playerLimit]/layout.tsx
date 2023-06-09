"use client";
import { NavbarContext } from "@/context/NavbarContext";
import { useContext, useEffect, useState } from "react";
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
  const [connectedPlayers, setConnectedPlayers] = useState(0);
  const [playerList, setPlayerList] = useState<string[]>([]);
  const roomName = decodeURI(params.roomName);
  const roomTitle = `${roomName} | player count: ${connectedPlayers}/${params.playerLimit}`; // need to decode in case the room name contains encoded characters
  socket.on("connect", () => {
    console.log("Connected to socket");
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
  socket.on("server-room-info", (room) => {
    setConnectedPlayers(room.playerCount);
  });
  useEffect(() => {
    navbarContext.dispatch({
      type: "UPDATE",
      payload: { navTitle: roomTitle },
    });
    socket.emit("room-info", { id: params.id }, (response: any) => {
      if (response.status === "ok") {
        setConnectedPlayers(response.room.playerCount);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedPlayers]);
  return (
    <div className="h-full py-12 flex flex-col justify-start items-center">
      {children}
    </div>
  );
}

export default GameRoomLayout;
