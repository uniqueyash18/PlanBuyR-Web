import Link from "next/link";
import Image from "next/image";

// Placeholder post data
const posts = [
  { id: 1, name: "Netflix", category: "OTT Streaming", logo: "/placeholder-netflix.jpg" },
  { id: 2, name: "Udemy", category: "E-Learning", logo: "/placeholder-udemy.jpg" },
];

export default function PostsPage() {
  return (
    <main className="mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Subscription Services</h1>
        <Link href="/admin/posts/create">
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
            Add New Post
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Logo Preview</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">{post.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{post.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <Image src={post.logo} alt={post.name} fill className="object-cover" />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <Link href={`/admin/posts/create?id=${post.id}`}>
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