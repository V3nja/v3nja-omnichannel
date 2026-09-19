"use client";

import { useState, useEffect } from "react";

interface LogEntry {
  id: string;
  createdAt: string;
  platform: string;
  type: string;
  triggerUser?: string;
  content: string;
  status: string;
}

export default function LogsPage() {
  const [filter, setFilter] = useState<string>("ALL");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/logs");
      const data = await res.json();
      if (data.logs) {
        setLogs(data.logs);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLogs = logs.filter((l) => {
    if (filter === "ALL") return true;
    return l.platform === filter;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>📡</span>
            <span>Real-Time Broadcast &amp; DM Delivery Stream</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Authentic audit trail of Facebook comment replies, Messenger DMs, and multi-network broadcasts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchLogs}
            className="v3nja-btn-secondary px-3.5 py-2 text-xs flex items-center gap-2"
          >
            <span>🔄</span>
            <span>Refresh Logs</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "ALL", label: "All Logs" },
          { id: "FACEBOOK", label: "🔵 Facebook" },
          { id: "INSTAGRAM", label: "📸 Instagram" },
          { id: "YOUTUBE", label: "🔴 YouTube" },
          { id: "TWITTER", label: "⚫ Twitter / X" },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id)}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
              filter === btn.id
                ? "bg-amber-500 text-black border-amber-400 shadow-md"
                : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Logs View */}
      {isLoading ? (
        <div className="nuelink-card p-8 text-center text-xs text-zinc-400">
          Loading live event logs...
        </div>
      ) : filteredLogs.length > 0 ? (
        <div className="nuelink-card overflow-hidden shadow-2xl divide-y divide-white/[0.06]">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 sm:w-1/3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded border bg-white/[0.05] border-white/10 text-zinc-300">
                    {log.platform}
                  </span>
                  <span className="text-xs font-bold text-white">{log.triggerUser || "System"}</span>
                </div>
                <div className="text-[11px] text-zinc-500">
                  🕒 {new Date(log.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="space-y-0.5 sm:w-1/2">
                <div className="text-xs text-zinc-200 font-medium">{log.type}</div>
                <div className="text-[11px] text-zinc-400">{log.content}</div>
              </div>

              <div className="self-start sm:self-center">
                <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/15 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  ✓ {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="nuelink-card p-12 text-center space-y-3 border-dashed">
          <div className="text-3xl">📡</div>
          <div className="text-sm font-bold text-white">No Live Activity Recorded Yet</div>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Real-time logs will automatically stream here whenever a fan comments on your Facebook posts, receives a Messenger VIP smart link card, or a scheduled cross-post is dispatched.
          </p>
        </div>
      )}
    </div>
  );
}
