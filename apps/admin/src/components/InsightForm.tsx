'use client'

import { saveInsight, deleteInsight } from '../app/dashboard/insights/actions'
import { MediaUpload } from './MediaUpload'

export function InsightForm({ insight }: { insight?: any }) {
  return (
    <form action={saveInsight} className="space-y-8 max-w-3xl">
      {insight?.id && <input type="hidden" name="id" value={insight.id} />}
      
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input 
              name="title" 
              defaultValue={insight?.title}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Slug</label>
            <input 
              name="slug" 
              defaultValue={insight?.slug}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
          <select 
            name="state" 
            defaultValue={insight?.state || 'draft'}
            className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Cover Image</label>
          <MediaUpload folder="creatiancy/insights" onUpload={(result) => {
            console.log('Uploaded image', result)
            // In a real implementation, you would store result.public_id or result.secure_url in a hidden field
            // or update the component state to show a preview.
          }} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors shadow-sm"
        >
          {insight?.id ? 'Update Insight' : 'Create Insight'}
        </button>

        {insight?.id && (
          <button
            type="button"
            onClick={() => {
              if(confirm('Are you sure you want to delete this insight?')) {
                deleteInsight(insight.id)
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
