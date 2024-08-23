import { useAuth } from "@/hooks/useAuth";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import MembersSearch from "@/components/membersSearch";
import { Chat } from "@/types/chatTypes";
import MembersCard from "./members/card";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import useData from "@/hooks/useData";

interface ChatListProps {
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
}

//getUser();

const ChatList = ({ chats, onSelectChat }: ChatListProps) => {
  //const [admin,setAdmin] = useState({});

  const { user } = useAuth();
  let keyword = "admin";
  const { data: users, loading } = useData(
    `/api/users?keyword=${keyword}`
  );
  console.log("loading",loading);

  console.log("admin",users.data);
  let userid = users.data[0]?.id;
  // useEffect(() => {    //let admin;
  //     const controller = new AbortController();
  //     let keywork = "nhatnhat";
  //     axiosInstance
  //         .get(`/api/user?keyword=${keywork}`, {
  //           signal: controller.signal,
  //         })
  //         .then(function (response) {
           
  //             if (response.data) {
  //               //admin = response.data;
  //               setAdmin(response.data);
  //              console.log("response",response);
              
  //           }
  //         })
  //         .catch((err) => {
  //           // if (!ignore) {
  //           //   setError(err.message || "An unknown error occurred");
  //           // }
  //         })
  //         .finally(() => {
  //           // if (!ignore) {
  //           //   setTimeout(() => {
  //           //     setLoading(false);
  //           //   }, 2000);
  //           // }
  //         });
    
  //   },[url]);

    
  return (
    <nav className="grid gap-4 p-4">
      <MembersSearch />
      {user?.username!="admin" &&(<MembersCard key={userid} user={users?.data[0]} />)}
      <div className="flex items-center gap-2 bg-gray-200 rounded-md p-2">
        <Avatar>
          <AvatarImage alt="@shadcn" />
          <AvatarFallback>CNN</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <div className="font-semibold">{user?.username}</div>
          <div className="line-clamp-1 text-xs">{user?.email}</div>
        </div>
      </div>
    
      {chats.map((chat: Chat) => {
        return (
          (chat?.participantUsername=="admin"|| user?.username=="admin") &&(<div
            key={chat.chatId}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onSelectChat(chat)}
          >
            <Avatar>
              <AvatarImage alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-semibold">{chat.participantUsername}</div>
              <div className="line-clamp-1 text-xs">
                {chat.lastMessage ?? "No messages"}
              </div>
            </div>
          </div>
          )
        );
      })}
    </nav>
  );
};

export default ChatList;
