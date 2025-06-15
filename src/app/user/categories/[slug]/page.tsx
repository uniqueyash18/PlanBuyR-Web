import Link from 'next/link';
import Image from 'next/image';

interface CategoryPageProps {
  params: { slug: string };
}

// Placeholder data for subscription services
const services = [
  { id: 'netflix', name: 'Netflix', image: '/placeholder-netflix.jpg' },
  { id: 'hotstar', name: 'Hotstar', image: '/placeholder-hotstar.jpg' },
  { id: 'sonyliv', name: 'SonyLiv', image: '/placeholder-sonyliv.jpg' },
  { id: 'zee5', name: 'Zee5', image: '/placeholder-zee5.jpg' },
  { id: 'prime', name: 'Prime Video', image: '/placeholder-prime.jpg' },
  { id: 'hulu', name: 'Hulu', image: '/placeholder-hulu.jpg' },
];

export default function CategoryPage({ params }: CategoryPageProps) {
  // Convert slug to readable category name
  const categoryName = params.slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">{categoryName}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/user/plans/${service.id}`}
              className="block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden group"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 text-center">
                <h2 className="text-xl font-semibold text-gray-900">{service.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
} 