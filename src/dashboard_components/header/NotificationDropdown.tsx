"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Bell } from "lucide-react";
import { useAppSelector } from "@/app/store";
import {
  useGetUnreadCountQuery,
  useGetChatUnreadCountQuery,
} from "@/app/api/notification/notificationApi";
import { useGetConversationsQuery } from "@/app/api/messages/chatApi";
import { useAppDispatch } from "@/app/store";
import { setActiveReceiverId } from "@/features/chat/chatSlice";
import { useMarkNotificationReadMutation } from "@/app/api/notification/notificationApi";
import { getConversationName, getConversationAvatar } from "@/lib/chatHelpers";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const { data: unreadData } = useGetUnreadCountQuery();
  const { data: chatUnreadData } = useGetChatUnreadCountQuery();
  const { data: conversations = [] } = useGetConversationsQuery();
  const currentUserId = useAppSelector((state) => state.auth.user?.id);

  const totalUnread = unreadData?.total_unread_count ?? 0;

  const chatUnreadMap = useMemo(() => {
    const map = new Map<string, number>();
    if (chatUnreadData?.data) {
      for (const item of chatUnreadData.data) {
        map.set(String(item.sender_id), item.unread_count);
      }
    }
    return map;
  }, [chatUnreadData]);

  const [markNotificationRead] = useMarkNotificationReadMutation();

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleClick = () => {
    toggleDropdown();
  };

  const handleConversationClick = async (otherUserId: string | number) => {
    const userId = String(otherUserId);
    dispatch(setActiveReceiverId(userId));
    if (currentUserId && userId) {
      try {
        const result = await markNotificationRead({ sender_id: Number(userId) }).unwrap();
        console.log('Mark read result:', result);
      } catch (error: any) {
        console.error("Failed to mark notifications as read:", error);
      }
    }
    closeDropdown();
    window.location.href = `/messages/${userId}`;
  };

  const notificationItems = conversations.map((conv) => {
    const senderId = conv.sender_id ? String(conv.sender_id) : null;
    const receiverId = conv.receiver_id ? String(conv.receiver_id) : null;
    const myId = currentUserId ? String(currentUserId) : null;

    let otherId = "";
    if (senderId && myId && senderId !== myId) otherId = senderId;
    else if (receiverId && myId && receiverId !== myId) otherId = receiverId;

    if (!otherId) return null;

    const unreadCount = chatUnreadMap.get(otherId) ?? Number(conv.unread_count ?? 0);
    const displayName = getConversationName(conv, currentUserId);
    const displayAvatar = getConversationAvatar(conv, currentUserId);
    const lastMsg = conv.message || (typeof conv.last_message === 'object' ? conv.last_message?.message : conv.last_message) || "";

    return {
      id: otherId,
      name: displayName,
      avatar: displayAvatar,
      message: lastMsg,
      unread_count: unreadCount,
      time: conv.updated_at || conv.created_at || new Date().toISOString(),
    };
  }).filter(Boolean);

  return (
    <div className="relative">
      <button
        className="relative dropdown-toggle flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-700 h-11 w-11 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        onClick={handleClick}
      >
        {totalUnread > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#25D366] text-[10px] font-bold text-white">
            {totalUnread > 99 ? "99+" : totalUnread}
          </span>
        )}
        <Bell className="w-5 h-5" />
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute -right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:w-[361px] lg:right-0"
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700">
          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Notifications
          </h5>
          {totalUnread > 0 && (
            <span className="px-2 py-0.5 text-xs font-semibold bg-[#25D366] text-white rounded-full">
              {totalUnread} unread
            </span>
          )}
        </div>
        <ul className="flex flex-col h-auto overflow-y-auto custom-scrollbar">
          {notificationItems.length === 0 ? (
            <li className="py-8 text-center">
              <p className="text-sm font-medium text-gray-400">No notifications yet</p>
            </li>
          ) : (
            notificationItems.map((item) => (
              <li key={`notif-${item!.id}`}>
                <DropdownItem
                  onItemClick={() => handleConversationClick(item!.id)}
                  className="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5 cursor-pointer"
                >
                  <span className="relative block w-full h-10 rounded-full z-1 max-w-10">
                    {item!.avatar.includes("provider-profile-img.svg") ||
                    item!.avatar.includes("placeholder-image.png") ? (
                      <div className="w-[44px] h-[44px] rounded-full bg-gray-100 flex items-center justify-center ring-2 ring-white shadow-sm">
                        <Bell className="text-gray-400" size={20} />
                      </div>
                    ) : (
                      <Image
                        width={40}
                        height={40}
                        src={item!.avatar}
                        alt={item!.name}
                        className="w-full overflow-hidden rounded-full"
                      />
                    )}
                    {item!.unread_count > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#25D366] text-[10px] font-bold text-white">
                        {item!.unread_count}
                      </span>
                    )}
                  </span>

                  <span className="block flex-1">
                    <span className="mb-1.5 block text-theme-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium text-gray-800 dark:text-white/90">
                        {item!.name}
                      </span>
                      {item!.message && (
                        <span className="block truncate text-xs text-gray-500 mt-1">
                          {item!.message}
                        </span>
                      )}
                    </span>

                    <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                      <span>{new Date(item!.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </span>
                  </span>
                </DropdownItem>
              </li>
            ))
          )}
        </ul>
        <Link
          href="/messages"
          onClick={closeDropdown}
          className="block px-4 py-2 mt-3 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          View All Messages
        </Link>
      </Dropdown>
    </div>
  );
}