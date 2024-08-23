import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { ChatMessage, Chat } from "@/types/chatTypes";
import { BACKEND_URL, BASE_URL } from "@/lib/config";
import ModalComponent from "./ModalComponent";

const ChatWindow = ({ chat }: { chat: Chat | null }) => {
  const { user } = useAuth();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };
  

  const handleOnClicked = (src: string, index: number) => {
    console.log("src",src);
    setSelectedImage(src);
    setSelectedIndex(index);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  function handleCloseModal(): void {
    setSelectedImage("");
    setSelectedIndex(0);
  }

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="flex flex-col gap-4">
        {chat?.messages?.map((message: ChatMessage) => (
          <div
            key={message.id}
            className={`flex items-start gap-2 ${
              message.userId === user.id ? "text-right self-end" : ""
            }`}
          >
            <Avatar>
              <AvatarImage alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-semibold">{message.senderUsername}</div>
              <div className="line-clamp-1 text-xs">{message.createdAt}</div>
            
              {message?.content==="media" ? (
                  <div className="relative flex">
                    <img key={message.id} onClick={() => handleOnClicked((BASE_URL + message?.imageUrl) as string, message.id)} width="300px" height="150px" src={BASE_URL + message?.imageUrl} />
                
                  </div>
                ):(
                  <>

                  </>
                )}
              {selectedImage && (
            <ModalComponent
              selectedImage={selectedImage}
              onClose={handleCloseModal}
              selectedIndex={selectedIndex}
            />
          )}
              <div className="line-clamp-1 text-sm">{message.content}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
    </div>
  );
};

export default ChatWindow;
