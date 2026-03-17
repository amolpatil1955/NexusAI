import { SignIn } from "@clerk/clerk-react";
import { Zap } from "lucide-react";
import React from "react";


export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#080e1a] flex flex-col items-center justify-center px-4">
      {/* Glow bg */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center mb-8 animate-fade-up">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-4 shadow-2xl shadow-blue-500/25">
          <Zap size={26} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">NexusAI</h1>
        <p className="text-sm text-slate-500 mt-1">Sign in to start chatting</p>
      </div>

      <div className="relative animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <SignIn
          afterSignInUrl="/"
          appearance={{
            variables: {
              colorBackground: "#0d1525",
              colorText: "#f1f5f9",
              colorPrimary: "#3b82f6",
              colorInputBackground: "#080e1a",
              colorInputText: "#f1f5f9",
              colorNeutral: "#1e293b",
              borderRadius: "12px",
              fontFamily: "Inter, system-ui, sans-serif",
            },
            elements: {
              card: "shadow-2xl shadow-blue-500/5 border border-white/[0.06]",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-500",
            },
          }}
        />
      </div>
    </div>
  );
}