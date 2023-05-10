import React from "react";

type Props = {
  params: {
    id: string;
  };
};

function GameRoom({ params }: Props) {
  return <div>GameRoom no: {params.id}</div>;
}

export default GameRoom;
