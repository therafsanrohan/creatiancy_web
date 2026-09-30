import { createClient } from '@/utils/supabase/server'
import { formatDistanceToNow } from 'date-fns'

export default async function InquiriesPage() {
  const supabase = await createClient()

  const { data: inquiries } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Inquiries</h2>
          <p className="text-zinc-500 dark:text-zinc-400">Manage incoming project leads and contact requests.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-zinc-950/50 text-gray-500 dark:text-zinc-400 border-b border-gray-200 dark:border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Project Type</th>
                <th className="px-6 py-4 font-medium">Budget</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
              {inquiries?.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-gray-50 dark:hover:bg-zinc-950/30 transition-colors">
                  <td className="px-6 py-4 font-medium">
                    {inquiry.name}
                    {inquiry.company && <span className="block text-xs font-normal text-zinc-500">{inquiry.company}</span>}
                  </td>
                  <td className="px-6 py-4 text-zinc-500">
                    <a href={`mailto:${inquiry.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">{inquiry.email}</a>
                  </td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">
                    {inquiry.project_type}
                  </td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">
                    {inquiry.estimated_budget}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${inquiry.status === 'New' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : 
                        inquiry.status === 'Contacted' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-300'}`}
                    >
                      {inquiry.status || 'New'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-500 text-xs">
                    {formatDistanceToNow(new Date(inquiry.created_at), { addSuffix: true })}
                  </td>
                </tr>
              ))}
              
              {(!inquiries || inquiries.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                    No inquiries found. When someone fills out the contact form, it will appear here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
