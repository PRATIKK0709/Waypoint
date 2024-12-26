import { MapPin, Share2, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] dark:bg-[#070B14] relative overflow-hidden">
      {/* Gradient overlays */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 dark:from-indigo-500/10 dark:to-blue-500/10"></div>
        <div className="absolute inset-0 grid-background"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="p-3 rounded-2xl bg-indigo-500/10">
              <Compass className="h-12 w-12 text-indigo-400" />
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6">
            Way<span className="text-indigo-400">point</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-12">
            Share your location instantly, with style.
          </p>

          <Link
            to="/share"
            className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-xl text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 transform transition-all hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <MapPin className="mr-2 h-5 w-5" />
            Share Location
          </Link>
        </div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="glass-morphism rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Simple. Fast. Secure.
            </h2>
            <ul className="space-y-4">
              {[
                'No sign-up required',
                'Instant sharing with a unique link',
                'Works on all devices',
                'Privacy-focused design'
              ].map((feature) => (
                <li key={feature} className="flex items-center text-gray-300">
                  <div className="h-2 w-2 rounded-full bg-indigo-500 mr-3"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-blue-500/30 rounded-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-300"></div>
            <img
              src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&q=80"
              alt="Map Preview"
              className="rounded-2xl shadow-2xl relative transform -rotate-3 group-hover:rotate-0 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}