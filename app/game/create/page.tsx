"use client";
import Button from "@/components/Button";
import Form from "@/components/Form";
import StyledLink from "@/components/StyledLink";
import { v4 as uuid } from "uuid";
type Props = {};

function CreatePage({}: Props) {
  const gameRoomId = uuid();
  return (
    <>
      <Form
        onSubmit={(e) => {
          console.log("Hello from the form");
        }}
      >
        <Button className=" transition ease-in-out duration-150 hover:scale-110">
          Go to game room
        </Button>
      </Form>
    </>
  );
}

export default CreatePage;
