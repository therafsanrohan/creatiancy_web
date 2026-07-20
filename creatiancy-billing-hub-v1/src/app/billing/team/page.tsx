'use client';

import { useState, useEffect } from 'react';
import { db, Profile, AuditLog } from '@/lib/db';
import { Shield, Users, Terminal, UserCog } from 'lucide-react';

export default function TeamManagementPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeamData() {
      try {
        const u = await db.getCurrentUser();
        setCurrentUser(u);

        const list = await db.getProfiles();
        setProfiles(list);

        if (u && u.role_name === 'Super Admin') {
          const logs = await db.getAuditLogs();
          setAuditLogs(logs);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadTeamData();
  }, []);

  const handleRoleChange = async (userId: string, newRole: Profile['role_name']) => {
    if (!currentUser || currentUser.role_name !== 'Super Admin') {
      alert('Only Super Admins can manage user roles.');
      return;
    }

    if (userId === currentUser.id) {
      alert('You cannot change your own role. Switch roles via Sandbox Mode at top of layout!');
      return;
    }

    try {
      // Fetch target profile
      const list = [...profiles];
      const idx = list.findIndex(p => p.id === userId);
      if (idx !== -1) {
        const oldRole = list[idx].role_name;
        list[idx].role_name = newRole;
        
        // Update localStore
        if (typeof window !== 'undefined') {
          localStorage.setItem('billing_hub_profiles', JSON.stringify(list));
        }
        setProfiles(list);

        // Record Audit log
        db.logAudit(
          currentUser.id,
          'change_user_role',
          'users',
          userId,
          { role: oldRole },
          { role: newRole }
        );

        // Refresh log list
        const logs = await db.getAuditLogs();
        setAuditLogs(logs);

        alert(`User role updated successfully to ${newRole}`);
      }
    } catch (err) {
      alert('Role update failed.');
    }
  };

  if (loading || !currentUser) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#9B1C22] border-t-transparent" />
      </div>
    );
  }

  const isSuperAdmin = currentUser.role_name === 'Super Admin';

  if (!isSuperAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4 text-center">
        <Shield className="h-12 w-12 text-[#9B1C22]" />
        <h1 className="text-xl font-bold text-gray-850">Access Denied</h1>
        <p className="text-xs text-gray-400 max-w-sm">Access to Team Management & Access Controls requires Super Admin credentials.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Team Management & Access Controls</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review authorized personnel profiles and monitor transactional audit trails
        </p>
      </div>

      {/* Grid: Profiles List left, Audit log right */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Team Members List (Left/Col-5) */}
        <div className="xl:col-span-5 bg-white border border-gray-100 rounded-2xl p-6 space-y-6">
          <h3 className="font-bold text-md flex items-center space-x-2 border-b border-gray-50 pb-3">
            <Users className="h-4.5 w-4.5 text-[#9B1C22]" />
            <span>Authorized Team Accounts</span>
          </h3>

          <div className="space-y-4">
            {profiles.map((p) => {
              const isSelf = p.id === currentUser.id;
              return (
                <div key={p.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-sm text-gray-850 flex items-center gap-1.5">
                        <span>{p.full_name}</span>
                        {isSelf && (
                          <span className="text-[9px] uppercase font-bold text-[#9B1C22] bg-red-50 border border-red-100 rounded px-1.5">
                            You
                          </span>
                        )}
                      </span>
                      <span className="text-xs text-gray-450 block mt-0.5">{p.email}</span>
                    </div>
                  </div>

                  {/* Role Selector (Disabled if not Super Admin) */}
                  <div className="flex items-center justify-between text-xs pt-2.5 border-t border-gray-100">
                    <span className="text-gray-400 font-semibold uppercase tracking-wider text-[9px] flex items-center space-x-1">
                      <UserCog className="h-3.5 w-3.5" />
                      <span>Security Role</span>
                    </span>

                    {isSuperAdmin && !isSelf ? (
                      <select
                        value={p.role_name}
                        onChange={(e) => handleRoleChange(p.id, e.target.value as any)}
                        className="rounded border border-gray-200 bg-white py-1 px-2 text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
                      >
                        <option value="Super Admin">Super Admin</option>
                        <option value="Finance Admin">Finance Admin</option>
                        <option value="Client Service">Client Service</option>
                        <option value="Project Manager">Project Manager</option>
                      </select>
                    ) : (
                      <span className="font-bold text-gray-750">{p.role_name}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Audit Trail Log (Right/Col-7) */}
        <div className="xl:col-span-7 bg-white border border-gray-100 rounded-2xl p-6 space-y-6">
          <h3 className="font-bold text-md flex items-center space-x-2 border-b border-gray-50 pb-3">
            <Terminal className="h-4.5 w-4.5 text-[#9B1C22]" />
            <span>Cryptographic Transaction Audit Trail</span>
          </h3>

          {!isSuperAdmin ? (
            <div className="rounded-xl bg-red-50/50 p-6 border border-red-50 text-center text-xs text-[#9B1C22]">
              <Shield className="h-8 w-8 mx-auto text-[#9B1C22] mb-2" />
              <span>Permission Denied: Access to billing audit logs requires Super Admin privileges.</span>
            </div>
          ) : auditLogs.length === 0 ? (
            <div className="text-center py-8 text-sm text-gray-400">No actions recorded in audit log yet.</div>
          ) : (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {auditLogs.map((log) => {
                const operator = profiles.find(pr => pr.id === log.user_id)?.full_name || 'System';
                return (
                  <div key={log.id} className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-[11px] leading-relaxed space-y-1">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-850 uppercase tracking-wider font-mono text-[9px] bg-gray-200 px-1.5 rounded">{log.action}</span>
                      <span className="text-gray-400 font-normal">{log.timestamp.replace('T', ' ').substring(0, 19)}</span>
                    </div>
                    
                    <p className="text-gray-600">
                      Operator: <span className="font-bold">{operator}</span> • Module: <span className="font-semibold">{log.module}</span> (ID: {log.record_id})
                    </p>

                    {log.new_value && (
                      <div className="text-[10px] bg-white border border-gray-100 rounded p-2 mt-1 font-mono overflow-x-auto max-w-full">
                        <span className="text-gray-400 font-semibold block text-[8px] uppercase">State Mutation</span>
                        {JSON.stringify(log.new_value)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
