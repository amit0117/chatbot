"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
function JoinPage() {
  const router = useRouter();
  const [username, setUserName] = useState("");
  const [room, setRoom] = useState("JAVASCRIPT");
  const options = [
    "HTML",
    "CSS",
    "JAVASCRIPT",
    "NODE.JS",
    "EXPRESS.JS",
    "REACT.JS",
    "NEXT.JS",
  ];
  const JoinChatHandler = () => {
    router.push(`/chatPage?username=${username}&room=${room}`);
    setUserName("");
    setRoom("");
  };
  return (
    <div className="container mx-auto flex flex-col justify-center items-start gap-2 border-[1px] mt-10 w-[40%] rounded-xl p-4 bg-slate-300">
      <h1 className="text-center font-bold text-medium my-4 mx-auto">
        ChatRoom
      </h1>
      <label htmlFor="userName" className="ms-">
        UserName:{" "}
      </label>
      <input
        type="text"
        name="userName"
        id="userName"
        className="text-start text-black p-2"
        placeholder="enter your username"
        required
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <label htmlFor="room">Active Rooms:</label>
      <select
        name="room"
        id="room"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        className="text-black p-2"
      >
        {options.map((currentOption, index) => (
          <option
            value={currentOption}
            className="p-[0.8px] text-black"
            key={index}
          >
            {currentOption}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="px-4 py-2 border-2px bg-slate-400 hover:bg-slate-600 ms-0 my-3 rounded-lg"
        onClick={JoinChatHandler}
      >
        Join Chat
      </button>
    </div>
  );
}

export default JoinPage;
