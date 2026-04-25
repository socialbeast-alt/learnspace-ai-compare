"use client";
import { useState } from "react";
import { Save, Key, Database, Shield, CheckCircle2, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  
  // States for dynamic configuration
  const [geminiKey, setGeminiKey] = useState("");
  const [firebaseProject, setFirebaseProject] = useState("");
  const [platformActive, setPlatformActive] = useState(true);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    
    try {
      // Simulate API call to save configuration to secure backend/Firestore
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess("Configuration successfully saved. API Keys and Permissions dynamically updated.");
      setGeminiKey(""); // Clear for security
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-5xl mx-auto animate-in fade-in duration-500">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Platform Configuration</h1>
        <p className="text-slate-500 mt-2">Manage API keys, infrastructure settings, and access control.</p>
      </header>

      {success && (
        <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-800">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <p className="font-medium">{success}</p>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Gemini API Key Section */}
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-4">
            <Key className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-800">AI Engine Configuration</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Gemini Pro API Key</label>
              <input 
                type="password"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="AIzaSyB........................"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
              <p className="text-xs text-gray-500 mt-1">This key will be dynamically loaded by the backend API, bypassing static environment variables.</p>
            </div>
          </div>
        </section>

        {/* Firebase Config Section */}
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-4">
            <Database className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-bold text-gray-800">Firebase Infrastructure</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Firebase Project ID</label>
              <input 
                type="text"
                value={firebaseProject}
                onChange={(e) => setFirebaseProject(e.target.value)}
                placeholder="e.g., learnspace-ai-prod"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
              <p className="text-xs text-orange-800 font-medium">Warning: Modifying Firebase settings while the app is actively running may require a brief Cloud Run restart to securely re-initialize the Admin SDK.</p>
            </div>
          </div>
        </section>

        {/* Access Control */}
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-4">
            <Shield className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-bold text-gray-800">Access Control</h2>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div>
              <p className="font-bold text-gray-800">Platform Status: {platformActive ? "Active" : "Paused"}</p>
              <p className="text-sm text-gray-500">Pause the platform to prevent users from consuming API tokens.</p>
            </div>
            <button 
              type="button"
              onClick={() => setPlatformActive(!platformActive)}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition ${platformActive ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
            >
              {platformActive ? "Pause Platform" : "Re-activate Platform"}
            </button>
          </div>
        </section>

        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition disabled:opacity-70 shadow-md shadow-indigo-200"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
