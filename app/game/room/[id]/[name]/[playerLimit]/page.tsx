type Props = {
  params: {
    id: string;
    name: string;
    playerLimit: number;
  };
};

function GameRoom({ params }: Props) {
  params.name = decodeURI(params.name); // need to decode in case the room name contains encoded characters
  return (
    <>
      <div>GameRoom no: {params.id}</div>
      <div>Room Name: {params.name}</div>
      <div>Player Limit: {params.playerLimit}</div>
    </>
  );
}

export default GameRoom;
