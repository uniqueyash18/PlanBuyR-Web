'use client'
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { useGenericQuery } from '@/hooks/useQuery';

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

interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface PostsResponse {
  success: boolean;
  message: string;
  data: {
    posts: Post[];
    pagination: PaginationMeta;
  };
}

export default function CategoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const page = searchParams.get('page') || '1';
  const id = params.id as string;

  // Fetch posts for the category
  const { data: postsData, isLoading } = useGenericQuery<PostsResponse>(
    ['category-posts', id, page],
    `/api/public/postsbycategory/${id}?page=${page}&limit=10`,
  );

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">Loading posts...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">{postsData?.data.posts[0]?.categoryId?.name || 'Category'}</h1>
        
        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {postsData?.data.posts.map((post) => (
            <Link
              key={post._id}
              href={`/user/plans/${post._id}`}
              className="block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden group"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={post.logoUrl || '/placeholder-image.jpg'}
                  alt={post.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.name}</h2>
                <p className="text-gray-600 line-clamp-2">{post.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {postsData?.data.pagination && (
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={() => handlePageChange(Number(page) - 1)}
              disabled={!postsData.data.pagination.hasPreviousPage}
              className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Previous
            </button>
            
            <span className="text-gray-600">
              Page {page} of {postsData.data.pagination.totalPages}
            </span>
            
            <button
              onClick={() => handlePageChange(Number(page) + 1)}
              disabled={!postsData.data.pagination.hasNextPage}
              className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
} 