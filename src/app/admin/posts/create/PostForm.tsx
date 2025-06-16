"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import usePostData from "@/hooks/usePostData";
import { useGenericQuery } from "@/hooks/useQuery";
import { showError, showSuccess } from "@/utils/helperFunctions";

interface Post {
  _id: string;
  name: string;
  description: string;
  logoUrl?: string;
  categoryId: string;
}

interface Category {
  _id: string;
  name: string;
}

export default function PostForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [logo, setLogo] = useState<File | null>(null);

  // Fetch post data if editing
  const { data: postData } = useGenericQuery<{ data: Post }>(
    ["post", postId || ""],
    postId ? `/api/posts/${postId}` : "",
    {},
    {
      enabled: !!postId,
    }
  );

  // Fetch categories for dropdown
  const { data: categoriesData } = useGenericQuery<{ data: Category[] }>(
    ["categories"],
    "/api/categories"
  );

  // Create/Update mutation
  const { mutate: savePost, isLoading } = usePostData<Post, Error, FormData>(
    postId ? `/api/posts/${postId}` : "/api/posts",
    {
      onSuccess: () => {
        router.push("/admin/posts");
        showSuccess("Post saved successfully");
      },
      onError: (error: any) => {
        console.error("Error saving post:", error);
        showError("Error saving post");
      },
    }
  );

  // Populate form if editing
  useEffect(() => {
    if (postData?.data) {
      setName(postData.data.name);
      setDescription(postData.data.description);
      setCategoryId(postData.data.categoryId);
    }
  }, [postData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    if (logo) {
      formData.append("logo", logo);
    }

    savePost(formData);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-8">{postId ? "Edit Post" : "Add New Post"}</h1>
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
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Category</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categoriesData?.data.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
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
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Logo Upload</label>
          <input
            type="file"
            accept="image/*"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            onChange={(e) => setLogo(e.target.files?.[0] || null)}
          />
        </div>
        <div className="flex gap-4 justify-end pt-4">
          <button
            type="button"
            className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={() => router.push("/admin/posts")}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </>
  );
} 