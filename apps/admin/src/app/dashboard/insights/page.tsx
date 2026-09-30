import { createClient } from '@/utils/supabase/server'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

export default async function InsightsPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Insights</h2>
          <p className="text-zinc-500 dark:text-zinc-400">Manage blog posts, articles, and company updates.</p>
        </div>
        <Link
          href="/dashboard/insights/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Insight
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-zinc-950/50 text-gray-500 dark:text-zinc-400 border-b border-gray-200 dark:border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">State</th>
                <th className="px-6 py-4 font-medium">Created Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
              {posts?.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-zinc-950/30 transition-colors">
                  <td className="px-6 py-4 font-medium">
                    {post.title}
                    <span className="block text-xs font-normal text-zinc-500">/{post.slug}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${post.state === 'published' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 
                        post.state === 'draft' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-300'}`}
                    >
                      {post.state}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-500 text-xs">
                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/dashboard/insights/${post.id}`} className="text-blue-600 dark:text-blue-400 font-medium hover:underline text-xs">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              
              {(!posts || posts.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                    No insights found. Click "New Insight" to create one.
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
