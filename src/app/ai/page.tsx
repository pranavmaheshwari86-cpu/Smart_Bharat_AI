"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, BotMessageSquare, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
}

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "ai", content: "Namaste! I am your Smart Bharat AI Assistant. I can help you find schemes, apply for IDs, or file complaints. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput("");
    
    setMessages(prev => [...prev, { id: Date.now().toString(), role: "user", content: userMsg }]);
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      setIsTyping(false);
      let aiResponse = "I understand you need help with that. Could you provide a bit more detail?";
      
      const lower = userMsg.toLowerCase();
      if (lower.includes("farmer") || lower.includes("kisan")) {
        aiResponse = "For farmers, I highly recommend checking out the 'UP Kisan Samman Nidhi' scheme. It provides direct income support. Would you like me to take you to the application page?";
      } else if (lower.includes("passport") || lower.includes("id")) {
        aiResponse = "To apply for a Passport, you will need Address Proof, a Photo, and a Birth Certificate. You can start the application process from the 'Government IDs' section.";
      } else if (lower.includes("pothole") || lower.includes("road")) {
        aiResponse = "I can help you file a complaint regarding road infrastructure. Please go to the 'Complaints' tab and select 'Roads / Potholes'. Ensure you have a picture ready to upload as evidence.";
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "ai", content: aiResponse }]);
    }, 1500);
  };

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      // Mock converting speech to text
      setInput("What schemes are available for farmers?");
    } else {
      setIsListening(true);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-slate-50">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-3xl space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${msg.role === "user" ? "bg-blue-600" : "bg-green-600"}`}>
                  {msg.role === "user" ? <User className="h-5 w-5 text-white" /> : <BotMessageSquare className="h-5 w-5 text-white" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm sm:text-base ${
                  msg.role === "user" 
                    ? "bg-blue-600 text-white rounded-tr-none" 
                    : "bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none"
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600">
                <BotMessageSquare className="h-5 w-5 text-white" />
              </div>
              <div className="flex items-center gap-1 rounded-2xl rounded-tl-none border border-slate-100 bg-white px-5 py-4 shadow-sm">
                <div className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-slate-300"></div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white p-4">
        <div className="mx-auto flex max-w-3xl items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className={`shrink-0 rounded-full ${isListening ? "bg-red-50 text-red-600 border-red-200 animate-pulse" : ""}`}
            onClick={toggleListening}
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message in any language..."
            className="rounded-full"
          />
          <Button 
            size="icon" 
            className="shrink-0 rounded-full"
            onClick={handleSend}
            disabled={!input.trim() && !isListening}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 text-center text-xs text-slate-400">
          Smart Bharat AI can make mistakes. Please verify important information with official sources.
        </p>
      </div>
    </div>
  );
}
