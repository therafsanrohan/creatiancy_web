'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { db, Profile, SystemNotification } from '@/lib/db';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import Link from 'next/link';
import {
  Bell, CheckCheck, Trash2, ExternalLink, ShieldAlert,
  FileText, Clock, CheckCircle2, CreditCard, Landmark,
  UserPlus, AlertOctagon, X, Sparkles, Inbox
} from 'lucide-react';

interface Props {
  currentUser: Profile;
}

export default function HeaderNotificationCenter({ currentUser }: Props) {
  const router = useRouter();
  const [notifications, setNotifications] = useState<SystemNotification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const fetchNotifs = useCallback(async () => {
    try {
      const list = await db.getSystemNotifications(currentUser.role_name, currentUser.id);
      setNotifications(list);
    } catch (err) {
      console.error('Fetch notifs error:', err);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchNotifs();

    // Setup Supabase Realtime Subscription for instant cross-device notification sync
    if (isSupabaseConfigured && supabase) {
      const client = supabase;
      const channel = client
        .channel('system_notifications_realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'system_notifications' },
          () => {
            fetchNotifs();
          }
        )
        .subscribe();

      return () => {
        client.removeChannel(channel);
      };
    }
  }, [fetchNotifs]);

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const unreadList = notifications.filter(n => !n.read_by?.includes(currentUser.id));
  const unreadCount = unreadList.length;

  const handleMarkRead = async (notif: SystemNotification, e: React.MouseEvent) => {
    e.stopPropagation();
    await db.markNotificationRead(notif.id, currentUser.id);
    await fetchNotifs();
  };

  const handleMarkAllRead = async () => {
    setLoading(true);
    try {
      await db.markAllNotificationsRead(currentUser.id, currentUser.role_name);
      await fetchNotifs();
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = async (notif: SystemNotification) => {
    if (!notif.read_by?.includes(currentUser.id)) {
      await db.markNotificationRead(notif.id, currentUser.id);
      await fetchNotifs();
    }
    setIsOpen(false);
    if (notif.link_url) {
      router.push(notif.link_url);
    } else {
      router.push('/billing/inbox');
    }
  };

  const getCategoryIcon = (cat: SystemNotification['category']) => {
    switch (cat) {
      case 'invoice_created': return <FileText className="h-4 w-4 text-blue-600" />;
      case 'approval_required': return <Clock className="h-4 w-4 text-amber-600" />;
      case 'invoice_approved': return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
      case 'payment_recorded': return <CreditCard className="h-4 w-4 text-emerald-600" />;
      case 'tax_recorded': return <Landmark className="h-4 w-4 text-purple-600" />;
      case 'client_added': return <UserPlus className="h-4 w-4 text-indigo-600" />;
      case 'emergency': return <AlertOctagon className="h-4 w-4 text-rose-600" />;
      default: return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="relative" ref={popoverRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition cursor-pointer focus:outline-none"
        title="Notifications Center"
      >
        <Bell className="h-5 w-5 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#9B1C22] text-[10px] font-black text-white ring-2 ring-white animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Popover / Drawer Container */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-3xl bg-white border border-gray-200 shadow-2xl z-50 overflow-hidden space-y-0 text-xs">
          {/* Popover Header */}
          <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4 text-[#9B1C22]" />
              <span className="font-extrabold text-sm text-gray-900">Notifications</span>
              {unreadCount > 0 && (
                <span className="bg-[#9B1C22]/10 text-[#9B1C22] font-black px-2 py-0.5 rounded-full text-[10px]">
                  {unreadCount} New
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  disabled={loading}
                  className="text-[11px] font-bold text-[#9B1C22] hover:underline flex items-center space-x-1 cursor-pointer"
                >
                  <CheckCheck className="h-3.5 w-3.5" />
                  <span>Mark All Read</span>
                </button>
              )}
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Notification List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
            {notifications.length === 0 ? (
              <div className="py-10 text-center text-gray-400 space-y-2">
                <Inbox className="h-8 w-8 mx-auto text-gray-300" />
                <p className="font-semibold text-gray-600">No active notifications</p>
                <p className="text-[10px] text-gray-400">All system updates will appear here in real-time</p>
              </div>
            ) : (
              notifications.slice(0, 8).map((notif) => {
                const isRead = notif.read_by?.includes(currentUser.id);
                return (
                  <div
                    key={notif.id}
                    onClick={() => handleNotificationClick(notif)}
                    className={`p-3.5 flex items-start space-x-3 transition cursor-pointer hover:bg-gray-50/80 ${
                      !isRead ? 'bg-[#9B1C22]/3 font-semibold' : 'bg-white text-gray-600'
                    }`}
                  >
                    <div className="mt-0.5 p-2 rounded-xl bg-gray-50 border border-gray-100 shrink-0">
                      {getCategoryIcon(notif.category)}
                    </div>

                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[9px] font-extrabold uppercase text-gray-400 tracking-wider truncate">
                          {notif.sender_name}
                        </span>
                        <span className="text-[9px] text-gray-400 font-mono shrink-0">
                          {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-gray-900 truncate leading-snug">{notif.title}</h4>
                      <p className="text-[11px] text-gray-500 truncate leading-normal">{notif.message}</p>
                    </div>

                    {!isRead && (
                      <button
                        onClick={(e) => handleMarkRead(notif, e)}
                        className="p-1 text-[#9B1C22] hover:bg-[#9B1C22]/10 rounded-lg shrink-0"
                        title="Mark as read"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#9B1C22] block" />
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Popover Footer */}
          <div className="bg-gray-50/80 p-3 border-t border-gray-100 text-center">
            <Link
              href="/billing/inbox"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center space-x-1.5 text-xs font-extrabold text-[#9B1C22] hover:underline"
            >
              <span>Open Role Inbox</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
