import { io } from "socket.io-client";

const URL = "localhost:8080";

export const socket = io(URL, {
  autoConnect: false,
});
