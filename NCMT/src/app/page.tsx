'use client';

import SearchForm from '@/components/SearchForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="inline-block rounded-full border border-emerald-300/50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-100 mb-3">
            🚍 Smart Transit
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Your Daily Commute, Simplified
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-emerald-100">
            Find routes, compare fares, check availability, and track vehicles in real-time. All in one place.
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-10 pb-8 sm:pb-12">
        <div className="bg-white rounded-2xl p-5 sm:p-8 border-2 border-emerald-100 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Search Routes</h2>
          <SearchForm />
        </div>
      </div>

      {/* Info Section */}
      <div className="pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-emerald-100 shadow-sm">
              <h3 className="text-xl font-bold mb-2">Search</h3>
              <p className="text-gray-600">Enter your starting point and destination</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-emerald-100 shadow-sm">
              <h3 className="text-xl font-bold mb-2">View Routes</h3>
              <p className="text-gray-600">See available routes with fares and timing</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-emerald-100 shadow-sm">
              <h3 className="text-xl font-bold mb-2">Book Travel</h3>
              <p className="text-gray-600">Get on board with confidence</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
