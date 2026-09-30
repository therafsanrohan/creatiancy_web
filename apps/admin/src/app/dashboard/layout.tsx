import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, LogOut, Briefcase, FileText, Settings, Users, MessageSquare } from 'lucide-react'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-zinc-800 flex-shrink-0 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-zinc-800">
          <span className="font-bold text-lg tracking-tight">Creatiancy</span>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 text-sm font-medium transition-colors">
            <LayoutDashboard className="w-4 h-4" />
            Overview
          </Link>
          <Link href="/dashboard/inquiries" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 text-sm font-medium transition-colors">
            <MessageSquare className="w-4 h-4" />
            Inquiries
          </Link>
          <Link href="/dashboard/projects" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 text-sm font-medium transition-colors">
            <Briefcase className="w-4 h-4" />
            Projects
          </Link>
          <Link href="/dashboard/insights" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 text-sm font-medium transition-colors">
            <FileText className="w-4 h-4" />
            Insights
          </Link>
          <Link href="/dashboard/users" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 text-sm font-medium transition-colors">
            <Users className="w-4 h-4" />
            Users
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 text-sm font-medium transition-colors mb-2">
            <Settings className="w-4 h-4" />
            Settings
          </Link>
          <form action="/auth/signout" method="post">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-medium transition-colors">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-black border-b border-gray-200 dark:border-zinc-800 flex-shrink-0">
          <h1 className="font-semibold text-lg">Dashboard</h1>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <span className="hidden sm:block text-zinc-600 dark:text-zinc-400">{user.email}</span>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
