'use client';

import Image from 'next/image';
import React from 'react';
import { useGenericQuery } from '@/hooks/useQuery';
import { useParams, useSearchParams } from 'next/navigation';

interface Plan {
  _id: string;
  price: number;
  comparePrice: number;
  duration: string;
  features: string[];
  postId: {
    _id: string;
    name: string;
    description: string;
    logoUrl?: string;
  };
}

interface PaginationMeta {
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

interface PlansResponse {
  success: boolean;
  message: string;
  data: {
    plans: Plan[];
    pagination: PaginationMeta;
  };
}

interface PlanPageProps {
  params: { postId: string };
}

export default function PlanPage() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const params = useParams();
  const postId = params.postId as string;

  // Fetch post and plans data
  const { data: plansData, isLoading } = useGenericQuery<PlansResponse>(
    ['post-plans', postId, currentPage.toString()],
    `/api/public/posts/${postId}/plans?page=${currentPage.toString()}&limit=10`
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">Loading plans...</div>
        </div>
      </main>
    );
  }

  const post = plansData?.data.plans[0]?.postId;

  if (!post) {
    return (
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center text-red-600">Post not found</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg mb-4 bg-gray-100">
            <Image
              src={post?.logoUrl || '/default-product-image.png'}
              alt={post?.name}
              width={128}
              height={128}
              className="object-stretch w-full h-full"
            />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-center">{post?.name}</h1>
          <p className="text-gray-600 text-center max-w-xl">{post?.description}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-center">Available Plans</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {plansData?.data.plans.length > 0 ? (
              plansData.data.plans.map((plan) => (
                <div key={plan?._id} className="bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center relative overflow-hidden">
                  {plan?.comparePrice && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                      {Math.round(((plan?.comparePrice - plan?.price) / plan?.comparePrice) * 100)}% OFF
                    </div>
                  )}
                  <div className="text-lg font-semibold mb-2">{plan?.duration}</div>
                  <div className="flex items-baseline mb-1">
                    <span className="text-2xl font-bold text-indigo-600">₹{plan?.price}</span>
                    {plan?.comparePrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">₹{plan?.comparePrice}</span>
                    )}
                  </div>
                  {plan?.features && plan?.features?.length > 0 && (
                    <ul className="text-gray-600 mb-4 space-y-2">
                      {plan?.features?.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  <a
                    href={`https://wa.me/919289781262?text=Hi, I'm interested in the ${plan?.duration} plan for ${post?.name} at ₹${plan?.price}. Can you please provide more details?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors w-full text-center"
                  >
                    Select Plan
                  </a>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400">No plans available.</div>
            )}
          </div>

          {/* Pagination */}
          {plansData?.data.pagination &&
            plansData?.data.pagination?.totalPages > 1 &&
            currentPage < plansData?.data.pagination?.totalPages && (
              <div className="flex justify-center items-center space-x-4 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Previous
                </button>

                <span className="text-gray-600">
                  Page {currentPage} of {plansData?.data.pagination?.totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === plansData?.data.pagination?.totalPages}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Next
                </button>
              </div>
            )}
        </div>
      </div>
    </main>
  );
} 