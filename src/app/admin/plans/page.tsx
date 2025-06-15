import Link from "next/link";

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
      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Service Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {plans.map((plan) => (
              <tr key={plan.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">{plan.service}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{plan.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{plan.price}</td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <Link href={`/admin/plans/create?id=${plan.id}`}>
                    <button className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">Edit</button>
                  </Link>
                  <button className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
} 