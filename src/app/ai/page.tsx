"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Mic, Sparkles, User, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
}

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "ai", content: "Namaste. I am your Smart Bharat intelligence layer. I can guide you through government schemes, ID applications, or infrastructure complaints. How can I assist you today?" }
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
      let aiResponse = "I understand you need help with that. Could you provide a bit more detail so I can direct you precisely?";
      
      const lower = userMsg.toLowerCase();
      if (lower.includes("farmer") || lower.includes("kisan")) {
        aiResponse = "For agricultural support, the 'UP Kisan Samman Nidhi' scheme provides direct income assistance. I can route you to the application portal immediately if you wish.";
      } else if (lower.includes("passport") || lower.includes("id")) {
        aiResponse = "To process a Passport application, you will need Address Proof, a Photograph, and a Birth Certificate. You can initiate this securely from our Identity & Records section.";
      } else if (lower.includes("pothole") || lower.includes("road")) {
        aiResponse = "I can log an infrastructure complaint for you. Navigate to the Complaints dashboard, select 'Road Infrastructure', and upload photographic evidence. I will track the resolution status for you.";
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
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-slate-50 relative overflow-hidden">
      <div className="flex-1 overflow-y-auto px-4 py-8 sm:p-6 lg:p-12 relative z-10 scrollbar-hide">
        <div className="mx-auto max-w-4xl space-y-12 pb-24">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-6 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-md shadow-sm ${msg.role === "user" ? "bg-slate-900" : "bg-accent-50 border border-accent-200"}`}>
                {msg.role === "user" ? <User className="h-6 w-6 text-white" aria-hidden="true" /> : <Sparkles className="h-6 w-6 text-accent-700" aria-hidden="true" />}
              </div>
              <div className={`max-w-[85%] px-6 py-4 ${
                msg.role === "user" 
                  ? "bg-slate-900 text-white rounded-xl rounded-tr-sm shadow-sm" 
                  : "bg-white text-slate-900 rounded-xl rounded-tl-sm border border-slate-300 shadow-sm"
              }`}>
                <p className={`text-base leading-relaxed ${msg.role === "user" ? "font-medium" : ""}`}>
                  {msg.content}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-accent-50 border border-accent-200 shadow-sm">
                <Loader2 className="h-6 w-6 text-accent-700 animate-spin" aria-hidden="true" />
              </div>
              <div className="flex items-center gap-1.5 bg-white rounded-xl rounded-tl-sm border border-slate-300 px-6 py-5 shadow-sm">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-600"></div>
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-600 [animation-delay:-0.2s]"></div>
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-600 [animation-delay:-0.4s]"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-slate-50 border-t border-slate-200 p-4 z-20">
        <div className="mx-auto max-w-4xl">
          <div className="relative flex items-center p-2 bg-white rounded-md border border-slate-300 shadow-sm focus-within:ring-2 focus-within:ring-accent-600 focus-within:border-transparent transition-colors">
            <button 
              onClick={toggleListening}
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-sm transition-colors focus-ring ${isListening ? "bg-red-50 text-red-600 border border-red-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"}`}
              aria-label={isListening ? "Stop listening" : "Start listening"}
            >
              <Mic strokeWidth={2} className="h-5 w-5" aria-hidden="true" />
            </button>
            <label htmlFor="ai-input" className="sr-only">Type your message</label>
            <input
              id="ai-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message in any language..."
              className="flex-1 bg-transparent px-4 py-2 text-base text-slate-900 placeholder:text-slate-500 focus-visible:outline-none"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() && !isListening}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-slate-900 text-white transition-colors hover:bg-accent-700 disabled:opacity-50 disabled:pointer-events-none focus-ring"
              aria-label="Send message"
            >
              <Send strokeWidth={2} className="h-5 w-5 ml-1" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-4 text-center text-sm font-medium text-slate-600">
            Intelligence augmented by Smart Bharat AI. Information is preliminary and subject to official verification.
          </p>
        </div>
      </div>
    </div>
  );
}
