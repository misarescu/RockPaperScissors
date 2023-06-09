"use client";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import { NavbarContext } from "@/context/NavbarContext";
import { socket } from "@/utils/socket";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useRef } from "react";
import { z } from "zod";

const URLSchema = z.string().uuid({ message: "Invalid room id" });

type Props = {};

function JoinPage({}: Props) {
  const navbarContext = useContext(NavbarContext);
  const urlRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  useEffect(() => {
    navbarContext.dispatch({
      type: "UPDATE",
      payload: { navTitle: "Join Game" },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Form
      onSubmit={(e) => {
        try {
          const urlValue = urlRef.current?.value as string;
          const nameValue = nameRef.current?.value as string;
          URLSchema.parse(urlValue);
          socket.emit(
            "join-room",
            { id: urlValue, playerName: nameValue },
            (response: any) => {
              if (response.status === "ok") {
                router.push(
                  `/game/room/${response.room.id}/${response.room.name}/${response.room.playerLimit}/${response.room.playerName}/host`
                );
              }
              if (response.status === "nok") {
                alert("name already taken in the room");
              }
            }
          );
          console.log("URL is: ", urlValue);
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
          placeholder="Enter your name"
          type="text"
          ref={nameRef}
        />
        <Input name="url" placeholder="Room ID" type="text" ref={urlRef} />
        <Button className=" transition ease-in-out duration-150 hover:scale-110">
          Join Game
        </Button>
      </span>
    </Form>
  );
}

export default JoinPage;
