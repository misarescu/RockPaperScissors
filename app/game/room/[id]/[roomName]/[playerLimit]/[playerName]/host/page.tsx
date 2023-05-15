"use client";
import Button from "@/components/Button";

type Props = {
  params: {
    id: string;
    roomName: string;
    playerLimit: number;
    playerName: string;
  };
};

function GameRoom({ params }: Props) {
  const roomId = decodeURI(params.id);
  return (
    <>
      <Button
        onClick={() => {
          navigator.clipboard.writeText(roomId);
          // alert(`copied ${roomId}`);
        }}
      >
        Copy room id
      </Button>
      <p>Waiting for others to join...</p>
    </>
  );
}

export default GameRoom;
