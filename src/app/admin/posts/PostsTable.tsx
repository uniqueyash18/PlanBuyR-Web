"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGenericQuery } from "@/hooks/useQuery";
import { deleteData } from "@/hooks/apiService";
import { showError, showSuccess } from "@/utils/helperFunctions";

interface Post {
  _id: string;
  name: string;
  description: string;
  logoUrl?: string;
  categoryId: {
    _id: string;
    name: string;
  };
}

interface PostsResponse {
  success: boolean;
  message: string;
  data: Post[];
}

export default function PostsTable() {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Fetch posts
  const { data: postsData, isLoading, refetch } = useGenericQuery<PostsResponse>(
    ["posts"],
    "/api/posts"
  );

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        setIsDeleting(id);
        await deleteData(`/api/posts/${id}`);
        showSuccess("Post deleted successfully");
        refetch(); // Refresh the posts list
      } catch (error) {
        console.error("Error deleting post:", error);
        showError("Error deleting post");
      } finally {
        setIsDeleting(null);
      }
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-20">Logo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-48">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider max-w-[300px]">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-32">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {postsData?.data.map((post) => (
            <tr key={post._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Image
                    src={post?.logoUrl || '/placeholder-image.jpg'}
                    alt={post?.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">{post?.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{post?.categoryId?.name}</td>
              <td className="px-6 py-4 text-gray-700 dark:text-gray-200">
                <div className="max-w-[300px] truncate" title={post?.description}>
                  {post?.description}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                <Link href={`/admin/posts/create?id=${post._id}`}>
                  <button className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">Edit</button>
                </Link>
                <button
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm disabled:opacity-50"
                  onClick={() => handleDelete(post._id)}
                  disabled={isDeleting === post._id}
                >
                  {isDeleting === post._id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 