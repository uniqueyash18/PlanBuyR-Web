"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const services = [
  { id: 1, name: "Netflix" },
  { id: 2, name: "SonyLiv" },
];

export default function PlanForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [serviceId, setServiceId] = useState(services[0].id);
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle save logic
    router.push("/admin/plans");
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-8">{searchParams.get("id") ? "Edit Plan" : "Add New Plan"}</h1>
      <form className="space-y-6 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Subscription Service</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={serviceId}
            onChange={(e) => setServiceId(Number(e.target.value))}
          >
            {services.map((service) => (
              <option key={service.id} value={service.id}>{service.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Duration</label>
          <input
            type="text"
            placeholder="e.g. 1 Month, 3 Months, 12 Months"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Price</label>
          <input
            type="text"
            placeholder="e.g. ₹499"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Features</label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            rows={4}
            placeholder="List features, one per line"
          />
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
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
} 