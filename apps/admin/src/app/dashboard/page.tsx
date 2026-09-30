import { createClient } from '@/utils/supabase/server'
import { MessageSquare, Briefcase, FileText } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  // Fetch quick stats
  const { count: inquiriesCount } = await supabase
    .from('inquiries')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'New')

  const { count: projectsCount } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })

  const { count: insightsCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
        <p className="text-zinc-500 dark:text-zinc-400">Welcome to the Creatiancy administrative dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">New Inquiries</p>
              <h3 className="text-3xl font-bold">{inquiriesCount || 0}</h3>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/dashboard/inquiries" className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
              View all leads &rarr;
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Projects</p>
              <h3 className="text-3xl font-bold">{projectsCount || 0}</h3>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/dashboard/projects" className="text-sm text-purple-600 dark:text-purple-400 font-medium hover:underline">
              Manage portfolio &rarr;
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Insights Published</p>
              <h3 className="text-3xl font-bold">{insightsCount || 0}</h3>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/dashboard/insights" className="text-sm text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
              Write article &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
