"use client";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import { GameRoomSchema, GameRoomType } from "@/types/GameRoom";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { v4 as uuid } from "uuid";
import { z } from "zod";

function CreatePage() {
  // const gameRoomId = uuid();
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const limitRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Form
        onSubmit={(e) => {
          try {
            const roomData: GameRoomType = {
              id: uuid(),
              name: nameRef.current?.value as string,
              playerLimit: parseInt(limitRef.current?.value as string),
            };

            GameRoomSchema.parse(roomData);

            router.push(
              `/game/room/${roomData.id}/${roomData.name}/${roomData.playerLimit}`
            );
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
            name="name"
            placeholder="Room name"
            type="text"
            ref={nameRef}
          />
          <Input
            name="player-limit"
            placeholder="Player limit"
            type="number"
            min={2}
            max={12}
            ref={limitRef}
          />
          <Button className=" transition ease-in-out duration-150 hover:scale-110">
            Go to game room
          </Button>
        </span>
      </Form>
    </>
  );
}

export default CreatePage;
