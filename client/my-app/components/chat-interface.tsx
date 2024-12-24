'use client'

import { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Phone, Video, MoreVertical } from 'lucide-react'
import useSocket from '@/hooks/useSocket';

const conversations = [
  { id: 1, name: "Alice Johnson", lastMessage: "Hey, how's it going?", time: "10:30 AM", avatar: "" },
  { id: 2, name: "Bob Smith", lastMessage: "Can we meet tomorrow?", time: "Yesterday", avatar: "" },
  { id: 3, name: "Carol Williams", lastMessage: "Thanks for your help!", time: "Tuesday", avatar: "" },
];
const messages_dummy = [
  { id: 1, sender: "Alice Johnson", receiver: "You", content: "Hey there! How are you doing?", time: "10:30 AM" },
  { id: 2, sender: "You", receiver: "Alice Johnson", content: "Hi Alice! I'm doing great, thanks for asking. How about you?", time: "10:32 AM" },
  { id: 3, sender: "Alice Johnson", receiver: "You", content: "I'm good too! Just wanted to catch up. Any plans for the weekend?", time: "10:33 AM" },
  { id: 4, sender: "You", receiver: "Alice Johnson", content: "Not much planned yet. Might go hiking if the weather's nice. You?", time: "10:35 AM" },
];

export default function ChatInterface() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [inputMessage, setInputMessage] = useState("");
  const socket = useSocket("http://localhost:8000");
  const [messages, setMessages] = useState(messages_dummy);
  let numMessages = messages.length;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim() && socket) {
      console.log("Sending message:", inputMessage);
      setInputMessage("");
      socket.emit("message", {
        id: numMessages + 1,
        sender: "You",
        receiver: selectedConversation.name,
        content: inputMessage,
        time: new Date().toLocaleTimeString(),
      });
      numMessages++;
    }
  }

  useEffect(() => {
    if (socket) {
      socket.on("message", (message) => {
        console.log("Received message:", message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  return (
    <>
      <div className="w-1/4 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <Input type="text" placeholder="Search conversations..." className="w-full" />
        </div>
        <ScrollArea className="h-[calc(100vh-73px)]">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 ${
                selectedConversation.id === conversation.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <Avatar>
                <AvatarImage src={conversation.avatar} alt={conversation.name} />
                <AvatarFallback>{conversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{conversation.name}</p>
                <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
              </div>
              <span className="text-xs text-gray-400">{conversation.time}</span>
            </div>
          ))}
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
              <AvatarFallback>{selectedConversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <h2 className="font-semibold">{selectedConversation.name}</h2>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon"><Phone className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon"><Video className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5" /></Button>
          </div>
        </div>
        <ScrollArea className="flex-1 p-4">
          {messages.map((message) => {
            if (message.sender !== selectedConversation.name && message.receiver !== selectedConversation.name) {
              return <div key={message.id}></div>;
            }
            const isSent = message.sender === "You";
            return (
              <div
                key={message.id}
                className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    isSent ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${isSent ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            )
          })}
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

