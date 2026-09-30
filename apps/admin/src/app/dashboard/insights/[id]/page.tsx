import { InsightForm } from '@/components/InsightForm'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

export default async function EditInsightPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const supabase = await createClient()
  const { data: insight } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (!insight) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/insights" className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-zinc-500" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Insight</h2>
          <p className="text-zinc-500 dark:text-zinc-400">Update article details.</p>
        </div>
      </div>

      <InsightForm insight={insight} />
    </div>
  )
}
