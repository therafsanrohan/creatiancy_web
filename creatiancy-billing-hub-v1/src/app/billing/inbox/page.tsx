'use client';

import { useState, useEffect, useCallback } from 'react';
import { db, Profile, SystemNotification } from '@/lib/db';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import Link from 'next/link';
import {
  Mail, Send, AlertOctagon, Info, CheckCircle2, User,
  Clock, Trash2, ShieldAlert, FileText, ExternalLink,
  Sparkles, CreditCard, Landmark, UserPlus, Bell, RefreshCw,
  CheckCheck, Filter, Search, Inbox
} from 'lucide-react';
import NotificationModal from '@/components/NotificationModal';

export default function TeamInboxPage() {
  const [notifications, setNotifications] = useState<SystemNotification[]>([]);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [selectedNotif, setSelectedNotif] = useState<SystemNotification | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterTab, setFilterTab] = useState<'all' | 'unread' | 'emergency' | 'broadcast'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Compose broadcast states
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<SystemNotification['category']>('broadcast');
  const [targetRole, setTargetRole] = useState<string>('all');
  const [sending, setSending] = useState(false);

  // Generic Notification Modal
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
  }>({ isOpen: false, type: 'info', title: '', message: '' });

  const showModal = (title: string, message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setModalState({ isOpen: true, title, message, type });
  };

  const loadInboxData = useCallback(async () => {
    try {
      const u = await db.getCurrentUser();
      setCurrentUser(u);
      if (u) {
        const list = await db.getSystemNotifications(u.role_name, u.id);
        setNotifications(list);
      }
    } catch (err) {
      console.error('Error loading notifications:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInboxData();

    // Supabase Realtime Cross-Device Synchronization
    if (isSupabaseConfigured && supabase) {
      const client = supabase;
      const channel = client
        .channel('inbox_notifications_realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'system_notifications' },
          () => {
            loadInboxData();
          }
        )
        .subscribe();

      return () => {
        client.removeChannel(channel);
      };
    }
  }, [loadInboxData]);

  const handleSelectNotif = async (notif: SystemNotification) => {
    setSelectedNotif(notif);
    if (currentUser && !notif.read_by?.includes(currentUser.id)) {
      await db.markNotificationRead(notif.id, currentUser.id);
      await loadInboxData();
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!currentUser) return;
    try {
      await db.markAllNotificationsRead(currentUser.id, currentUser.role_name);
      await loadInboxData();
      showModal('Marked Read', 'All inbox notifications marked as read.', 'success');
    } catch (err) {
      showModal('Error', 'Failed to mark notifications as read.', 'error');
    }
  };

  const handleClearSingleNotif = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await db.deleteNotification(id);
      if (selectedNotif?.id === id) {
        setSelectedNotif(null);
      }
      await loadInboxData();
      showModal('Cleared', 'Notification removed from inbox.', 'success');
    } catch (err) {
      showModal('Error', 'Failed to clear notification.', 'error');
    }
  };

  const handleClearAll = async () => {
    if (!confirm('Are you sure you want to clear notifications from your inbox?')) return;
    try {
      await db.clearAllNotifications(currentUser?.role_name, currentUser?.id);
      setSelectedNotif(null);
      await loadInboxData();
      showModal('Cleared All', 'Inbox notifications cleared successfully.', 'success');
    } catch (err) {
      showModal('Error', 'Failed to clear notifications.', 'error');
    }
  };

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      showModal('Validation Error', 'Title and message fields are required.', 'error');
      return;
    }
    setSending(true);

    try {
      await db.notifyAction({
        sender_name: currentUser?.full_name || 'System Admin',
        sender_role: currentUser?.role_name || 'Super Admin',
        title: title.trim(),
        message: message.trim(),
        category,
        target_roles: targetRole === 'all' ? ['Super Admin', 'Finance Admin', 'Client Service', 'Project Manager'] : [targetRole]
      });

      setTitle('');
      setMessage('');
      setCategory('broadcast');
      await loadInboxData();
      showModal('Broadcast Sent', 'Your communication announcement has been published.', 'success');
    } catch (err) {
      showModal('Broadcast Failed', 'Failed to publish communication.', 'error');
    } finally {
      setSending(false);
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
      case 'emergency': return <AlertOctagon className="h-4 w-4 text-[#9B1C22]" />;
      default: return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  // Filtering notifications
  const filteredNotifications = notifications.filter(n => {
    const isRead = currentUser ? n.read_by?.includes(currentUser.id) : false;
    if (filterTab === 'unread' && isRead) return false;
    if (filterTab === 'emergency' && n.category !== 'emergency') return false;
    if (filterTab === 'broadcast' && n.category !== 'broadcast') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = n.title.toLowerCase().includes(q);
      const matchMsg = n.message.toLowerCase().includes(q);
      const matchSender = n.sender_name.toLowerCase().includes(q);
      return matchTitle || matchMsg || matchSender;
    }
    return true;
  });

  const unreadCount = currentUser ? notifications.filter(n => !n.read_by?.includes(currentUser.id)).length : 0;
  const emergencyCount = notifications.filter(n => n.category === 'emergency').length;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">Role-Based Smart Inbox</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Real-time cross-device system notifications, approval alerts, and broadcast communications
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllAsRead}
              className="flex items-center space-x-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 hover:bg-emerald-100 transition cursor-pointer"
            >
              <CheckCheck className="h-4 w-4" />
              <span>Mark All Read</span>
            </button>
          )}

          {notifications.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="flex items-center space-x-1.5 text-xs font-semibold text-rose-700 hover:text-rose-900 border border-rose-200 bg-rose-50/50 rounded-xl px-3 py-2 hover:bg-rose-100 transition cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear Inbox</span>
            </button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 flex items-center space-x-3.5 shadow-2xs">
          <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 shrink-0">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Total Inbox Activity</span>
            <p className="text-2xl font-black text-gray-900">{notifications.length}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#9B1C22]/20 bg-[#9B1C22]/5 p-4 flex items-center space-x-3.5 shadow-2xs">
          <div className="h-10 w-10 rounded-xl bg-[#9B1C22]/10 flex items-center justify-center text-[#9B1C22] shrink-0">
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#9B1C22] block tracking-wider">Unread Action Alerts</span>
            <p className="text-2xl font-black text-[#9B1C22]">{unreadCount}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 flex items-center space-x-3.5 shadow-2xs">
          <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
            <AlertOctagon className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-800 block tracking-wider">High Priority Alerts</span>
            <p className="text-2xl font-black text-amber-900">{emergencyCount}</p>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Notification List & Filters */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Notification List Container */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4 shadow-2xs">
            {/* Filter Tabs & Search Bar */}
            <div className="space-y-3 border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-gray-900 flex items-center space-x-2">
                  <Bell className="h-4 w-4 text-[#9B1C22]" />
                  <span>Activity Feed</span>
                </h3>
                <span className="text-[11px] text-gray-400 font-semibold">Role: {currentUser?.role_name || 'User'}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between">
                {/* Tabs */}
                <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-semibold text-gray-600 overflow-x-auto no-scrollbar">
                  <button
                    onClick={() => setFilterTab('all')}
                    className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer ${
                      filterTab === 'all' ? 'bg-white text-gray-900 font-bold shadow-2xs' : 'hover:text-gray-900'
                    }`}
                  >
                    All ({notifications.length})
                  </button>
                  <button
                    onClick={() => setFilterTab('unread')}
                    className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer ${
                      filterTab === 'unread' ? 'bg-white text-[#9B1C22] font-bold shadow-2xs' : 'hover:text-gray-900'
                    }`}
                  >
                    Unread ({unreadCount})
                  </button>
                  <button
                    onClick={() => setFilterTab('emergency')}
                    className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer ${
                      filterTab === 'emergency' ? 'bg-white text-rose-700 font-bold shadow-2xs' : 'hover:text-gray-900'
                    }`}
                  >
                    High Priority
                  </button>
                  <button
                    onClick={() => setFilterTab('broadcast')}
                    className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer ${
                      filterTab === 'broadcast' ? 'bg-white text-indigo-700 font-bold shadow-2xs' : 'hover:text-gray-900'
                    }`}
                  >
                    Broadcasts
                  </button>
                </div>

                {/* Search */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-gray-400">
                    <Search className="h-3.5 w-3.5" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search inbox..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-36 rounded-xl border border-gray-200 bg-white py-1.5 pl-8 pr-2.5 text-xs focus:border-[#9B1C22] focus:outline-none"
                  />
                </div>
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-12 text-xs text-gray-400">
                Loading PostgreSQL inbox activity...
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className="text-center py-12 text-xs text-gray-400 space-y-2">
                <Inbox className="h-8 w-8 mx-auto text-gray-300" />
                <p className="font-semibold text-gray-700">No notifications found in this view.</p>
                <p className="text-[11px] text-gray-400">Real-time alerts will display here automatically.</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                {filteredNotifications.map((notif) => {
                  const isSelected = selectedNotif?.id === notif.id;
                  const isRead = currentUser ? notif.read_by?.includes(currentUser.id) : false;

                  return (
                    <div
                      key={notif.id}
                      onClick={() => handleSelectNotif(notif)}
                      className={`p-3.5 rounded-2xl border transition cursor-pointer flex gap-3 justify-between items-start ${
                        isSelected ? 'ring-2 ring-[#9B1C22]/20 border-[#9B1C22]' : 'border-gray-200 hover:bg-gray-50/80'
                      } ${!isRead ? 'bg-[#9B1C22]/3 border-[#9B1C22]/30' : 'bg-white'}`}
                    >
                      <div className="flex items-start space-x-3 min-w-0 flex-1">
                        <div className="mt-0.5 p-2 rounded-xl bg-gray-50 border border-gray-100 shrink-0">
                          {getCategoryIcon(notif.category)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center space-x-2">
                            {!isRead && (
                              <span className="w-2 h-2 rounded-full bg-[#9B1C22] shrink-0" />
                            )}
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                              {notif.sender_name} ({notif.sender_role})
                            </span>
                          </div>
                          <h4 className="text-xs font-extrabold text-gray-900 mt-0.5 truncate">{notif.title}</h4>
                          <p className="text-[11px] text-gray-600 mt-0.5 truncate font-normal">{notif.message}</p>
                          
                          {notif.link_url && (
                            <Link
                              href={notif.link_url}
                              className="inline-flex items-center space-x-1 text-[11px] font-bold text-[#9B1C22] hover:underline mt-1.5"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>View Document</span>
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="text-[9px] text-gray-400 font-mono">
                          {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleClearSingleNotif(notif.id, e)}
                          className="text-gray-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                          title="Remove notification"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Broadcast/Compose Form for Management Roles */}
          {currentUser && (currentUser.role_name === 'Super Admin' || currentUser.role_name === 'Admin' || currentUser.role_name === 'Finance Admin') && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4 shadow-2xs">
              <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-3 flex items-center space-x-2">
                <Send className="h-4 w-4 text-[#9B1C22]" />
                <span>Broadcast System Announcement</span>
              </h3>

              <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Announcement Header</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. End of Month Financial Reconciliation Notice"
                      className="block w-full rounded-xl border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:border-[#9B1C22] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Target Roles</label>
                    <select
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="block w-full rounded-xl border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:border-[#9B1C22] focus:outline-none cursor-pointer font-semibold"
                    >
                      <option value="all">All Organization Roles</option>
                      <option value="Super Admin">Super Admin Only</option>
                      <option value="Finance Admin">Finance Admin Only</option>
                      <option value="Client Service">Client Service Only</option>
                      <option value="Project Manager">Project Managers Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Announcement Message Body</label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details regarding operational rules, billing audits, or policy updates..."
                    className="block w-full rounded-xl border border-gray-200 bg-white py-2.5 px-3 text-xs text-[#1E1E1E] focus:border-[#9B1C22] focus:outline-none resize-y"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={sending}
                    className="flex items-center space-x-2 rounded-xl bg-[#9B1C22] py-2 px-5 font-bold text-white hover:bg-[#7d1219] shadow-md cursor-pointer transition disabled:opacity-50"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Publish Broadcast</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Right Side: Notification Detail Inspector */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 min-h-[340px] flex flex-col justify-between shadow-2xs">
            {selectedNotif ? (
              <div className="space-y-5">
                
                {/* Meta details */}
                <div className="border-b border-gray-100 pb-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-2 rounded-xl bg-gray-50 border border-gray-100 text-gray-700">
                        {getCategoryIcon(selectedNotif.category)}
                      </div>
                      <div>
                        <span className="font-extrabold text-gray-900 text-xs block">{selectedNotif.sender_name}</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase">{selectedNotif.sender_role}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleClearSingleNotif(selectedNotif.id, e)}
                      className="text-gray-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                      title="Clear Notification"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-mono">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{new Date(selectedNotif.timestamp).toLocaleString()}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h4 className="font-extrabold text-sm text-gray-900 leading-snug">{selectedNotif.title}</h4>
                  
                  <div className="text-xs text-gray-700 leading-relaxed bg-gray-50/80 p-4 rounded-xl border border-gray-200 whitespace-pre-wrap font-normal">
                    {selectedNotif.message}
                  </div>
                </div>

                {/* Direct Action Link */}
                {selectedNotif.link_url && (
                  <div className="pt-2">
                    <Link
                      href={selectedNotif.link_url}
                      className="w-full flex items-center justify-center space-x-2 rounded-xl bg-[#9B1C22] py-2.5 px-4 font-bold text-white text-xs hover:bg-[#7d1219] shadow-sm transition"
                    >
                      <span>Open Associated Document</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                )}

                {selectedNotif.category === 'emergency' && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-3 flex items-start space-x-2.5 text-[11px] text-rose-900 font-medium">
                    <ShieldAlert className="h-4 w-4 shrink-0 text-[#9B1C22] mt-0.5" />
                    <span>High priority security announcement. Follow organizational compliance procedures immediately.</span>
                  </div>
                )}

              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-20 text-gray-400 space-y-2">
                <Mail className="h-10 w-10 text-gray-300" />
                <p className="text-xs font-semibold text-gray-700">Select any notification to inspect details</p>
                <p className="text-[11px] text-gray-400">Direct links allow instant document navigation</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={modalState.isOpen}
        type={modalState.type}
        title={modalState.title}
        message={modalState.message}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
      />

    </div>
  );
}
