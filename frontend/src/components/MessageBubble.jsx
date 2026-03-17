import { Bot, User } from "lucide-react";
import React from "react";

// Typing animation
export function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 mb-4 animate-fade-up">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
        <Bot size={13} className="text-white" />
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-[#0f1929] border border-white/[0.06]">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MessageBubble({ msg }) {
  const isUser = msg.role === "user";

  return (
    <div className={`flex items-end gap-3 mb-4 animate-fade-up ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-md
        ${isUser
          ? "bg-gradient-to-br from-blue-600 to-indigo-700 shadow-blue-500/20"
          : "bg-gradient-to-br from-blue-500 to-blue-700 shadow-blue-500/20"
        }`}
      >
        {isUser
          ? <User size={13} className="text-white" />
          : <Bot  size={13} className="text-white" />
        }
      </div>

      {/* Bubble */}
      <div className={`max-w-[75%] sm:max-w-[65%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words
        ${isUser
          ? "rounded-2xl rounded-br-sm bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/10"
          : "rounded-2xl rounded-bl-sm bg-[#0f1929] border border-white/[0.06] text-slate-200"
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
}