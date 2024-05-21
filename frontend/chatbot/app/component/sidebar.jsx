"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import socket from "../utils/socket";

const SideBar = () => {
  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState("");
  const [username, setUserName] = useState("");
  useEffect(() => {
    // Access URL parameters only on the client side
    const params = new URLSearchParams(window.location.search);
    setRoom(params?.get("room") ?? "");
    setUserName(params?.get("username") ?? "");

    // Define the event handler
    const handleRoomUsers = ({ room, users }) => {
      setRoom(room);
      setUsers(users);
    };

    // Register the event listener
    socket.on("roomUsers", handleRoomUsers);

    // Clean up the effect by removing the event listener
    return () => {
      socket.off("roomUsers", handleRoomUsers);
    };
  }, []);

  return (
    <div
      className="bg-gray-400 flex flex-col justify-between items-center min-h-full"
      suppressHydrationWarning
    >
      <div className="flex flex-col gap-0 justify-start max-h-full">
        <div className="font-bold lg:text-3xl md:text-1xl sm:text-1xl text-white p-5 text-center">
          <Link href="/">ChatBot</Link>
        </div>
        <div className="p-2 mb-2 min-w-full">
          <span className="font-light text-center p-2 mb-1"> Username: </span>
          <span className="font-bold text-center">{username}</span>
          <div className="border-b-[1px]"></div>
        </div>
        <div className="p-2 mb-2">
          <span className="font-light text-center p-2 mb-1"> Room: </span>
          <span className="font-bold text-center">{room}</span>
          <div className="border-b-[1px]"></div>
        </div>
        <span className="ms-3">
          <FontAwesomeIcon icon={faUsers} /> Users:
          <div className="border-b-[1px]"></div>
        </span>

        {users.map((user) => (
          <span key={user.id} className="mb-2 mx-8">
            {user.username}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
