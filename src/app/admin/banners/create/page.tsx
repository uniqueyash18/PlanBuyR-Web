"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  { id: 1, name: "OTT Streaming" },
  { id: 2, name: "E-Learning" },
];
const plans = [
  { id: 1, name: "Netflix Standard" },
  { id: 2, name: "SonyLiv Premium" },
];

export default function BannerFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [linkType, setLinkType] = useState("Category");
  const [categoryId, setCategoryId] = useState(categories[0].id);
  const [planId, setPlanId] = useState(plans[0].id);

  // If editing, you could fetch and populate fields here using searchParams.get('id')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle save logic
    router.push("/admin/banners");
  };

  return (
    <main className="max-w-lg mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-8">{searchParams.get("id") ? "Edit Banner" : "Add New Banner"}</h1>
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
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Image Upload</label>
          <input
            type="file"
            accept="image/*"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Link Type</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={linkType}
            onChange={(e) => setLinkType(e.target.value)}
          >
            <option value="Category">Category</option>
            <option value="Plan">Plan</option>
          </select>
        </div>
        {linkType === "Category" ? (
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Category</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Plan</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={planId}
              onChange={(e) => setPlanId(Number(e.target.value))}
            >
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>{plan.name}</option>
              ))}
            </select>
          </div>
        )}
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
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </main>
  );
} 