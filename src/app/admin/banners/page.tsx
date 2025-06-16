import Link from "next/link";
import BannersTable from "./BannersTable";

export default function BannersPage() {
  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Banners</h1>
        <Link href="/admin/banners/create">
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
            Add New Banner
          </button>
        </Link>
      </div>
      <BannersTable />
    </main>
  );
} 