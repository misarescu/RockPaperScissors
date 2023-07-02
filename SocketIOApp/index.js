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
  console.log(`User Connected 🔌 with id: ${socket.id}`);

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
    // room id is good
    if (isRoom(room)) {
      console.log("This room exists as");
      // player name is taken
      if (room.playerList.includes(playerName)) {
        callback({
          status: "nok",
          message: `Player ${playerName} is already present in room ${room.name}`,
        });
        console.log(mesasge);
        // player name is unique
      } else {
        socket.join(id);
        room.playerCount++;
        room.playerList.push(playerName);
        updateRoomByID(room);
        callback({ status: "ok", room });
        console.log(room);
      }
      // room id is not good
    } else {
      callback({ status: "nok", message: "Room id is wrong" });
      console.log(mesasge);
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

  socket.on("disconnecting", () => {
    console.log(`User ${socket.id} disconnected 🔥`);
  });
});

io.listen(8080);
