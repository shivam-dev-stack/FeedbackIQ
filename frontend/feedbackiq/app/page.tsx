import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900 p-6 text-white">
      <div className="max-w-md rounded-2xl bg-slate-800 p-8 shadow-xl border border-slate-700">
        <h1 className="text-3xl font-bold text-sky-400 mb-2">
          Next.js + Tailwind
        </h1>
        <p className="text-slate-400 mb-6">
          Tailwind CSS is up and running. Try changing these utility classes to update your UI instantly!
        </p>
        <button className="rounded-lg bg-sky-500 px-4 py-2 font-semibold text-white hover:bg-sky-600 transition-colors">
          Get Started
        </button>
      </div>
    </main>
  );
}
