import { Zap } from "lucide-react";
import React from "react";



export default function WelcomeScreen({ onSuggestion }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 animate-fade-up">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-5 shadow-2xl shadow-blue-500/20">
        <Zap size={26} className="text-white" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
        How can I help?
      </h1>
      <p className="text-sm text-slate-500 mb-10">
        Ask me anything — code, concepts, ideas.
      </p>
{/* 
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-xl">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.text}
            onClick={() => onSuggestion(s.text)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-left
              bg-[#0d1525] border border-white/[0.06] text-slate-400 text-sm
              hover:border-blue-500/30 hover:text-slate-200 hover:bg-[#111e35]
              transition-all duration-150 group"
          >
            <span className="text-base shrink-0">{s.emoji}</span>
            <span className="truncate">{s.text}</span>
          </button>
        ))}
      </div> */}
    </div>
  );
}