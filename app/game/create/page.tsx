"use client";
import StyledLink from "@/components/StyledLink";
import { v4 as uuid } from "uuid";
type Props = {};

function CreatePage({}: Props) {
  const gameRoomId = uuid();
  return (
    <StyledLink href={`/game/room/${gameRoomId}`}>Go to game room</StyledLink>
  );
}

export default CreatePage;
