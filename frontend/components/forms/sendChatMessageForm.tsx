"use client";

import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import IconButton from "@/components/icons/IconButton";
import axios from "@/lib/axiosInstance";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { Chat } from "@/types/chatTypes";
import { Button } from "@/components/ui/button";
//import path from "path";
//import {promises as fs} from 'fs';
// import fs from "node:fs/promises";

import { revalidatePath } from "next/cache";

// import path from "path";
// import fs  from "fs";
// import { pipeline } from 'stream';
// import { promisify } from 'util';
// const pump = promisify(pipeline);

interface SendChatMessageForm {
  selectedChat: Chat;
  onMessageSent: () => void;
}

const SendChatMessageForm = ({
  selectedChat,
  onMessageSent,
}: SendChatMessageForm) => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();

  const receiverId = selectedChat.participantUserId;

  const sendMessage = async (data: any) => {
    try {
      const { content }: { content: string } = data;

      if (!receiverId) {
        console.error("Receiver ID is missing");
        return;
      }

      await axios.post("/api/messages", {
        content,
        userId: user.id,
        receiverId,
      });

      reset();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const hiddenFileInput = useRef(null);

  const handleChange = async (event: any) => {

 // const handleChange = event => {
  
    const { content }: { content: string } = event;

    if (!receiverId) {
      console.error("Receiver ID is missing");
      return;
    }

    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      console.log("file",i);
      //const file = event.target.files[0];

      const formData = new FormData();
      Object.values(event.target.files).forEach((file) => {
        formData.append("file", file);
      });

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        console.log("Upload ok : " + result.name);
      } else {
        console.log("Upload failed");
      }
      let datasend = {
        imageUrl:result.path,
        content:"media",
        userId: user.id,
        receiverId,
      }
      console.log("datasend",datasend);

      await axios.post("/api/messages",datasend);

      // await axios.post("/api/messages",
      //   formData,config
      //   );

      //reset();
    }

    
  };


  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  
  return (
    <>
      <form
        className="flex items-center gap-2"
        onSubmit={handleSubmit(sendMessage)}
      >
        <input type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                
                  accept="image/*"
                  style={{ display: 'none' }} />


<IconButton className="max-w-10 max-h-10" onClick={handleClick} size="xx-small" pos="absolute" zindex="10" left="5px" bottom="5px"
 aria-label="file upload " />


        <Input placeholder="Type a message" {...register("content")} />
        <Button type="submit">Send</Button>
      </form>
    </>
  );
};

export default SendChatMessageForm;
