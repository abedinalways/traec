"use client";

import { useState } from "react";
import Image from "next/image";
import {
  SlidersHorizontal,
  Plus,
  Image as ImageIcon,
  Smile,
  Mic,
} from "lucide-react";

export default function MessagePage() {
  const [selectedChat, setSelectedChat] = useState(0);

  const chats = [
    {
      name: "Wade Warren",
      time: "9:45 AM",
      msg: "Thanks, For the suggestions.",
      avatar: "/images/Avaterone.png",
    },
    {
      name: "Wade Warren",
      time: "9:45 AM",
      msg: "Thanks, For the suggestions.",
      avatar: "/images/Avaterone.png",
    },
    {
      name: "Eleanor Pena",
      time: "11:45 AM",
      msg: "Thanks, For the suggestions.",
      avatar: "/images/Avatertwo.png",
    },
    {
      name: "Eleanor Pena",
      time: "11:45 AM",
      msg: "Thanks, For the suggestions.",
      avatar: "/images/Avatertwo.png",
    },
    {
      name: "Arlene McCoy",
      time: "Yesterday",
      msg: "Thanks, For the suggestions.",
      avatar: "/images/Avaterthree.png",
    },
    {
      name: "Arlene McCoy",
      time: "Yesterday",
      msg: "Thanks, For the suggestions.",
      avatar: "/images/Avaterthree.png",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-full w-full bg-white p-2 lg:p-4 rounded-xl gap-4">

      {/* LEFT SIDEBAR */}
      <div
        className="
          w-full lg:w-80 
          bg-white border lg:border-r 
          p-4 flex flex-col rounded-xl shadow-sm
          h-auto lg:h-[669px]
        "
      >
        <h2 className="text-lg font-semibold mb-4">Active Orders (2)</h2>

        {/* Search + Filter Icon */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full p-2 pl-4 pr-10 border rounded-full"
          />

          <SlidersHorizontal
            size={22}
            className="cursor-pointer text-gray-700"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 lg:gap-3 text-sm mb-3 flex-wrap">
          <span className="cursor-pointer px-4 py-1 rounded-full bg-red-500 text-white font-medium shadow-sm">
            All
          </span>

          <span className="cursor-pointer px-4 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100">
            Unread
          </span>

          <span className="cursor-pointer px-4 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100">
            Starred
          </span>

          <span className="cursor-pointer px-4 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100">
            Spam (1)
          </span>
        </div>

        {/* Chat List */}
        <div className="overflow-y-auto flex-1 min-h-0">
          {chats.map((chat, index) => (
            <div
              key={index}
              onClick={() => setSelectedChat(index)}
              className={`flex items-center p-3 rounded-lg cursor-pointer mb-2 
                ${
                  selectedChat === index
                    ? "bg-blue-50 border border-blue-200"
                    : "hover:bg-gray-100"
                }`}
            >
              <Image
                src={chat.avatar}
                width={44}
                height={44}
                alt="avatar"
                className="rounded-full"
              />

              <div className="ml-3">
                <p className="font-medium text-sm lg:text-base">{chat.name}</p>
                <p className="text-xs text-gray-500">{chat.msg}</p>
              </div>

              <span className="ml-auto text-xs text-gray-500">
                {chat.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT CHAT AREA */}
      <div
        className="
          flex-1 flex flex-col bg-white rounded-xl shadow-sm
          w-full h-auto lg:h-[681px]
        "
      >
        {/* Chat header */}
        <div className="p-4 bg-[#ECEFF3] border-b flex items-center gap-3 rounded-t-xl">
          <Image
            src="/images/Avaterfour.png"
            width={42}
            height={42}
            alt="avatar"
            className="rounded-full"
          />
          <p className="text-lg font-semibold">Cameron...</p>
        </div>

        {/* Chat messages */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto bg-white rounded-b-xl min-h-0">

          <div className="mb-5">
            <p className="text-xs text-gray-500 mb-1">08:00 am</p>
            <div className="inline-block bg-gray-200 p-3 rounded-xl text-sm">
              Hello, Doe <br /> why does my back hurt so much?
            </div>
          </div>

          <div className="flex flex-col mb-5 items-end">
            <p className="text-xs text-gray-500 mb-1">08:01 am</p>
            <div className="inline-block bg-red-400 text-white p-3 rounded-xl text-sm">
              Too long. Try drinking lots of water
            </div>
          </div>

          <div className="mb-5">
            <p className="text-xs text-gray-500 mb-1">08:50 am</p>
            <div className="inline-block bg-gray-200 p-3 rounded-xl text-sm">
              Oh like that. <br /> ok doc. I will drink lots of water and
              exercise. <br /> Thanks a lot doc 
            </div>
          </div>

          <div className="flex flex-col items-end">
            <p className="text-xs text-gray-500 mb-1">08:52 am</p>
            <div className="inline-block bg-red-400 text-white p-3 rounded-xl text-sm">
              Don’t mention it biby 🔥
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-3 lg:p-4 flex items-center gap-3 lg:gap-4 bg-white border-t rounded-b-xl">

          {/* Plus Icon */}
          <div className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-500 cursor-pointer">
            <Plus size={18} />
          </div>

          {/* Image Upload Icon */}
          <div className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-500 cursor-pointer">
            <ImageIcon size={20} />
          </div>

          {/* Input Box */}
          <div className="flex-1 bg-[#F4F6F8] border rounded-full px-4 py-2 flex items-center gap-3">
            <input
              type="text"
              placeholder="Type message..."
              className="flex-1 bg-transparent outline-none text-sm"
            />

            {/* Emoji */}
            <Smile size={20} className="cursor-pointer text-gray-500" />
          </div>

          {/* Mic Icon */}
          <div className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
            <Mic size={20} className="text-gray-700" />
          </div>
        </div>
      </div>

    </div>
  );
}
