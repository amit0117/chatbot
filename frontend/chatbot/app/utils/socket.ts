import { io, Socket } from "socket.io-client";

// const socket: Socket = io("http://localhost:3001");
const socket: Socket = io(
  "https://backend-3x5rdhdo7-amits-projects-4fec813e.vercel.app/"
);

export default socket;
