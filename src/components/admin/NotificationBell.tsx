"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { getRecentNotifications, type NotificationItem } from "@/app/admin/notifications-actions";
import { saveSubscription, removeSubscription } from "@/app/admin/push-actions";
import {
  isPushSupported,
  getPushSubscription,
  subscribeToPush,
  unsubscribeFromPush,
} from "@/lib/push-client";

const SEEN_KEY = "vdl-admin-notifications-seen";

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [lastSeen, setLastSeen] = useState("");
  const [pushState, setPushState] = useState<"unsupported" | "off" | "on" | "busy">("off");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // localStorage and browser push state can only be read client-side, post-mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLastSeen(localStorage.getItem(SEEN_KEY) || "");
    getRecentNotifications().then(setItems);

    if (!isPushSupported()) {
      setPushState("unsupported");
    } else {
      getPushSubscription().then((sub) => setPushState(sub ? "on" : "off"));
    }
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const unreadCount = items.filter((n) => !lastSeen || n.createdAt > lastSeen).length;

  const toggleOpen = async () => {
    const next = !open;
    setOpen(next);
    if (next) {
      const fresh = await getRecentNotifications();
      setItems(fresh);
      const now = new Date().toISOString();
      localStorage.setItem(SEEN_KEY, now);
      setLastSeen(now);
    }
  };

  const togglePush = async () => {
    const wasOn = pushState === "on";
    setPushState("busy");
    try {
      if (wasOn) {
        const endpoint = await unsubscribeFromPush();
        if (endpoint) await removeSubscription(endpoint);
        setPushState("off");
      } else {
        const sub = await subscribeToPush();
        await saveSubscription(sub.toJSON() as { endpoint: string; keys: { p256dh: string; auth: string } });
        setPushState("on");
      }
    } catch (e) {
      alert(e instanceof Error ? e.message : "Couldn't update notification settings.");
      setPushState(wasOn ? "on" : "off");
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={toggleOpen}
        aria-label="Notifications"
        aria-expanded={open}
        className="relative flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#E5E7EB] text-[#6B7280] transition-colors hover:bg-[#F3F4F6] dark:border-white/10 dark:hover:bg-white/5"
      >
        <Bell className="h-[18px] w-[18px]" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#DC2626] px-1 text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-[#E5E7EB] bg-white shadow-lg dark:border-white/10 dark:bg-[#0F1512]">
          <div className="border-b border-[#E5E7EB] px-4 py-3 dark:border-white/10">
            <p className="text-sm font-bold text-[#111827] dark:text-white">Notifications</p>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {items.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-[#6B7280]">No registrations yet.</p>
            ) : (
              items.map((n) => (
                <Link
                  key={n.id}
                  href={n.url}
                  onClick={() => setOpen(false)}
                  className="block border-b border-[#F3F4F6] px-4 py-3 transition-colors last:border-b-0 hover:bg-[#F8FAF8] dark:border-white/5 dark:hover:bg-white/5"
                >
                  <p className="text-sm font-semibold text-[#111827] dark:text-white">{n.title}</p>
                  <p className="mt-0.5 text-xs text-[#6B7280]">{n.body}</p>
                  <p className="mt-1 text-[11px] text-[#9CA3AF]">{relativeTime(n.createdAt)}</p>
                </Link>
              ))
            )}
          </div>

          <div className="flex items-center justify-between border-t border-[#E5E7EB] px-4 py-3 dark:border-white/10">
            <span className="text-xs text-[#6B7280]">
              {pushState === "unsupported"
                ? "Push not supported here"
                : pushState === "on"
                  ? "Push notifications on"
                  : "Push notifications off"}
            </span>
            <button
              type="button"
              onClick={togglePush}
              disabled={pushState === "unsupported" || pushState === "busy"}
              className="text-xs font-semibold text-[#22C55E] hover:underline disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline"
            >
              {pushState === "on" ? "Turn off" : "Turn on"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
