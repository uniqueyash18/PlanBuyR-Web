"use client";

import { useState } from "react";
import Link from "next/link";
import { useGenericQuery } from "@/hooks/useQuery";
import { deleteData } from "@/hooks/apiService";
import { showError, showSuccess } from "@/utils/helperFunctions";

interface Plan {
  _id: string;
  duration: string;
  price: number;
  features: string[];
  postId: {
    _id: string;
    name: string;
    description: string;
    logoUrl?: string;
    categoryId: {
      _id: string;
      name: string;
    };
  };
}

interface PlansResponse {
  success: boolean;
  message: string;
  data: Plan[];
}

export default function PlansTable() {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Fetch plans
  const { data: plansData, isLoading, refetch } = useGenericQuery<PlansResponse>(
    ["plans"],
    "/api/plans"
  );

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        setIsDeleting(id);
        await deleteData(`/api/plans/${id}`);
        showSuccess("Plan deleted successfully");
        refetch(); // Refresh the plans list
      } catch (error) {
        console.error("Error deleting plan:", error);
        showError("Error deleting plan");
      } finally {
        setIsDeleting(null);
      }
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading plans...</div>;
  }

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Service Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Duration</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Features</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {plansData?.data.map((plan) => (
            <tr key={plan._id}>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">
                {plan.postId.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">
                {plan.duration}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">
                ₹{plan.price}
              </td>
              <td className="px-6 py-4 text-gray-700 dark:text-gray-200">
                <div className="max-w-[300px]">
                  <ul className="list-disc list-inside">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="truncate" title={feature}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                <Link href={`/admin/plans/create?id=${plan._id}`}>
                  <button className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">Edit</button>
                </Link>
                <button
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm disabled:opacity-50"
                  onClick={() => handleDelete(plan._id)}
                  disabled={isDeleting === plan._id}
                >
                  {isDeleting === plan._id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 