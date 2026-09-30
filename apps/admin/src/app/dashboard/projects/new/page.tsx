import { ProjectForm } from '@/components/ProjectForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/projects" className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-zinc-500" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">New Project</h2>
          <p className="text-zinc-500 dark:text-zinc-400">Create a new case study for the portfolio.</p>
        </div>
      </div>

      <ProjectForm />
    </div>
  )
}
