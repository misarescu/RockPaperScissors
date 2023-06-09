import { Server } from "socket.io";

let ROOMS = [];

const io = new Server({
  cors: {
    origin: "http://localhost",
    methods: ["GET", "POST"],
  },
});

function updateRoomByID(room) {
  const roomIdx = ROOMS.findIndex((r) => r.id === room.id);

  const newRooms = new Array(ROOMS);
  newRooms[roomIdx] = room;
  ROOMS = [...newRooms];
}

function getRoomByID(id) {
  return ROOMS.filter((room) => room.id === id).at(0);
}

function isRoom(room) {
  return room != undefined;
}

io.on("connection", (socket) => {
  console.log("User Connected 🔌");

  socket.on(
    "create-room",
    ({ id, name, playerLimit, playerName }, callback) => {
      let room = getRoomByID(id);
      console.log(room);
      if (!isRoom(room)) {
        const newRoom = {
          id,
          name,
          playerCount: 1,
          playerLimit,
          playerList: [playerName],
        };
        callback({ status: "ok", room: newRoom });
        ROOMS.push(newRoom);
        socket.join(id);
        console.log(newRoom);
      } else {
        callback({ status: "nok" });
        console.log("Room already created");
      }
    }
  );

  socket.on("join-room", ({ id, playerName }, callback) => {
    console.log(id);
    let room = getRoomByID(id);
    if (isRoom(room)) {
      console.log("This room exists as");
      if (room.playerList.includes(playerName)) {
        callback({ status: "nok" });
        console.log(
          `Player ${playerName} is already present in room ${room.name}`
        );
      } else {
        socket.join(id);
        room.playerCount++;
        room.playerList.push(playerName);
        updateRoomByID(room);
        callback({ status: "ok", room });
        console.log(room);
      }
    }
  });

  socket.on("room-info", ({ id }, callback) => {
    let room = getRoomByID(id);
    if (isRoom(room)) {
      callback({ status: "ok", room });
      socket.to(id).emit("server-room-info", room);
    } else {
      callback({ status: "nok" });
    }
  });

  socket.on("disconnect", ({ id, playerName }, callback) => {
    console.log(`User ${playerName} disconnected 🔥`);
  });
});

io.listen(8080);
