'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addFolder } from '@/lib/actions/add-folder';

export function CreateFolderButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="border px-2 py-1 rounded bg-white"
      >
        + Folder
      </button>
      {open && (
        <form
          className="fixed inset-0 flex items-center justify-center bg-black/40"
          onSubmit={async (e) => {
            e.preventDefault();
            const trimmed = name.trim();
            if (trimmed) {
              try {
                await addFolder('root', trimmed);
                router.refresh();
              } catch (error) {
                console.error('Error creating folder:', error);
              }
            }
            setOpen(false);
            setName('');
          }}
        >
          <div className="bg-white p-4 rounded space-y-2">
            <input
              autoFocus
              name="name"
              className="border p-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex gap-2 justify-end">
              <button type="submit" className="border px-2 py-1 rounded">
                Create
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="border px-2 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
