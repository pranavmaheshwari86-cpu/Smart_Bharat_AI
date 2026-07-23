"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";
import { getUserDisplayName } from "@/lib/utils";
import { useChatHistory, formatRelativeTime, Message } from "@/lib/useChatHistory";

// Dynamically import the heavy Spline 3D component — defers ~1.9MB runtime
// to after the page's interactive shell has loaded. Shows a lightweight
// animated fallback while the scene loads.
const InteractiveRobotSpline = dynamic(
  () => import("@/components/ui/interactive-3d-robot").then((m) => ({ default: m.InteractiveRobotSpline })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center animate-pulse">
          <span className="material-symbols-outlined text-[36px] text-primary/60" style={{ fontVariationSettings: "'FILL' 1" }}>
            smart_toy
          </span>
        </div>
      </div>
    ),
  }
);

export default function AIPage() {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { isMounted, sessions, currentSessionId, messages, setMessages, startNewChat, selectSession, deleteSession } = useChatHistory();
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const callAI = async (history: Message[]): Promise<string> => {
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "AI error");
      return data.content;
    } catch (err) {
      console.error("AI call failed:", err);
      return "I'm sorry, I couldn't reach the AI service right now. Please try again in a moment.";
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = typeof textToSend === "string" ? textToSend.trim() : inputValue.trim();
    if (!text) return;
    
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text
    };
    
    const updatedHistory = [...messages, newUserMsg];
    setMessages(updatedHistory);
    setInputValue("");
    setIsTyping(true);
    
    const aiContent = await callAI(updatedHistory);
    const newAiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiContent
    };
    setMessages([...updatedHistory, newAiMsg]);
    setIsTyping(false);
  };

  useEffect(() => {
    // Input focus state handling
    const input = document.querySelector('input[type="text"]');
    const container = input?.closest('.glass-input');
    
    if (input && container) {
      const handleFocus = () => container.classList.add('ring-2', 'ring-primary/30');
      const handleBlur = () => container.classList.remove('ring-2', 'ring-primary/30');
      
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
      
      return () => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      };
    }
  }, []);



  return (
    <div className="font-body-md text-on-surface antialiased overflow-hidden selection:bg-primary/20 selection:text-primary">
      <style dangerouslySetInnerHTML={{ __html: `
        @theme {
          --animate-float-1: float 6s ease-in-out infinite, fade 8s ease-in-out infinite;
          --animate-float-2: float 7s ease-in-out infinite 1s, fade 9s ease-in-out infinite 1s;
          --animate-float-3: float 5s ease-in-out infinite 2s, fade 7s ease-in-out infinite 2s;
          --animate-float-4: float 8s ease-in-out infinite 3s, fade 10s ease-in-out infinite 3s;
          --animate-float-5: float 6.5s ease-in-out infinite 0.5s, fade 8.5s ease-in-out infinite 0.5s;
          --animate-float-6: float 5.5s ease-in-out infinite 1.5s, fade 7.5s ease-in-out infinite 1.5s;
          --keyframes-float: {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-15px)" }
          };
          --keyframes-fade: {
            "0%, 100%": { opacity: "0.3" },
            "50%": { opacity: "1" }
          };
        }
        
        .ambient-glow-1 {
            position: fixed;
            top: -10%;
            left: -10%;
            width: 50vw;
            height: 50vw;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 74, 198, 0.08) 0%, rgba(253, 248, 245, 0) 70%);
            z-index: -1;
            pointer-events: none;
        }
        .ambient-glow-2 {
            position: fixed;
            bottom: -20%;
            right: -10%;
            width: 60vw;
            height: 60vw;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(120, 89, 38, 0.06) 0%, rgba(253, 248, 245, 0) 70%);
            z-index: -1;
            pointer-events: none;
        }

        .glass-panel {
            background-color: rgba(253, 248, 245, 0.7);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(195, 198, 215, 0.3);
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .glass-card {
            background-color: rgba(253, 248, 245, 0.6);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(195, 198, 215, 0.2);
            border-radius: 1rem;
            transition: all 0.3s;
        }
        .glass-card:hover {
            background-color: rgba(253, 248, 245, 0.8);
        }
        .glass-input {
            background-color: rgba(253, 248, 245, 0.8);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(195, 198, 215, 0.4);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            border-radius: 9999px;
            transition: all 0.3s;
        }
        .glass-input:focus-within {
            box-shadow: 0 0 0 2px rgba(0, 74, 198, 0.3);
        }

        ::-webkit-scrollbar {
            width: 6px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background-color: rgba(195, 198, 215, 0.5);
            border-radius: 9999px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background-color: rgba(115, 118, 134, 0.5);
        }

        /* Hide Spline watermark */
        a[href*="spline.design"] {
            display: none !important;
        }
      `}} />
      
      {/* Global Background Shader */}
      <div className="fixed inset-0 z-[-2] bg-[#fdf8f5]"></div>
      
      {/* Ambient CSS Glows */}
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>
      
      <div className="flex h-screen w-full relative">
        {/* Sidebar (Smart Context) */}
        <div className={`hidden md:flex transition-all duration-300 ease-in-out flex-shrink-0 h-full overflow-hidden relative z-20 ${isSidebarOpen ? 'w-[280px]' : 'w-0'}`}>
          <aside className="flex flex-col w-[280px] h-full bg-surface/50 backdrop-blur-2xl border-r border-outline-variant/30 flex-shrink-0">

          
          {/* Sidebar Navigation/History */}
          <div className="flex-1 overflow-y-auto px-4 pt-[64px] pb-6 space-y-8">
            {/* Main Nav removed per user request */}
            
            {/* Recent Contexts */}
            <div>
              <div className="flex items-center justify-between px-4 mb-3">
                <h3 className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest">Recent Chats</h3>
                <button
                  onClick={startNewChat}
                  title="New Chat"
                  className="flex items-center gap-1 text-[12px] font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span> New
                </button>
              </div>
              <div className="space-y-1">
                {!isMounted || sessions.length === 0 ? (
                  <p className="px-4 py-3 text-[13px] text-on-surface-variant/70 italic">No recent chats yet.</p>
                ) : (
                  sessions.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => selectSession(s.id)}
                      className={`w-full text-left flex items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer transition-colors group ${
                        currentSessionId === s.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-surface-container-low'
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <span className={`material-symbols-outlined text-[18px] mt-0.5 ${currentSessionId === s.id ? 'text-primary' : 'text-outline group-hover:text-primary'}`}>
                          chat_bubble
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-body-md text-[14px] text-on-surface line-clamp-1">{s.title}</p>
                          <p className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">{formatRelativeTime(s.timestamp)}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => deleteSession(s.id, e)}
                        title="Delete Chat"
                        className="opacity-0 group-hover:opacity-100 p-1 hover:text-error transition-all"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          
          {/* User Profile Area */}
          <div className="p-4 border-t border-outline-variant/20">
            <Link href="/profile" className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-surface-container transition-colors">
              {user?.profilePhoto ? (
                <img className="w-10 h-10 rounded-full object-cover border border-outline-variant/30" alt={getUserDisplayName(user)} src={user.profilePhoto} />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border border-primary/20">
                  {getUserDisplayName(user).charAt(0).toUpperCase()}
                </div>
              )}
              <div className="text-left flex-1 min-w-0">
                <p className="font-body-md text-[14px] font-medium text-on-surface truncate">{getUserDisplayName(user)}</p>
                <p className="font-label-sm text-[12px] text-on-surface-variant truncate">{user?.email || "Citizen Profile"}</p>
              </div>
              <span className="material-symbols-outlined text-outline">settings</span>
            </Link>
          </div>

          </aside>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative h-full min-w-0 transition-all duration-300">
          
          {/* Sidebar Toggle Button */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden md:flex absolute top-[64px] left-4 z-50 w-10 h-10 rounded-full bg-surface/50 backdrop-blur border border-outline-variant/30 items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all shadow-sm group"
            title={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
              view_sidebar
            </span>
          </button>


          {/* Scrollable Canvas */}
          <div className="flex-1 overflow-y-auto pt-[56px] md:pt-[64px] pb-64 px-4 md:px-12 flex flex-col">
            <div className={`w-full max-w-[1000px] mx-auto flex flex-col gap-6 md:gap-8`}>

              {messages.length === 0 ? (
                <>
                  {/* Hero Section */}
                  <section className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 mt-0">
                    <div className="flex-1 space-y-6 text-center md:text-left">
                  <h2 className="text-5xl md:text-[64px] font-bold leading-[1.1] text-on-surface tracking-tight">
                    Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Intelligence</span><br/>Core
                  </h2>
                  <p className="text-lg md:text-[18px] text-on-surface-variant max-w-[500px] mx-auto md:mx-0 leading-relaxed">
                    How can I help you navigate government services, understand documents, or access benefits today?
                  </p>
                </div>

                {/* Network Visualization Container */}
                <div className="w-[320px] h-[320px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] relative flex-shrink-0 overflow-hidden">
                  {/* Scale up slightly to crop out the Spline watermark at the bottom right */}
                  <div className="absolute top-0 left-[-5%] w-[110%] h-[110%] z-10">
                    <InteractiveRobotSpline
                      scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
                      className="absolute inset-0 w-full h-full spline-container" 
                    />
                  </div>
                </div>
              </section>

              {/* Suggested Actions Grid */}
              <section className="w-full mt-4">
                <h3 className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest mb-4 px-2">Suggested Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Card 1 */}
                  <button onClick={() => handleSendMessage("Find Schemes")} className="glass-card p-5 text-left group flex flex-col gap-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="w-12 h-12 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center shadow-sm relative z-10">
                      <span className="material-symbols-outlined text-[24px] text-primary">account_balance</span>
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-body-lg text-[16px] font-medium text-on-surface mb-1 group-hover:text-primary transition-colors">Find Schemes</h4>
                      <p className="font-body-md text-[14px] text-on-surface-variant">Discover eligibility for state &amp; central programs.</p>
                    </div>
                  </button>
                  {/* Card 2 */}
                  <button onClick={() => handleSendMessage("Explain Document")} className="glass-card p-5 text-left group flex flex-col gap-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="w-12 h-12 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center shadow-sm relative z-10">
                      <span className="material-symbols-outlined text-[24px] text-secondary">description</span>
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-body-lg text-[16px] font-medium text-on-surface mb-1 group-hover:text-secondary transition-colors">Explain Document</h4>
                      <p className="font-body-md text-[14px] text-on-surface-variant">Upload official forms for simple explanations.</p>
                    </div>
                  </button>
                  {/* Card 3 */}
                  <button onClick={() => handleSendMessage("Healthcare Nav")} className="glass-card p-5 text-left group flex flex-col gap-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-tertiary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="w-12 h-12 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center shadow-sm relative z-10">
                      <span className="material-symbols-outlined text-[24px] text-tertiary">local_hospital</span>
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-body-lg text-[16px] font-medium text-on-surface mb-1 group-hover:text-tertiary transition-colors">Healthcare Nav</h4>
                      <p className="font-body-md text-[14px] text-on-surface-variant">Locate AB-PMJAY empaneled hospitals near you.</p>
                    </div>
                  </button>
                </div>
              </section>
                </>
              ) : (
                <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto mt-4 md:mt-8 pb-12">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'assistant' && (
                        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mr-4 flex-shrink-0 mt-1 shadow-sm">
                          <span className="material-symbols-outlined text-[20px] text-primary">smart_toy</span>
                        </div>
                      )}
                      <div className={`max-w-[80%] md:max-w-[70%] rounded-[1.5rem] px-6 py-4 shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-primary text-white rounded-br-sm' 
                          : 'bg-white/70 backdrop-blur-md border border-outline-variant/40 text-on-surface rounded-bl-sm'
                      }`}>
                        <p className="font-body-md text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start animate-in fade-in duration-300">
                      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mr-4 flex-shrink-0 mt-1 shadow-sm">
                        <span className="material-symbols-outlined text-[20px] text-primary">smart_toy</span>
                      </div>
                      <div className="bg-white/70 backdrop-blur-md border border-outline-variant/40 rounded-[1.5rem] rounded-bl-sm px-6 py-5 flex items-center gap-1.5 w-[88px] shadow-sm">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2.5 h-2.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2.5 h-2.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} className="h-4" />
                </div>
              )}
            </div>
          </div>

          {/* Fixed Bottom Composer */}
          <div className={`absolute bottom-0 left-0 w-full px-4 md:px-12 pb-8 pt-20 bg-gradient-to-t from-surface via-surface/95 to-transparent z-40 flex justify-center pointer-events-none`}>
            <div className="w-full max-w-[1000px] relative pointer-events-auto">
              {/* Input Container Form */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSendMessage(inputValue);
                }}
                className="glass-input p-2 pl-6 pr-2 flex items-center gap-3 relative z-10 pointer-events-auto"
              >
                <input 
                  className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface font-body-md text-body-md placeholder:text-outline py-3 outline-none" 
                  placeholder="Ask about schemes, upload documents, or request guidance..." 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="flex items-center gap-1">
                  <button type="button" className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" title="Attach file">
                    <span className="material-symbols-outlined text-[22px]">attach_file</span>
                  </button>
                  <button type="button" className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" title="Voice input">
                    <span className="material-symbols-outlined text-[22px]">mic</span>
                  </button>
                  <button type="submit" className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm ml-1 cursor-pointer" title="Send message">
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                  </button>
                </div>
              </form>
              
              {/* Footer Info */}
              <div className="text-center mt-3">
                <p className="font-label-sm text-[11px] text-outline">Smart Bharat AI may display inaccurate info. Always verify official government sources.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
