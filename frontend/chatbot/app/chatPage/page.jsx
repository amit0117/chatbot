"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import socket from "../utils/socket";
function ChatPage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("userName");
  const room = searchParams.get("room");
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", { username, room });
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("in useeffect", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, [socket]);

  const SendMessageChangeHandler = () => {
    if (currentMessage === "") return;
    socket.emit("chatMessage", currentMessage);
    setCurrentMessage("");
  };
  console.log("messages in chatpage homepage", messages);
  return (
    <div className="w-full flex flex-col h-screen justify-between">
      <div className="flex flex-col gap-2 overflow-y-auto">
        <div className="flex flex-row justify-center items-center mb-4 border-[1px] rounded-md min-w-full py-2">
          <h1 className="font-bold text-lg">All Messages</h1>
        </div>

        {messages.map((currentMessage, index) => {
          console.log("currentMessage:", currentMessage);
          return (
            <div
              className="p-2 mb-2 flex flex-col justify-start items-start gap-1"
              key={index}
            >
              <div className="flex flex-row gap-2 justify-start items-center">
                <span className="font-bold text-[15px]">
                  {currentMessage.username}
                </span>
                <span className="font-bold text-sm">{currentMessage.time}</span>
              </div>
              <p className="font-light text-sm">{currentMessage.text}</p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-row justify-between items-center p-4 border-t-[2px] min-w-full">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          className="w-[90%] p-2 border-[1px] rounded-xl"
          placeholder="Enter your chat messages here..."
        />
        <button
          type="button"
          className="px-4 py-2 border-[1px] rounded-xl w-[10%] ml-2 bg-slate-400 hover:bg-slate-600"
          onClick={SendMessageChangeHandler}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
