import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected 🔌");

  socket.on("disconnect", () => {
    console.log("User disconnected 🔥");
  });
});

io.listen(8080);
