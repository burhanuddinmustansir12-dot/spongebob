import Counter from "@/Components/Counter";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white sm:items-start">
        <div className="flex flex-col items-center">
          <Counter title="Counter #1" />
          <Counter title="Counter #2" />
          <Counter title="Counter #3" />
          <div className="mt-4 px-6 py-3 rounded-lg border-2 border-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors">
            <Link href="/Burhan" className="text-blue-600 hover:text-blue-800 font-medium no-underline">
              Go to Burhan Page
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}