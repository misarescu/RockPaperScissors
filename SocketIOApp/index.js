import { Server } from "socket.io";

let ROOMS = []; // array of {id: str, name: str, playerCount: number, playerLimit: number, playerList: [str]}
let PLAYERS = []; // array of {playerName:str, socket_id: str}

const io = new Server({
  cors: {
    origin: "http://localhost",
    methods: ["GET", "POST"],
  },
});

function updateRoom(room) {
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

function removeRoom(room) {
  console.log(`room %o has been deleted`, room);
  ROOMS = ROOMS.filter((r) => r.id !== room.id);
}

function addPlayer(playerName, socket_id) {
  PLAYERS.push({ playerName, socket_id });
}

function findPlayerBySocketId(socket_id) {
  return PLAYERS.filter((player) => player.socket_id === socket_id).at(0);
}

function removePlayerBySocketId(socket_id) {
  PLAYERS = PLAYERS.filter((player) => player.socket_id !== socket_id);
}

function removePlayerFromRooms(playerName, socket) {
  socket.rooms.forEach((room_id) => {
    let room = getRoomByID(room_id);
    // need to check because the socket id is also present here
    if (isRoom(room)) {
      room.playerList = room.playerList.filter(
        (player) => player !== playerName
      );
      room.playerCount = room.playerList.length;
      if (room.playerCount > 0) {
        updateRoom(room);
        socket.to(room.id).emit("server-room-info", room);
      } else removeRoom(room);
    }
  });
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
        addPlayer(playerName, socket.id);
        console.log(newRoom);
        console.log(PLAYERS);
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
        updateRoom(room);
        addPlayer(playerName, socket.id);
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
    let player = findPlayerBySocketId(socket.id);
    if (player !== undefined) {
      console.log(`User ${player.playerName} disconnected 🔥`);
      removePlayerFromRooms(player.playerName, socket);
      removePlayerBySocketId(socket.id);
    }
  });
});

io.listen(8080);
