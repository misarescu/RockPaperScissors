"use client";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { v4 as uuid } from "uuid";
type Props = {};

function CreatePage({}: Props) {
  const gameRoomId = uuid();
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const limitRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Form
        onSubmit={(e) => {
          console.log("Hello from the form");
          router.push(
            `/game/room/${gameRoomId}/${nameRef.current?.value}/${limitRef.current?.value}`
          );
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
