"use client";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import React, { useRef } from "react";
import { z } from "zod";

const URLSchema = z.string().url({ message: "Invalid game url" });

type Props = {};

function JoinPage({}: Props) {
  const urlRef = useRef<HTMLInputElement>(null);
  return (
    <Form
      onSubmit={(e) => {
        try {
          const urlValue = urlRef.current?.value as string;
          URLSchema.parse(urlValue);
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
        <Input name="url" placeholder="Game URL" type="url" ref={urlRef} />
        <Button className=" transition ease-in-out duration-150 hover:scale-110">
          Join Game
        </Button>
      </span>
    </Form>
  );
}

export default JoinPage;
