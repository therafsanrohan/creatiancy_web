'use client';

import { useState, useEffect } from 'react';
import { db, Profile } from '@/lib/db';
import {
  Mail, Send, AlertOctagon, Info, CheckCircle2, User,
  Clock, Trash2, ShieldAlert
} from 'lucide-react';
import NotificationModal from '@/components/NotificationModal';

interface TeamMessage {
  id: string;
  senderName: string;
  senderRole: string;
  subject: string;
  content: string;
  type: 'emergency' | 'info' | 'success';
  timestamp: string;
  isRead: boolean;
}

const DEFAULT_MESSAGES: TeamMessage[] = [
  {
    id: 'msg-1',
    senderName: 'Rafsan Rohan',
    senderRole: 'Super Admin',
    subject: '🚨 EMERGENCY: Standardize Security Rules immediately',
    content: 'Team, please ensure all password creations strictly adhere to the new 12-character alphanumeric complexity standard. Do not whitelist any weak passwords to protect our financial databases.',
    type: 'emergency',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    isRead: false
  },
  {
    id: 'msg-2',
    senderName: 'Finance Executive',
    senderRole: 'Finance Admin',
    subject: 'Custom Gateway rates successfully live',
    content: 'Custom platform cutoff fees can now be set dynamically under Gateway Rates setting page. The dashboard has been upgraded to track these auto-deductions in real-time.',
    type: 'success',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    isRead: true
  },
  {
    id: 'msg-3',
    senderName: 'System Auditor',
    senderRole: 'System',
    subject: 'Cryptographic Audit Trail active',
    content: 'All state mutations (invoice creation, voiding, role modifications) are now logged cryptographically. Super Admins can export these logs from the Team page.',
    type: 'info',
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    isRead: true
  }
];

