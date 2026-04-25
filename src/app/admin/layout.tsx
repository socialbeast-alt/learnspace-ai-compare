import { ShieldAlert, LayoutDashboard, Users, Key } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <ShieldAlert className="w-6 h-6 text-indigo-400" />
          <h2 className="text-xl font-bold tracking-tight">Super Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-indigo-600 text-white font-medium">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-not-allowed">
            <Users className="w-5 h-5" /> Users (Locked)
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-not-allowed">
            <Key className="w-5 h-5" /> API Logs (Locked)
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
          LearnSpace OS v2.0
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
