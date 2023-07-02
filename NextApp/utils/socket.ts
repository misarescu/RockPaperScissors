import { io } from "socket.io-client";

const URL = "localhost:8080";

export const socket = io(URL, {
  autoConnect: true,
});

socket.on("connect", () => {
  console.log(`Connected to socket with id: ${socket.id}`);
});
