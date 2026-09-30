'use client'

import { saveProject, deleteProject } from '../app/dashboard/projects/actions'

export function ProjectForm({ project }: { project?: any }) {
  return (
    <form action={saveProject} className="space-y-8 max-w-3xl">
      {project?.id && <input type="hidden" name="id" value={project.id} />}
      
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input 
              name="title" 
              defaultValue={project?.title}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Slug</label>
            <input 
              name="slug" 
              defaultValue={project?.slug}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Client</label>
            <input 
              name="client" 
              defaultValue={project?.client}
              className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort Order</label>
            <input 
              name="sort_order"
              type="number" 
              defaultValue={project?.sort_order || 0}
              className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea 
            name="description" 
            defaultValue={project?.description}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
          <select 
            name="publish_state" 
            defaultValue={project?.publish_state || 'draft'}
            className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors shadow-sm"
        >
          {project?.id ? 'Update Project' : 'Create Project'}
        </button>

        {project?.id && (
          <button
            type="button"
            onClick={() => {
              if(confirm('Are you sure you want to delete this project?')) {
                deleteProject(project.id)
              }
            }}
            className="px-6 py-2.5 bg-white dark:bg-zinc-800 text-red-600 border border-gray-300 dark:border-zinc-700 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors shadow-sm"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  )
}
