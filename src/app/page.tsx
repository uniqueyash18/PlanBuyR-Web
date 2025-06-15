'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import requestNotificationPermission from '@/utils/firebase';

// Hero carousel images
const heroImages = [
  'https://res.cloudinary.com/dhmw8d3ka/image/upload/f_auto,q_auto,fl_lossy/v1749825364/Banners/sonyliv_-_web_banner_1_e4lebe.webp',
  'https://res.cloudinary.com/dhmw8d3ka/image/upload/f_auto,q_auto,fl_lossy/v1749301572/Banners/zee5_-_web_banner_r81dma.webp',
  'https://res.cloudinary.com/dhmw8d3ka/image/upload/f_auto,q_auto,fl_lossy/v1749301576/Banners/Xbox_-_web_banner_endv3j.webp',
];

// Subscription categories
const categories = [
  { id: 1, name: 'OTT Streaming', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO0te_uZDDJmn0I0Qg-MC3c2u1TqlIf6dgrw&s', description: 'Entertainment & Movies' },
  { id: 2, name: 'E-Learning', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHWZQcnJnZsc5DMMeO3tOnDD2LshBrAb7itA&s', description: 'Education & Courses' },
  { id: 3, name: 'Music', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNoXyhqXQ08VPzKOFSij8terSAP0n1Wy6wCg&s', description: 'Streaming & Downloads' },
  { id: 4, name: 'Gaming', image: 'data:image/png;base64,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', description: 'Games & Subscriptions' },
  { id: 5, name: 'Fitness', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMHERMUBxIVFhMXFxgYGBgWFxUgHRkXGhsZGBocGR4fHzQgGBsoHRcaITEiJSkrLi4uGCAzODUtNygtLisBCgoKDg0OGxAQGzImICYtLi0rMi0rLi0uMCstLy0tLzY3Ni4tLS8vNjIwLSsuLTI1NS0tLS0tLSsvLi0vLTAtLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAQIEBQcIAQL/xABGEAABAwIDBAcEBAsHBQAAAAABAAIDBBEFEiEGMUFRBxMiMmFxgRRCkaEWYpKxFSMkM1JUcoLR4fAINFNzwdLxFyZEk6L/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIEBQMG/8QALREBAAIBAgQDCAIDAAAAAAAAAAECEQMSBCExQVFx8BNhgZGxwdHxIqEjMuH/2gAMAwEAAhEDEQA/ANNoiL1BERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERfUcZkNowSfAIPlFVfSvZ32H4Klu3qMpwIiKUCIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIPFJ8NlYxgEAA5klvz1usJhlMKp+V/In7v4rKvwt8P9xkt52+XJeWpMTyeunGObIvDCO1bXy1VtNhcc3D4FZnYvZE7QQl8tQWSZ3tByBw7Nt+oJ1vxVLaLZLEsDd+NiM8XCSna5wt9YDtM08La6ErxraJmYiej2tExETMdUdq8KZTNLrk8h4/FYRZrFuvpGtFbDLFnBy9YxzcwFgS0HgLgLDLRTOObPfHYREV1BERAREQEREBERAREQEREBERAREQEREBERAREQZTZdjJaqNtTq05+yb2c8McY2m2pDnhosN97cVI8UpQS0xMLGCofTygNyB1nNcwgN0BMZNy23uniovs/Te21dPG4XDpYwR9XMCfkCprt9Q1GEyU5rJQ9kmZwOUgl8eUNMutnOyv3gNBu7QXWTWn/JERPZq0f9JmY7p3URzYOxhw+nuywy5HBthytawH9WVHBukFrz1OJMkhqs1hGQ4h+tgWOyi414gcVe7NbUxY3TDMO2yzZGZrObfcWni08Dx8wQMbi+JwUMzS97IYw7tPcHOLr3aB2QS3UhxcRbS2utuXWuydsRz8+efo6Vp3Runp5csfVBOlHaaLaI0opb5ohKHEggHN1egJ32LHBQZS3pPrYq2tHsDmuYyJrQ5osCHPklFvDLI3XiFEl2tGMUiHH1ZzeZERF6vMREQEREBERAREQEREBERAREQEREBERAREQEXiu6Ona2SP8J52RE9ogdrLv7I8d3he6ieUZTEZlLui7Z6StqG1TxaGHM6599waRYeAJ1PPTnaT9JOHz4rTxSUjS4RXLhrcggat56C9t6yWD7YYfLCKfDXtj0yhr7tvplAGYAcdwupLs/Wtno4nSWLXAB4Pu+J8jp6Lj6mpedXfPLHi6tNOsaW2OefBoOgrnwkPonlj7WDhy5HmNN3gDvAWQwp9LHHI7GGTSy3GVjH5Q8Edpz3lpOa9+Px4XXSXgP0frM9IPxM13DkHg2e3w1IP7yjsVaHd7QrfEbq7q92PO2dtlvigaJX+zXyXOXNa+W5tmtpe1r2VqrmvkEjhk4DUq2WivRnt1kREVlRERAREQEREBERAREQEREBERAREQEREBF4p9sdsB+EWtmxfMGu7kQNi4c3HeBxsLHdrwXlq61dKu6z00tK2pOKrLYTYz8PnrcSkdDTNNg5oGeRw4R3FgAd7iDroATe2U2pwGGgJbgVQ+rANnxdW572fvxtyXH6LrHz3KS4vsrA1uSja9j22Y10ckgI1AIHa1aPHkVOcPwZlBGyGkaI42gCzRa5O/X+rrDXjb2mZr8m2eErWIi3zc4+yslJtpw8jxBB3HwKzuzuNz7P9iOz4b/mzpa51yH3edjpflvUx6SdkmgmooBaQD8YP02DeT9Zosb77AjgFAqZ+cFsm8f8AH36Lfp20+Jpi0ecM1q30L5rPlLZVPXU+1cWSXKdReOTQ3tltrpcjdrfsgjcoPtlslT4AyTLMeuzBzYh2iI9wB5A94udutlFzqbSPNEc0JLXDS7TY2PLmPqnRUq3EKiqszEJ3OhJGjWsaCRuD8rRfcN+mgXhXgr6V/wCFv4+f/Hrfia6lf515+vejs1OYTYhUlKg0aiQDX5hZPYVtLBV+z49BFLBUWaxz2tLo5Pds7vNDu7od5aea23jbGYY4jMoEi2T0g9HTMLY+p2eLjEz87C4lxjH6TTvczmDqN9yN2tl5UvF4zCbVms4kREV1RERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERB//2Q==', description: 'Health & Wellness' },
  { id: 6, name: 'News', image: 'data:image/png;base64,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', description: 'Digital Publications' },
  ];

// Featured plans
const featuredPlans = [
  {
    id: 1,
    name: 'SonyLiv Premium',
    description: 'Stream your favorite movies and TV shows in HD quality',
    image: '/placeholder-sonyliv.jpg',
    price: '₹299',
    period: 'month',
  },
  {
    id: 2,
    name: 'Netflix Standard',
    description: 'Unlimited movies, TV shows, and more',
    image: '/placeholder-netflix.jpg',
    price: '₹499',
    period: 'month',
  },
  {
    id: 3,
    name: 'Spotify Premium',
    description: 'Ad-free music streaming with offline downloads',
    image: '/placeholder-spotify.jpg',
    price: '₹119',
    period: 'month',
  },
  {
    id: 4,
    name: 'Udemy Pro',
    description: 'Access to thousands of online courses',
    image: '/placeholder-udemy.jpg',
    price: '₹999',
    period: 'year',
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative h-[300px] w-full overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative h-full w-full">
            <Image
                src={image}
                alt={`Hero image ${index + 1}`}
                fill
                className="object-contain"
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
          {heroImages.map((_, index) => (
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

      {/* Subscription Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className=" mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          {/* Mobile: 2 rows, Desktop: 1 scrollable row */}
          <div className="block sm:hidden">
            <div className="grid grid-cols-3 gap-y-10 gap-x-4 justify-items-center">
              {categories.map((category) => {
                const slug = category.name.toLowerCase().replace(/ /g, '-');
                return (
                  <Link
                    key={category.id}
                    href={`/user/categories/${slug}`}
                    className="flex flex-col items-center group focus:outline-none"
                    tabIndex={0}
                  >
                    <div className="w-24 h-24 rounded-full bg-gray-200 shadow-lg flex items-center justify-center overflow-hidden mb-3 border-4 border-gray-300 group-hover:scale-105 group-hover:shadow-xl transition-all relative">
          <Image
                        src={category.image}
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
                );
              })}
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="w-full flex justify-center">
              <div className="flex gap-8 overflow-x-auto scrollbar-hide pb-2 px-2 max-w-5xl">
                {categories.map((category) => {
                  const slug = category.name.toLowerCase().replace(/ /g, '-');
                  return (
                    <Link
                      key={category.id}
                      href={`/user/categories/${slug}`}
                      className="flex flex-col items-center group focus:outline-none flex-shrink-0"
                      tabIndex={0}
                      style={{ minWidth: '120px' }}
                    >
                      <div className="w-28 h-28 rounded-full bg-gray-200 shadow-lg flex items-center justify-center overflow-hidden mb-3 border-4 border-gray-300 group-hover:scale-105 group-hover:shadow-xl transition-all relative">
          <Image
                          src={category.image}
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
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Plans Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
          <Image
                    src={plan.image}
                    alt={plan.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline mb-6">
                    <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-1">/{plan.period}</span>
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
    </main>
  );
}
