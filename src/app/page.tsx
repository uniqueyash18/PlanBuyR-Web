'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import requestNotificationPermission from '@/utils/firebase';
import { useGenericQuery } from '@/hooks/useQuery';

interface Banner {
  _id: string;
  title: string;
  imageUrl: string;
  linkType: 'category' | 'plan';
  linkedCategoryId?: {
    _id: string;
    name: string;
  };
  linkedPlanId?: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Category {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Plan {
  _id: string;
  postId: {
    _id: string;
    name: string;
    categoryId: {
      _id: string;
      name: string;
    };
    logoUrl: string;
  };
  duration: string;
  price: number;
  features: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Pagination {
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

interface HomeData {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    banners: {
      count: number;
      data: Banner[];
    };
    categories: {
      count: number;
      data: Category[];
    };
    latestPlans: {
      data: Plan[];
      pagination: Pagination;
    };
  };
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: homeData, isLoading } = useGenericQuery<HomeData>(['home'], '/api/public/home', {});

  useEffect(() => {
    requestNotificationPermission();
  }, []);
  // Auto-advance carousel
  useEffect(() => {
      if (!homeData?.data?.banners?.data?.length) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % homeData.data.banners.data.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [homeData?.data?.banners?.data?.length]);

  const nextSlide = () => {
    if (!homeData?.data?.banners?.data?.length) return;
    setCurrentSlide((prev) => (prev + 1) % homeData.data.banners.data.length);
  };

  const prevSlide = () => {
    if (!homeData?.data?.banners?.data?.length) return;
    setCurrentSlide((prev) => (prev - 1 + homeData.data.banners.data.length) % homeData.data.banners.data.length);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section with Carousel */}
      {homeData?.data?.banners?.data?.length && (
        <section className="relative h-[300px] w-full overflow-hidden">
          {homeData?.data?.banners?.data?.map((banner, index) => (
            <div
              key={banner._id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="relative h-full w-full">
                <Image
                  src={banner.imageUrl}
                  alt={banner.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            </div>
          ))}

          {/* Carousel Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {homeData?.data?.banners?.data?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </section>
      )}

      {/* Subscription Categories Section */}
      {homeData?.data?.categories?.data?.length && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 lg:bg-gray-50 dark:bg-black ">
          <div className="mx-auto ">
            <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
            {/* Mobile: 2 rows, Desktop: 1 scrollable row */}
            <div className="block sm:hidden">
              <div className="grid grid-cols-3 gap-y-10 gap-x-4 justify-items-center">
                {homeData?.data?.categories?.data?.map((category) => (
                  <Link
                    key={category._id}
                    href={`/user/categories/${category.slug}`}
                    className="flex flex-col items-center group focus:outline-none"
                    tabIndex={0}
                  >
                    <div className="w-24 h-24 rounded-full bg-gray-200 shadow-lg flex items-center justify-center overflow-hidden mb-3 border-4 border-gray-300 group-hover:scale-105 group-hover:shadow-xl transition-all relative">
                      <Image
                        src={category.imageUrl}
                        alt={category.name}
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          if (e.currentTarget.parentNode) {
                            e.currentTarget.style.display = 'none';
                            const fallback = document.createElement('div');
                            fallback.className = 'absolute inset-0 flex items-center justify-center text-gray-400';
                            fallback.innerHTML = `<svg width='40' height='40' fill='none' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10' stroke='#d1d5db' strokeWidth='2'/><path d='M8 12h8M12 8v8' stroke='#d1d5db' strokeWidth='2' strokeLinecap='round'/></svg>`;
                            e.currentTarget.parentNode.appendChild(fallback);
                          }
                        }}
                      />
                    </div>
                    <div className="text-center w-24">
                      <h3 className="text-sm font-bold text-gray-900 leading-tight break-words">
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="w-full flex justify-center">
                <div className="flex gap-8 overflow-x-auto scrollbar-hide pb-2 px-2 max-w-5xl">
                  {homeData?.data?.categories?.data?.map((category) => (
                    <Link
                      key={category._id}
                      href={`/user/categories/${category.slug}`}
                      className="flex flex-col items-center group focus:outline-none flex-shrink-0"
                      tabIndex={0}
                      style={{ minWidth: '120px' }}
                    >
                      <div className="w-28 h-28 rounded-full bg-gray-200 shadow-lg flex items-center justify-center overflow-hidden mb-3 border-4 border-gray-300 group-hover:scale-105 group-hover:shadow-xl transition-all relative">
                        <Image
                          src={category.imageUrl}
                          alt={category.name}
                          width={112}
                          height={112}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            if (e.currentTarget.parentNode) {
                              e.currentTarget.style.display = 'none';
                              const fallback = document.createElement('div');
                              fallback.className = 'absolute inset-0 flex items-center justify-center text-gray-400';
                              fallback.innerHTML = `<svg width='48' height='48' fill='none' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10' stroke='#d1d5db' strokeWidth='2'/><path d='M8 12h8M12 8v8' stroke='#d1d5db' strokeWidth='2' strokeLinecap='round'/></svg>`;
                              e.currentTarget.parentNode.appendChild(fallback);
                            }
                          }}
                        />
                      </div>
                      <div className="text-center w-28">
                        <h3 className="text-base font-bold text-gray-900 leading-tight break-words">
                          {category.name}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Plans Section */}
      {homeData?.data?.latestPlans?.data?.length && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {homeData?.data?.latestPlans?.data?.map((plan) => (
                <div
                  key={plan._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={plan.postId.logoUrl}
                      alt={plan.postId.name}
                      fill
                      className="object-stretch"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{plan.postId.name}</h3>
                    <div className="flex items-baseline mb-6">
                      <span className="text-2xl font-bold text-gray-900">₹{plan.price}</span>
                      <span className="text-gray-500 ml-1">/{plan.duration}</span>
                    </div>
                    <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                      View Plans
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
