'use client';
import Counter from "@/Components/Counter";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useState(null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white sm:items-start">
        <div className="flex flex-col items-center">
          {user ? (
            <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-800 font-medium">Welcome, {user.displayName || user.email}!</p>
              <button 
                onClick={() => {
                  // Simple sign out - reload page to clear state
                  window.location.href = '/';
                }} 
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 mb-2">Please sign in to continue</p>
              <div className="space-x-4">
                <Link 
                  href="/firebase-signin" 
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Sign in with Firebase
                </Link>
                <Link 
                  href="/auth/configuration" 
                  className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Firebase Config
                </Link>
              </div>
            </div>
          )}
          <Counter title="Counter #1" />
          <Counter title="Counter #2" />
          <Counter title="Counter #3" />
          <div className="mt-4 px-6 py-3 rounded-lg border-2 border-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors">
            <Link href="/Burhan" className="text-blue-600 hover:text-blue-800 font-medium no-underline">
              Go to Burhan Page
            </Link>
          </div>
          <div className="mt-4 px-6 py-3 rounded-lg border-2 border-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors">
            <Link href="/auth/configuration" className="text-blue-600 hover:text-blue-800 font-medium no-underline">
              Firebase Configuration
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}