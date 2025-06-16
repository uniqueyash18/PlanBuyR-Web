import Link from "next/link";
import CategoriesTable from "./CategoriesTable";

export default function CategoriesPage() {
  return (
    <main className="mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link href="/admin/categories/create">
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
            Add New Category
          </button>
        </Link>
      </div>
      <CategoriesTable />
    </main>
  );
} 