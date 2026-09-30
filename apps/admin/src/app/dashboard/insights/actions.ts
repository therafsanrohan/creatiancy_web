'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function saveInsight(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string | null
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const state = formData.get('state') as string

  // Simple author assignment for demo purposes (usually linked to authenticated user)
  const { data: { user } } = await supabase.auth.getUser()
  const author_id = user?.id

  const payload = {
    title,
    slug,
    state,
    author_id
  }

  if (id) {
    const { error } = await supabase.from('posts').update(payload).eq('id', id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('posts').insert(payload)
    if (error) throw new Error(error.message)
  }

  revalidatePath('/dashboard/insights')
  redirect('/dashboard/insights')
}

export async function deleteInsight(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('posts').delete().eq('id', id)
  if (error) throw new Error(error.message)
  
  revalidatePath('/dashboard/insights')
  redirect('/dashboard/insights')
}
