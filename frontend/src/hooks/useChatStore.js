import { useState, useEffect } from "react";

const UID = () => Math.random().toString(36).slice(2, 10);
const KEY = "nexus_chats";

export function useChatStore() {
  const [chats, setChats] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) ?? []; } catch { return []; }
  });
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(chats));
  }, [chats]);

  const activeChat = chats.find((c) => c.id === activeId) ?? null;

  const createChat = () => {
    const id   = UID();
    const chat = { id, title: "New Chat", messages: [], createdAt: Date.now() };
    setChats((p) => [chat, ...p]);
    setActiveId(id);
    return id;
  };

  const deleteChat = (id) => {
    setChats((p) => p.filter((c) => c.id !== id));
    if (activeId === id) setActiveId(null);
  };

  const sendMessage = async (prompt) => {
    if (!prompt.trim() || loading) return;
    setLoading(true);

    const userMsg = { role: "user", content: prompt };
    let cid = activeId;

    if (!cid) {
      cid = UID();
      setActiveId(cid);
      setChats((p) => [
        { id: cid, title: prompt.slice(0, 38), messages: [userMsg], createdAt: Date.now() },
        ...p,
      ]);
    } else {
      setChats((p) =>
        p.map((c) =>
          c.id === cid
            ? {
                ...c,
                title: c.messages.length === 0 ? prompt.slice(0, 38) : c.title,
                messages: [...c.messages, userMsg],
              }
            : c
        )
      );
    }

    try {
      const res  = await fetch(import.meta.env.VITE_API_URL + "/ai", {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const aiMsg = { role: "assistant", content: data.content ?? data.reply ?? "No response." };

      setChats((p) =>
        p.map((c) => (c.id === cid ? { ...c, messages: [...c.messages, aiMsg] } : c))
      );
    } catch {
      setChats((p) =>
        p.map((c) =>
          c.id === cid
            ? { ...c, messages: [...c.messages, { role: "assistant", content: "⚠️ Server error. Try again." }] }
            : c
        )
      );
    }

    setLoading(false);
  };

  return { chats, activeChat, activeId, setActiveId, createChat, deleteChat, sendMessage, loading };
}