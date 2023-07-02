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
      <div className="flex flex-row">
        <Button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(roomId);
            } catch (err) {
              alert(`error ${err}`);
            }
          }}
        >
          Copy room id
        </Button>
        <Button
          onClick={() => {
            alert("Start the game placeholder");
          }}
        >
          Start Game
        </Button>
      </div>
      <p>Waiting for others to join...</p>
    </>
  );
}

export default GameRoom;
