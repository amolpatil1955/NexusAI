import { useClerk, useUser } from "@clerk/clerk-react";
import {
  MessageSquare, Plus, Trash2, LogOut,
  Zap, X, Bot,
} from "lucide-react";
import React from "react";

export default function Sidebar({ chats, activeId, onSelect, onCreate, onDelete, open, onClose }) {
  const { signOut } = useClerk();
  const { user }    = useUser();

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          flex flex-col w-64 shrink-0
          bg-[#0b1120] border-r border-white/[0.06]
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Zap size={14} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-white tracking-tight">NexusAI</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-md text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* New chat */}
        <div className="px-3 pt-3 pb-2">
          <button
            onClick={() => { onCreate(); onClose(); }}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg
              text-sm font-medium text-blue-400 border border-blue-500/20
              bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/40
              transition-all duration-150 group"
          >
            <Plus size={15} className="group-hover:rotate-90 transition-transform duration-200" />
            New Chat
          </button>
        </div>

        {/* Chat list */}
        <nav className="flex-1 overflow-y-auto px-3 py-1 space-y-0.5 scrollbar-thin scrollbar-thumb-white/10">
          {chats.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-slate-600">
              <MessageSquare size={20} className="mb-2 opacity-50" />
              <p className="text-xs">No chats yet</p>
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => { onSelect(chat.id); onClose(); }}
                className={`
                  group flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer
                  transition-all duration-150
                  ${activeId === chat.id
                    ? "bg-white/8 text-white border border-white/10"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent"
                  }
                `}
              >
                <MessageSquare size={13} className="shrink-0 opacity-60" />
                <span className="flex-1 text-xs truncate">{chat.title}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(chat.id); }}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded text-slate-600
                    hover:text-red-400 hover:bg-red-400/10 transition-all duration-150"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))
          )}
        </nav>

        {/* User */}
        <div className="px-3 py-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors group">
            <img
              src={user?.imageUrl}
              alt=""
              className="w-7 h-7 rounded-full ring-1 ring-white/10 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{user?.firstName ?? "User"}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
            <button
              onClick={() => signOut()}
              className="p-1.5 rounded text-slate-600 hover:text-red-400 hover:bg-red-400/10 transition-all"
              title="Sign out"
            >
              <LogOut size={13} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}