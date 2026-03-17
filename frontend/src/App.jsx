import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import ChatLayout from "./components/ChatLayout";
import LoginPage from "./components/LoginPage";
import React from "react";


const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_KEY}>
      <SignedIn>
        <ChatLayout />
      </SignedIn>
      <SignedOut>
        <LoginPage />
      </SignedOut>
    </ClerkProvider>
  );
}