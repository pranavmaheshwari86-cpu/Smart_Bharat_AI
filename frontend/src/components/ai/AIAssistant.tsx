"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2 } from "lucide-react";

import { usePathname } from "next/navigation";

interface Message {
  id: string;
  type: "user" | "bot";
  text: string;
}

const PREDEFINED_QUESTIONS = [
  "Am I eligible for PM-KISAN?",
  "Which documents do I need for a Passport?",
  "How do I link my Aadhaar to PAN?",
  "What schemes are available for students?"
];

export function AIAssistant() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", type: "bot", text: "Namaste! I am your Smart Bharat AI Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (["/login", "/signup"].includes(pathname)) return null;

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), type: "user", text };
    setMessages(prev => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let botResponse = "I can help you with that! Please visit the relevant Government Scheme or ID page for detailed information.";
      
      const lowerText = text.toLowerCase();
      if (lowerText.includes("pm-kisan") || lowerText.includes("kisan")) {
        botResponse = "For PM-KISAN, you need to be a small or marginal farmer with cultivable land. You'll need your Aadhaar, bank details, and land records. Shall I take you to the PM-KISAN page?";
      } else if (lowerText.includes("passport")) {
        botResponse = "To apply for a Passport, you generally need an Address Proof (like Aadhaar or Voter ID) and a Date of Birth Proof (like a Birth Certificate). You can apply through our Government IDs section.";
      } else if (lowerText.includes("aadhaar") && lowerText.includes("pan")) {
        botResponse = "Linking Aadhaar to PAN is mandatory. You can do this easily through the Income Tax e-filing portal. Would you like me to guide you through the process?";
      } else if (lowerText.includes("student") || lowerText.includes("scholarship")) {
        botResponse = "We have many schemes for students! I recommend checking out the 'Post Matric Scholarship' or 'National Means cum Merit Scholarship'. You can filter schemes by 'Education' in the Schemes directory.";
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), type: "bot", text: botResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-300 z-50 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 hover:scale-110'}`}
        aria-label="Open AI Assistant"
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
        style={{ height: '600px', maxHeight: 'calc(100vh - 48px)' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Smart Bharat AI</h3>
              <p className="text-xs text-blue-100">Always here to help</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[85%] ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.type === "user" ? "bg-indigo-100 text-indigo-700" : "bg-blue-100 text-blue-700"}`}>
                  {msg.type === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`px-4 py-3 rounded-2xl text-sm ${
                  msg.type === "user" 
                    ? "bg-indigo-600 text-white rounded-tr-sm" 
                    : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm"
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Bot size={16} />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white border border-slate-200 rounded-tl-sm shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Predefined Questions */}
        {messages.length === 1 && (
          <div className="p-3 bg-white border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 mb-2 px-1">Suggested for you:</p>
            <div className="flex flex-wrap gap-2">
              {PREDEFINED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full transition-colors border border-slate-200"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about govt schemes..."
              className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-full px-4 py-3 text-sm transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-12 h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors shrink-0"
            >
              {isTyping ? <Loader2 size={20} className="animate-spin" /> : <Send size={18} className="ml-1" />}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
