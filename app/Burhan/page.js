'use client';
import Counter from "@/Components/Counter";
import Image from "next/image";


export default function Burhan() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white text-black">
        <Counter title="Counter #1" />
        <Counter title="Counter #2" />
        <Counter title="Counter #3" />
        <div className="p-8">
          <Image src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tokyo Skyline" width={200} height={200} className="w-full rounded-lg border border-white-200 dark:border-gray-200 shadow-lg" />
        </div>
      </main>
    </div>
  );
}