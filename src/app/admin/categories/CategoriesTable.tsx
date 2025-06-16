"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGenericQuery } from "@/hooks/useQuery";
import axios from "axios";
import { deleteData } from "@/hooks/apiService";

interface Category {
  _id: string;
  name: string;
  description: string;
  image?: string;
}

interface CategoriesResponse {
  success: boolean;
  message: string;
  data: Category[];
}

export default function CategoriesTable() {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Fetch categories
  const { data: categoriesData, isLoading, refetch } = useGenericQuery<CategoriesResponse>(
    ["categories"],
    "/api/categories"
  );

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        setIsDeleting(id);
        await deleteData(`/api/categories/${id}`);
        refetch(); // Refresh the categories list
      } catch (error) {
        console.error("Error deleting category:", error);
      } finally {
        setIsDeleting(null);
      }
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading categories...</div>;
  }

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-20">Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-48">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider max-w-[300px]">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-32">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {categoriesData?.data.map((cat:any) => (
            <tr key={cat._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${cat?.imageUrl}`}
                    alt={cat?.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">{cat.name}</td>
              <td className="px-6 py-4 text-gray-700 dark:text-gray-200">
                <div className="max-w-[300px] truncate" title={cat.description}>
                  {cat.description}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                <Link href={`/admin/categories/create?id=${cat._id}`}>
                  <button className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">Edit</button>
                </Link>
                <button
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm disabled:opacity-50"
                  onClick={() => handleDelete(cat._id)}
                  disabled={isDeleting === cat._id}
                >
                  {isDeleting === cat._id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 