"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import usePostData from "@/hooks/usePostData";
import { useGenericQuery } from "@/hooks/useQuery";
import { showError, showSuccess } from "@/utils/helperFunctions";

interface Plan {
  _id: string;
  postId: string;
  duration: string;
  price: number;
  comparePrice: number;
  features: string[];
}

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

export default function PlanForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get("id");
  const [postId, setPostId] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [comparePrice, setComparePrice] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);

  // Fetch plan data if editing
  const { data: planData } = useGenericQuery<{ data: Plan }>(
    ["plan", planId || ""],
    planId ? `/api/plans/${planId}` : "",
    {},
    {
      enabled: !!planId,
    }
  );

  // Fetch posts for dropdown
  const { data: postsData } = useGenericQuery<{ data: Post[] }>(
    ["posts"],
    "/api/posts"
  );

  // Create/Update mutation
  const { mutate: savePlan, isLoading } = usePostData<Plan, Error, any>(
    planId ? `/api/plans/${planId}` : "/api/plans",
    {
      onSuccess: () => {
        router.push("/admin/plans");
        showSuccess("Plan saved successfully");
      },
      onError: (error: any) => {
        console.error("Error saving plan:", error);
        showError("Error saving plan");
      },
    }
  );

  // Populate form if editing
  useEffect(() => {
    if (planData?.data) {
      setPostId(planData.data.postId);
      setDuration(planData.data.duration);
      setPrice(planData.data.price.toString());
      setComparePrice(planData.data.comparePrice?.toString() || "");
      setFeatures(planData.data.features);
    }
  }, [planData]);

  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const planData = {
      postId,
      duration,
      price: price,
      comparePrice: comparePrice,
      features: features.filter(feature => feature.trim() !== "")
    };

    savePlan(planData);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-8">{planId ? "Edit Plan" : "Add New Plan"}</h1>
      <form className="space-y-6 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Service</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
            required
          >
            <option value="">Select a service</option>
            {postsData?.data.map((post) => (
              <option key={post._id} value={post._id}>
                {post.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Duration</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g., 1 Month, 12 Months"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Selling Price (₹)</label>
          <input
            type="number"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">MRP Price (₹)</label>
          <input
            type="number"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={comparePrice}
            onChange={(e) => setComparePrice(e.target.value)}
            placeholder="Original price before discount"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Features</label>
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder="Enter feature"
                />
                {features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="px-3 py-2 text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddFeature}
              className="mt-2 px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              + Add Feature
            </button>
          </div>
        </div>
        <div className="flex gap-4 justify-end pt-4">
          <button
            type="button"
            className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={() => router.push("/admin/plans")}
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