'use client'

import { CldUploadWidget } from 'next-cloudinary'
import { ImagePlus } from 'lucide-react'

interface MediaUploadProps {
  onUpload: (result: any) => void;
  folder?: string;
}

export function MediaUpload({ onUpload, folder = 'creatiancy/projects' }: MediaUploadProps) {
  return (
    <CldUploadWidget 
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'default_preset'}
      options={{
        folder: folder,
        multiple: true,
      }}
      onSuccess={(result) => {
        if (result.info) {
          onUpload(result.info)
        }
      }}
    >
      {({ open }) => {
        return (
          <button
            type="button"
            onClick={() => open()}
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
          >
            <ImagePlus className="w-8 h-8 text-gray-400 dark:text-zinc-500 mb-2" />
            <span className="text-sm font-medium text-gray-600 dark:text-zinc-400">Click to upload media</span>
          </button>
        )
      }}
    </CldUploadWidget>
  )
}
