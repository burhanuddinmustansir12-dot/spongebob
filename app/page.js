'use client';
import Counter from "@/Components/Counter";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white font-sans">
        <main className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Loading...</h1>
            <p className="text-gray-600">Checking authentication status...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white sm:items-start">
        <div className="flex flex-col items-center">
          {user ? (
            <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-800 font-bold text-lg">You've Signed In!</p>
              <p className="text-green-700 mt-2">Welcome, {user.displayName || user.email}!</p>
              <button 
                onClick={() => {
                  // Sign out and reload page
                  auth.signOut().then(() => {
                    window.location.href = '/';
                  });
                }} 
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
          {user && (
            <div className="mt-4 px-6 py-3 rounded-lg border-2 border-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors">
              <Link href="/profile" className="text-blue-600 hover:text-blue-800 font-medium no-underline">
                View Profile
              </Link>
            </div>
          )}
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