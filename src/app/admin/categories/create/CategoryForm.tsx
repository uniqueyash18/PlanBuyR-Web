"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CategoryForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle save logic
    router.push("/admin/categories");
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-8">{searchParams.get("id") ? "Edit Category" : "Add New Category"}</h1>
      <form className="space-y-6 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Description</label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Image Upload</label>
          <input
            type="file"
            accept="image/*"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>
        <div className="flex gap-4 justify-end pt-4">
          <button
            type="button"
            className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={() => router.push("/admin/categories")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
} 