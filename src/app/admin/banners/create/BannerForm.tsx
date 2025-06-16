"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import usePostData from "@/hooks/usePostData";
import { useGenericQuery } from "@/hooks/useQuery";
import { showError, showSuccess } from "@/utils/helperFunctions";

interface Banner {
  _id: string;
  title: string;
  imageUrl: string;
  linkType: 'category' | 'plan';
  linkedCategoryId?: string;
  linkedPlanId?: string;
}

interface Category {
  _id: string;
  name: string;
}

interface Plan {
  _id: string;
  name: string;
}

export default function BannerForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bannerId = searchParams.get("id");
  const [title, setTitle] = useState("");
  const [linkType, setLinkType] = useState<'category' | 'plan'>('category');
  const [linkedCategoryId, setLinkedCategoryId] = useState("");
  const [linkedPlanId, setLinkedPlanId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Fetch banner data if editing
  const { data: bannerData } = useGenericQuery<{ data: Banner }>(
    ["banner", bannerId || ""],
    bannerId ? `/api/banners/${bannerId}` : "",
    {},
    {
      enabled: !!bannerId,
    }
  );

  // Fetch categories and plans for dropdowns
  const { data: categoriesData } = useGenericQuery<{ data: Category[] }>(
    ["categories"],
    "/api/categories"
  );

  const { data: plansData } = useGenericQuery<{ data: Plan[] }>(
    ["plans"],
    "/api/plans"
  );

  // Create/Update mutation
  const { mutate: saveBanner, isLoading } = usePostData<Banner, Error, FormData>(
    bannerId ? `/api/banners/${bannerId}` : "/api/banners",
    {
      onSuccess: () => {
        router.push("/admin/banners");
        showSuccess("Banner saved successfully");
      },
      onError: (error: any) => {
        console.error("Error saving banner:", error);
        showError("Error saving banner");
      },
    }
  );

  // Populate form if editing
  useEffect(() => {
    if (bannerData?.data) {
      setTitle(bannerData.data.title);
      setLinkType(bannerData.data.linkType);
      setLinkedCategoryId(bannerData.data.linkedCategoryId || "");
      setLinkedPlanId(bannerData.data.linkedPlanId || "");
      setPreviewUrl(bannerData.data.imageUrl);
    }
  }, [bannerData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("linkType", linkType);
    
    if (linkType === 'category' && linkedCategoryId) {
      formData.append("linkedCategoryId", linkedCategoryId);
    } else if (linkType === 'plan' && linkedPlanId) {
      formData.append("linkedPlanId", linkedPlanId);
    }

    if (image) {
      formData.append("image", image);
    }

    saveBanner(formData);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-8">{bannerId ? "Edit Banner" : "Add New Banner"}</h1>
      <form className="space-y-6 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Link Type</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={linkType}
            onChange={(e) => setLinkType(e.target.value as 'category' | 'plan')}
            required
          >
            <option value="category">Category</option>
            <option value="plan">Plan</option>
          </select>
        </div>
        {linkType === 'category' ? (
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Category</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={linkedCategoryId}
              onChange={(e) => setLinkedCategoryId(e.target.value)}
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
        ) : (
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Plan</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={linkedPlanId}
              onChange={(e) => setLinkedPlanId(e.target.value)}
              required
            >
              <option value="">Select a plan</option>
              {plansData?.data.map((plan:any) => (
                <option key={plan._id} value={plan._id}>
                  {`${plan?.postId?.name} - ${plan?.duration}` || plan?.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Banner Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            onChange={handleImageChange}
            required={!bannerId}
          />
          {previewUrl && (
            <div className="mt-2 w-48 h-24 relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <img
                src={previewUrl}
                alt="Banner preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        <div className="flex gap-4 justify-end pt-4">
          <button
            type="button"
            className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={() => router.push("/admin/banners")}
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