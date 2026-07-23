import { useState, useEffect } from "react";

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatSession {
  id: string;
  title: string;
  timestamp: number;
  messages: Message[];
}

const STORAGE_KEY = "smart_bharat_chat_sessions";

export function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

export function generateSmartSessionTitle(messages: Message[]): string {
  const userMessages = messages.filter((m) => m.role === "user");
  if (userMessages.length === 0) return "New Conversation";

  const GREETINGS = ["hello", "hi", "hey", "namaste", "good morning", "good afternoon", "good evening", "help", "test", "hi there", "hello there"];

  const targetMsg = userMessages.find((m) => {
    const norm = m.content.trim().toLowerCase().replace(/[^a-z0-9\s]/g, "");
    return !GREETINGS.includes(norm) && norm.length > 2;
  });

  if (!targetMsg) {
    return "General Assistant Query";
  }

  const text = targetMsg.content.trim();
  const lower = text.toLowerCase();

  if (lower.includes("farmer") || lower.includes("kisan") || lower.includes("crop") || lower.includes("land")) return "Farmer Schemes & Benefits";
  if (lower.includes("student") || lower.includes("scholarship")) return "Student Scholarships Guide";
  if (lower.includes("aadhaar")) return "Aadhaar Card Service";
  if (lower.includes("pan card") || lower.includes("pan ")) return "PAN Card Service";
  if (lower.includes("passport")) return "Passport Application Guide";
  if (lower.includes("voter")) return "Voter ID Service";
  if (lower.includes("driving") || lower.includes("license")) return "Driving License Guide";
  if (lower.includes("ayushman") || lower.includes("health")) return "Ayushman Bharat Health";
  if (lower.includes("mudra") || lower.includes("loan")) return "PM Mudra Loan Scheme";
  if (lower.includes("surya") || lower.includes("solar")) return "PM Surya Ghar Solar";
  if (lower.includes("complaint") || lower.includes("grievance")) return "Civic Grievance Query";

  const cleanText = text.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "");
  const words = cleanText.split(/\s+/).slice(0, 5);
  const titleCased = words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

  return titleCased.length > 36 ? titleCased.slice(0, 36) + "..." : titleCased;
}

export function useChatHistory() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: ChatSession[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const cleaned = parsed.map((s) => {
            if (!s.title || s.title.toLowerCase() === "hello" || s.title.toLowerCase() === "hi") {
              return { ...s, title: generateSmartSessionTitle(s.messages) };
            }
            return s;
          });
          setSessions(cleaned);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
        }
      }
    } catch (e) {
      console.error("Failed to load chat history:", e);
    }
  }, []);

  const saveCurrentMessages = (newMessages: Message[]) => {
    setMessages(newMessages);
    if (newMessages.length === 0) return;

    const title = generateSmartSessionTitle(newMessages);

    setSessions((prev) => {
      const targetId = currentSessionId || Date.now().toString();
      if (!currentSessionId) setCurrentSessionId(targetId);

      const existingIndex = prev.findIndex((s) => s.id === targetId);
      const updatedSession: ChatSession = {
        id: targetId,
        title,
        timestamp: Date.now(),
        messages: newMessages,
      };

      let updatedList: ChatSession[];
      if (existingIndex >= 0) {
        updatedList = [...prev];
        updatedList[existingIndex] = updatedSession;
      } else {
        updatedList = [updatedSession, ...prev];
      }

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      } catch (e) {
        console.error("Failed to save session:", e);
      }

      return updatedList;
    });
  };

  const startNewChat = () => {
    const newId = Date.now().toString();
    setCurrentSessionId(newId);
    setMessages([]);
  };

  const selectSession = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      setCurrentSessionId(session.id);
      setMessages(session.messages);
    }
  };

  const deleteSession = (sessionId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = sessions.filter((s) => s.id !== sessionId);
    setSessions(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {}
    if (currentSessionId === sessionId) {
      startNewChat();
    }
  };

  return {
    isMounted,
    sessions,
    currentSessionId,
    messages,
    setMessages: saveCurrentMessages,
    startNewChat,
    selectSession,
    deleteSession,
  };
}
