import React,{ useEffect, useRef, useState } from "react";
import { Menu, Zap } from "lucide-react";
import Sidebar from "./Sidebar";
import MessageBubble, { TypingIndicator } from "./MessageBubble";
import InputBar from "./InputBar";
import WelcomeScreen from "./WelcomeScreen";
import { useChatStore } from "../hooks/useChatStore";

export default function ChatLayout() {
  const {
    chats, activeChat, activeId, setActiveId,
    createChat, deleteChat, sendMessage, loading,
  } = useChatStore();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages?.length, loading]);

  const handleSend = async (text) => {
    await sendMessage(text);
  };

  return (
    <div className="flex h-screen bg-[#080e1a] overflow-hidden">

      <Sidebar
        chats={chats}
        activeId={activeId}
        onSelect={setActiveId}
        onCreate={createChat}
        onDelete={deleteChat}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* Header */}
        <header className="flex items-center gap-3 px-4 h-14 border-b border-white/[0.05] bg-[#080e1a] shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Menu size={18} />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50 animate-pulse" />
            <span className="text-sm font-medium text-slate-300 truncate">
              {activeChat?.title ?? "NexusAI"}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-[10px] font-medium text-slate-600 px-2.5 py-1 rounded-full border border-white/[0.06] bg-white/[0.02]">
              grok-3-mini
            </span>
          </div>
        </header>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
          <div className="max-w-2xl mx-auto h-full">
            {!activeChat || activeChat.messages.length === 0 ? (
              <WelcomeScreen onSuggestion={(text) => { handleSend(text); }} />
            ) : (
              <>
                {activeChat.messages.map((msg, i) => (
                  <MessageBubble key={i} msg={msg} />
                ))}
                {loading && <TypingIndicator />}
                <div ref={bottomRef} />
              </>
            )}
          </div>
        </div>

        <InputBar onSend={handleSend} loading={loading} />
      </div>
    </div>
  );
}