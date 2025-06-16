import Link from "next/link";
import PlansTable from "./PlansTable";

// Placeholder plan data
const plans = [
  { id: 1, service: "Netflix", duration: "1 Month", price: "₹499" },
  { id: 2, service: "Netflix", duration: "12 Months", price: "₹5999" },
  { id: 3, service: "SonyLiv", duration: "3 Months", price: "₹749" },
];

export default function PlansPage() {
  return (
    <main className="mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Subscription Plans</h1>
        <Link href="/admin/plans/create">
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
            Add New Plan
          </button>
        </Link>
      </div>
      <PlansTable />
    </main>
  );
} 