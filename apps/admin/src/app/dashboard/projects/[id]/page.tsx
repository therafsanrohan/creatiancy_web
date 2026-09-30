import { ProjectForm } from '@/components/ProjectForm'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const supabase = await createClient()
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/projects" className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-zinc-500" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Project</h2>
          <p className="text-zinc-500 dark:text-zinc-400">Update the case study details.</p>
        </div>
      </div>

      <ProjectForm project={project} />
    </div>
  )
}
