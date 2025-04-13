import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    setSelectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="h-full flex flex-col">
        <div className="sticky top-0 z-10 bg-base-100 border-b border-base-300 p-4">
          <button 
            onClick={() => setSelectedUser(null)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="size-6" />
            <span>Back to chats</span>
          </button>
        </div>
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-base-100">
      <div className="sticky top-0 z-10 bg-base-100 border-b border-base-300 p-4">
        <button 
          onClick={() => setSelectedUser(null)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="size-6" />
          <div className="flex items-center gap-3">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="size-8 rounded-full"
            />
            <span className="font-medium">{selectedUser.fullName}</span>
          </div>
        </button>
      </div>

      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-base-100"
      >
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`
                max-w-[85%] flex flex-col gap-1
                ${message.senderId === authUser._id ? "items-end" : "items-start"}
              `}
            >
              <div
                className={`
                  px-4 py-2 rounded-2xl break-words
                  ${
                    message.senderId === authUser._id
                      ? "bg-primary text-primary-content rounded-br-none"
                      : "bg-base-200 rounded-bl-none"
                  }
                `}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="max-w-[200px] rounded-lg mb-2"
                  />
                )}
                {message.text && <p className="text-[15px]">{message.text}</p>}
              </div>
              <time className="text-xs opacity-50">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className="sticky bottom-0 bg-base-100 border-t border-base-300">
        <MessageInput />
      </div>
    </div>
  );
};
export default ChatContainer;
