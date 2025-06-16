"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGenericQuery } from "@/hooks/useQuery";
import { deleteData } from "@/hooks/apiService";
import { showError, showSuccess } from "@/utils/helperFunctions";

interface Banner {
  _id: string;
  title: string;
  imageUrl: string;
  linkType: 'category' | 'plan';
  linkedCategoryId?: {
    _id: string;
    name: string;
  };
  linkedPlanId?: {
    _id: string;
    name: string;
  };
}

interface BannersResponse {
  success: boolean;
  message: string;
  data: Banner[];
}

export default function BannersTable() {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Fetch banners
  const { data: bannersData, isLoading, refetch } = useGenericQuery<BannersResponse>(
    ["banners"],
    "/api/banners"
  );

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
        setIsDeleting(id);
        await deleteData(`/api/banners/${id}`);
        showSuccess("Banner deleted successfully");
        refetch(); // Refresh the banners list
      } catch (error) {
        console.error("Error deleting banner:", error);
        showError("Error deleting banner");
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const getLinkedToText = (banner: Banner) => {
    if (banner.linkType === 'category' && banner.linkedCategoryId) {
      return `Category: ${banner.linkedCategoryId.name}`;
    } else if (banner.linkType === 'plan' && banner.linkedPlanId) {
      return `Plan: ${banner.linkedPlanId.name}`;
    }
    return 'Not linked';
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading banners...</div>;
  }

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Image Preview</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Linked To</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {bannersData?.data.map((banner) => (
            <tr key={banner._id}>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">
                {banner.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-28 h-16 relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">
                {getLinkedToText(banner)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                <Link href={`/admin/banners/create?id=${banner._id}`}>
                  <button className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">Edit</button>
                </Link>
                <button
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm disabled:opacity-50"
                  onClick={() => handleDelete(banner._id)}
                  disabled={isDeleting === banner._id}
                >
                  {isDeleting === banner._id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 