'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function saveProject(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string | null
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const client = formData.get('client') as string
  const description = formData.get('description') as string
  const publish_state = formData.get('publish_state') as string
  const sort_order = parseInt(formData.get('sort_order') as string) || 0

  const payload = {
    title,
    slug,
    client,
    description,
    publish_state,
    sort_order,
    // Note: handling rich content / media / sections comes later 
    // or requires a specialized JSON editor component
  }

  if (id) {
    const { error } = await supabase.from('projects').update(payload).eq('id', id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('projects').insert(payload)
    if (error) throw new Error(error.message)
  }

  revalidatePath('/dashboard/projects')
  redirect('/dashboard/projects')
}

export async function deleteProject(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw new Error(error.message)
  
  revalidatePath('/dashboard/projects')
  redirect('/dashboard/projects')
}
