import Image from 'next/image';

interface PlanPageProps {
  params: { postId: string };
}

// Placeholder data for services
const serviceData: Record<string, {
  name: string;
  image: string;
  description: string;
  plans: { label: string; price: string; }[];
}> = {
  sonyliv: {
    name: 'SonyLiv',
    image: '/placeholder-sonyliv.jpg',
    description: 'SonyLiv Premium gives you access to the latest movies, TV shows, live sports, and more in HD quality. Enjoy ad-free streaming and exclusive content.',
    plans: [
      { label: '1 Month', price: '₹299' },
      { label: '3 Months', price: '₹749' },
      { label: '12 Months', price: '₹1499' },
    ],
  },
  netflix: {
    name: 'Netflix',
    image: '/placeholder-netflix.jpg',
    description: 'Netflix offers unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime. Enjoy exclusive Netflix Originals and more.',
    plans: [
      { label: '1 Month', price: '₹499' },
      { label: '3 Months', price: '₹1399' },
      { label: '12 Months', price: '₹5999' },
    ],
  },
  hotstar: {
    name: 'Hotstar',
    image: '/placeholder-hotstar.jpg',
    description: 'Hotstar brings you live sports, Indian and international TV shows, movies, and more. Stream on any device with a single subscription.',
    plans: [
      { label: '1 Month', price: '₹299' },
      { label: '12 Months', price: '₹1499' },
    ],
  },
  // Add more services as needed
};

export default function PlanPage({ params }: PlanPageProps) {
  const { postId } = params;
  const service = serviceData[postId] || {
    name: 'Unknown Service',
    image: '/placeholder-generic.jpg',
    description: 'No description available.',
    plans: [],
  };

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg mb-4 bg-gray-100">
            <Image
              src={service.image}
              alt={service.name}
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-center">{service.name}</h1>
          <p className="text-gray-600 text-center max-w-xl">{service.description}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-center">Available Plans</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {service.plans.length > 0 ? (
              service.plans.map((plan, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center">
                  <div className="text-lg font-semibold mb-2">{plan.label}</div>
                  <div className="text-2xl font-bold text-indigo-600 mb-4">{plan.price}</div>
                  <button className="mt-auto bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors w-full">Select Plan</button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400">No plans available.</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 