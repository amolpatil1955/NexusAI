import React,{ useRef, useState } from "react";
import { SendHorizonal, Loader2 } from "lucide-react";

export default function InputBar({ onSend, loading }) {
  const [input, setInput] = useState("");
  const ref = useRef(null);

  const autoResize = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 140) + "px";
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text || loading) return;
    onSend(text);
    setInput("");
    if (ref.current) ref.current.style.height = "44px";
  };

  return (
    <div className="px-4 pb-4 pt-3 bg-[#080e1a] border-t border-white/[0.05]">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-end gap-2 bg-[#0d1525] border border-white/[0.08] rounded-2xl px-4 py-2 focus-within:border-blue-500/50 focus-within:shadow-lg focus-within:shadow-blue-500/5 transition-all duration-200">
          <textarea
            ref={ref}
            value={input}
            onChange={(e) => { setInput(e.target.value); autoResize(); }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
            }}
            placeholder="Message NexusAI…"
            rows={1}
            className="flex-1 bg-transparent outline-none resize-none text-sm text-slate-200 placeholder-slate-600 leading-relaxed py-2 max-h-36"
            style={{ fontFamily: "inherit" }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className={`mb-1.5 p-2 rounded-xl transition-all duration-200 flex items-center justify-center shrink-0
              ${!input.trim() || loading
                ? "text-slate-700 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-105 active:scale-95"
              }`}
          >
            {loading
              ? <Loader2 size={15} className="animate-spin text-blue-400" />
              : <SendHorizonal size={15} />
            }
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-700 mt-2">
          NexusAI can make mistakes. Verify important info.
        </p>
      </div>
    </div>
  );
}