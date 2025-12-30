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
          <Link href="/Burhan" className="underline mt-4 text-red-600 hover:text-green-800">
            Go to Burhan Page
          </Link>
        </div>
      </main>
    </div>
  );
}