export default function TeamInboxPage() {
  const [messages, setMessages] = useState<TeamMessage[]>([]);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<TeamMessage | null>(null);
  
  // Compose form states
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [msgType, setMsgType] = useState<'emergency' | 'info' | 'success'>('info');
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

  useEffect(() => {
    async function initInbox() {
      const u = await db.getCurrentUser();
      setCurrentUser(u);

      const stored = localStorage.getItem('creatiancy_team_inbox');
      if (stored) {
        setMessages(JSON.parse(stored));
      } else {
        localStorage.setItem('creatiancy_team_inbox', JSON.stringify(DEFAULT_MESSAGES));
        setMessages(DEFAULT_MESSAGES);
      }
    }
    initInbox();
  }, []);

  const saveMessages = (updated: TeamMessage[]) => {
    setMessages(updated);
    localStorage.setItem('creatiancy_team_inbox', JSON.stringify(updated));
  };

  const handleSelectMessage = (msg: TeamMessage) => {
    setSelectedMessage(msg);
    const updated = messages.map(m => m.id === msg.id ? { ...m, isRead: true } : m);
    saveMessages(updated);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !content.trim()) {
      showModal('Validation Failed', 'Subject and content fields are required.', 'error');
      return;
    }
    setSending(true);

    try {
      const newMsg: TeamMessage = {
        id: `msg-${Date.now()}`,
        senderName: currentUser?.full_name || 'Anonymous',
        senderRole: currentUser?.role_name || 'Team Member',
        subject: subject.trim(),
        content: content.trim(),
        type: msgType,
        timestamp: new Date().toISOString(),
        isRead: false
      };

      const updated = [newMsg, ...messages];
      saveMessages(updated);
      setSubject('');
      setContent('');
      setMsgType('info');
      showModal('Broadcast Sent', 'Your team communication has been successfully published.', 'success');
    } catch (err) {
      showModal('Broadcast Failed', 'Failed to publish communication.', 'error');
    } finally {
      setSending(false);
    }
  };

  const [deletingMessageId, setDeletingMessageId] = useState<string | null>(null);

  const requestDeleteMessage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingMessageId(id);
  };

  const confirmDeleteMessage = () => {
    if (!deletingMessageId) return;
    const updated = messages.filter(m => m.id !== deletingMessageId);
    saveMessages(updated);
    if (selectedMessage?.id === deletingMessageId) {
      setSelectedMessage(null);
    }
    setDeletingMessageId(null);
    showModal('Message Deleted', 'The message has been removed from your inbox.', 'success');
  };

  const unreadCount = messages.filter(m => !m.isRead).length;
  const emergenciesCount = messages.filter(m => m.type === 'emergency' && !m.isRead).length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Internal Team Inbox</h1>
        <p className="text-sm text-gray-500 mt-1">
          Broadcast critical alerts and coordinate emergency actions within the corporate team securely
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-150 bg-white p-4 flex items-center space-x-3.5 shadow-xs">
          <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Total Messages</span>
            <p className="text-2xl font-extrabold text-gray-800">{messages.length}</p>
          </div>
        </div>

        <div className="rounded-xl border border-[#9B1C22]/15 bg-[#9B1C22]/4 p-4 flex items-center space-x-3.5 shadow-xs">
          <div className="h-10 w-10 rounded-lg bg-[#9B1C22]/10 flex items-center justify-center text-[#9B1C22] shrink-0">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#9B1C22] block tracking-wider">Unread Communications</span>
            <p className="text-2xl font-extrabold text-[#9B1C22]">{unreadCount}</p>
          </div>
        </div>

        <div className="rounded-xl border border-amber-250 bg-amber-50/50 p-4 flex items-center space-x-3.5 shadow-xs">
          <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
            <AlertOctagon className="h-5 w-5 animate-bounce" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-700 block tracking-wider">Emergency Alerts</span>
            <p className="text-2xl font-extrabold text-amber-700">{emergenciesCount}</p>
          </div>
        </div>
      </div>

      {/* Interactive Main Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Messages list & Compose form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Message List */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-sm text-gray-800 border-b border-gray-50 pb-3">Received Communications</h3>
            
            {messages.length === 0 ? (
              <div className="text-center py-12 text-sm text-gray-400">
                <Mail className="h-8 w-8 mx-auto text-gray-200 mb-2" />
                <p>Your team inbox is empty.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
                {messages.map((msg) => {
                  const isSelected = selectedMessage?.id === msg.id;
                  const typeStyles = {
                    emergency: 'border-l-4 border-l-[#9B1C22] bg-red-50/30',
                    success: 'border-l-4 border-l-green-500 bg-green-50/10',
                    info: 'border-l-4 border-l-blue-500 bg-blue-50/10'
                  };

                  return (
                    <div
                      key={msg.id}
                      onClick={() => handleSelectMessage(msg)}
                      className={`p-4 rounded-xl border border-gray-150 transition cursor-pointer hover:bg-gray-50 flex gap-3 justify-between items-start ${
                        isSelected ? 'ring-2 ring-[#9B1C22]/20 border-[#9B1C22]/30' : ''
                      } ${typeStyles[msg.type]} ${!msg.isRead ? 'font-bold' : ''}`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          {!msg.isRead && (
                            <span className="w-2 h-2 rounded-full bg-[#9B1C22] shrink-0" />
                          )}
                          <span className="text-[10px] text-gray-400 uppercase font-semibold">
                            {msg.senderName} • {msg.senderRole}
                          </span>
                        </div>
                        <h4 className="text-xs text-gray-800 mt-1 truncate">{msg.subject}</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5 truncate font-normal">{msg.content}</p>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="text-[9px] text-gray-400 font-mono">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => requestDeleteMessage(msg.id, e)}
                          className="text-gray-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition"
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

          {/* Broadcast/Compose Form */}
          {currentUser && (currentUser.role_name === 'Super Admin' || currentUser.role_name === 'Admin' || currentUser.role_name === 'Finance Admin') && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-sm text-gray-800 border-b border-gray-50 pb-3 flex items-center space-x-2">
                <Send className="h-4 w-4 text-[#9B1C22]" />
                <span>Broadcast Team Communication</span>
              </h3>

              <form onSubmit={handleSendMessage} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Subject Header</label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Audit checklist update"
                      className="block w-full rounded-xl border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Communication Category</label>
                    <select
                      value={msgType}
                      onChange={(e) => setMsgType(e.target.value as any)}
                      className="block w-full rounded-xl border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none cursor-pointer font-semibold"
                    >
                      <option value="info">💡 Information Announcement</option>
                      <option value="success">🎉 Milestone Success Banner</option>
                      <option value="emergency">🚨 STRICT EMERGENCY ALERT</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Message Content</label>
                  <textarea
                    required
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter internal announcement body details..."
                    className="block w-full rounded-xl border border-gray-200 bg-white py-2.5 px-3 text-xs text-[#1E1E1E] focus:outline-none resize-y"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={sending}
                    className="flex items-center space-x-2 rounded-xl bg-[#9B1C22] py-2 px-5 font-bold text-white hover:bg-[#9B1C22]/90 shadow-md cursor-pointer transition disabled:opacity-50"
                  >
                    <span>Publish Broadcast</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Right Side: Message Detail Panel */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 min-h-[300px] flex flex-col justify-between">
            {selectedMessage ? (
              <div className="space-y-6">
                
                {/* Meta details */}
                <div className="border-b border-gray-150 pb-4 space-y-2">
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-800 block">{selectedMessage.senderName}</span>
                      <span className="text-[10px] text-gray-400 font-semibold">{selectedMessage.senderRole}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-mono pt-1">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(selectedMessage.timestamp).toLocaleString()}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-sm text-gray-800 leading-snug">{selectedMessage.subject}</h4>
                  
                  <div className="text-xs text-gray-650 leading-relaxed bg-gray-50/50 p-4 rounded-xl border border-gray-100 font-normal whitespace-pre-wrap">
                    {selectedMessage.content}
                  </div>
                </div>

                {selectedMessage.type === 'emergency' && (
                  <div className="rounded-xl border border-red-200 bg-red-50/40 p-3 flex items-start space-x-2.5 text-[10px] text-red-800 font-medium">
                    <ShieldAlert className="h-4 w-4 shrink-0 text-[#9B1C22]" />
                    <span>This represents a strict emergency announcement. Adhere to internal operational protocols immediately.</span>
                  </div>
                )}

              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-20 text-gray-400">
                <Mail className="h-10 w-10 text-gray-250 mb-3" />
                <p className="text-xs font-semibold">Select a team message to view details</p>
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
