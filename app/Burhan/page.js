'use client';
import Counter from "@/Components/Counter";
import Image from "next/image";
import { useState } from "react";

export default function Burhan() {
  const [pingResult, setPingResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(process.env.MONGO_URI);

  const pingGoogle = async () => {
    setIsLoading(true);
    setPingResult("Pinging...");
    
    try {
      const response = await fetch('/api/ping');
      const data = await response.json();
      
      if (data.success) {
        setPingResult(`Success: ${data.result}`);
      } else {
        setPingResult(`Error: ${data.error}`);
      }
    } catch (error) {
      setPingResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white text-black">
        <Counter title="Counter #1" />
        <Counter title="Counter #2" />
        <Counter title="Counter #3" />
        <div className="p-8">
          <Image src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tokyo Skyline" width={200} height={200} className="w-full rounded-lg border border-white-200 dark:border-gray-200 shadow-lg" />
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold mb-2">Ping Test:</h3>
          <button
            onClick={pingGoogle}
            disabled={isLoading}
            className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Pinging..." : "Ping Google"}
          </button>
          {pingResult && (
            <pre className="text-sm text-gray-700 whitespace-pre-wrap">{pingResult}</pre>
          )}
        </div>
      </main>
    </div>
  );
}