"use client";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import { NavbarContext } from "@/context/NavbarContext";
import { PlayerContext } from "@/context/PlayerContext";
import { GameRoomSchema, GameRoomType } from "@/types/GameRoom";
import { socket } from "@/utils/socket";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import { z } from "zod";

function CreatePage() {
  const router = useRouter();
  const roomNameRef = useRef<HTMLInputElement>(null);
  const playerNameRef = useRef<HTMLInputElement>(null);
  const limitRef = useRef<HTMLInputElement>(null);
  const navbarContext = useContext(NavbarContext);
  const playerContext = useContext(PlayerContext);

  useEffect(() => {
    navbarContext.dispatch({
      type: "UPDATE",
      payload: { navTitle: "Create Room" },
    });
    playerContext.dispatch({
      type: "UPDATE",
      payload: {
        id: "",
        name: "",
        score: 0,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form
      onSubmit={(e) => {
        try {
          const roomData: GameRoomType = {
            id: uuid(),
            name: roomNameRef.current?.value as string,
            playerLimit: parseInt(limitRef.current?.value as string),
            playerName: playerNameRef.current?.value as string,
            playerList: [],
          };

          GameRoomSchema.parse(roomData);

          socket.emit("create-room", { ...roomData }, (response: any) => {
            if (response.status === "ok") {
              playerContext.dispatch({
                type: "UPDATE",
                payload: { id: socket.id, name: roomData.playerName, score: 0 },
              });
              router.push(
                `/game/room/${roomData.id}/${roomData.name}/${roomData.playerLimit}/${roomData.playerName}/host`
              );
            } else {
              alert("The room ids are the same, try again");
            }
          });
        } catch (err) {
          if (err instanceof z.ZodError) {
            const errorMessage = err.issues
              .map((issue) => `${issue.path}: ${issue.message}`)
              .join("\n");
            alert(errorMessage);
          }
        }
      }}
    >
      <span className=" w-11/12 flex flex-col items-center space-y-12">
        <Input
          name="room-name"
          placeholder="Room name"
          type="text"
          ref={roomNameRef}
        />
        <Input
          name="player-limit"
          placeholder="Player limit"
          type="number"
          min={2}
          max={12}
          ref={limitRef}
        />
        <Input
          name="player-name"
          placeholder="Your name"
          type="text"
          ref={playerNameRef}
        />
        <Button>Go to game room</Button>
      </span>
    </Form>
  );
}

export default CreatePage;
