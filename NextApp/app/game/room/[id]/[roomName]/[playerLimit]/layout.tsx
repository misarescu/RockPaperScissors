"use client";
import { NavbarContext } from "@/context/NavbarContext";
import { useContext, useEffect, useState } from "react";
import { socket } from "@/utils/socket";
import { RoomContext } from "@/context/RoomContext";
import { GameRoomType } from "@/types/GameRoom";

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
  const roomContext = useContext(RoomContext);
  // const roomTitle = `${roomName} | player count: ${connectedPlayers}/${params.playerLimit}`; // need to decode in case the room name contains encoded characters

  socket.on("connect", () => {
    console.log("Connected to socket");
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });

  useEffect(() => {
    socket.on("server-room-info", (room: GameRoomType) => {
      roomContext.dispatch({ type: "UPDATE", payload: room as GameRoomType });
      const roomTitle = `${room.name} | player count: ${room.playerList.length}/${room.playerLimit}`;
      navbarContext.dispatch({
        type: "UPDATE",
        payload: { navTitle: roomTitle },
      });
    });
  }, [roomContext, navbarContext]);

  useEffect(() => {
    socket.emit(
      "room-info",
      { id: params.id },
      (response: { status: string; room?: GameRoomType }) => {
        if (response.status === "ok") {
          roomContext.dispatch({
            type: "UPDATE",
            payload: response.room as GameRoomType,
          });
          const roomTitle = `${response.room?.name} | player count: ${response.room?.playerList.length}/${response.room?.playerLimit}`;
          navbarContext.dispatch({
            type: "UPDATE",
            payload: { navTitle: roomTitle },
          });
        }
      }
    );
    return () => {
      socket.disconnect(); // if you leave the game room then disconnect
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full py-12 flex flex-col justify-start items-center">
      {children}
      <ul>
        {roomContext.state.playerList.map((player) => (
          <li key={player}>{player}</li>
        ))}
      </ul>
    </div>
  );
}

export default GameRoomLayout;
