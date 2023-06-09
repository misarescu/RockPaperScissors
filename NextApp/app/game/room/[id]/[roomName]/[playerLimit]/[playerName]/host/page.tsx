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
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(roomId);

            alert(`copied room id: ${roomId}`);
          } catch (err) {
            alert(`error ${err}`);
          }
        }}
      >
        Copy room id
      </Button>
      <p>Waiting for others to join...</p>
    </>
  );
}

export default GameRoom;
