import { createClient } from '@/utils/supabase/server'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

export default async function ProjectsPage() {
  const supabase = await createClient()

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-zinc-500 dark:text-zinc-400">Manage case studies and portfolio work.</p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-zinc-950/50 text-gray-500 dark:text-zinc-400 border-b border-gray-200 dark:border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium w-16">Order</th>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Last Updated</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
              {projects?.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-zinc-950/30 transition-colors">
                  <td className="px-6 py-4 text-zinc-500">
                    {project.sort_order}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {project.title}
                    <span className="block text-xs font-normal text-zinc-500">/{project.slug}</span>
                  </td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">
                    {project.client || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${project.publish_state === 'published' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 
                        project.publish_state === 'draft' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-300'}`}
                    >
                      {project.publish_state}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-500 text-xs">
                    {formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/dashboard/projects/${project.id}`} className="text-blue-600 dark:text-blue-400 font-medium hover:underline text-xs">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              
              {(!projects || projects.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                    No projects found. Click "New Project" to create one.
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
