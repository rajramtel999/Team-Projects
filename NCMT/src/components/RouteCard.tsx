'use client';

import type { RouteSearchResult } from '@/types/searchResult';
import StopList from '@/components/StopList';
import FareDisplay from '@/components/FareDisplay';
import ETABadge from '@/components/ETABadge';
import AvailabilityChip from '@/components/AvailabilityChip';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
});

interface RouteCardProps {
  result: RouteSearchResult;
  rank: number;
}

export default function RouteCard({ result, rank }: RouteCardProps) {
  return (
    <article className="rounded-xl border border-emerald-100 bg-white shadow-sm overflow-hidden">
      {/* Header Section */}
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
              🚌 Route #{rank}
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 line-clamp-2">{result.routeName}</h2>
            <p className="text-xs sm:text-sm text-gray-600 capitalize mt-1">{result.transportType}</p>
          </div>
          <div className="flex-shrink-0">
            <AvailabilityChip availability={result.availability} />
          </div>
        </div>
      </div>

      {/* Key Info Grid - Better mobile stacking */}
      <div className="p-4 sm:p-6 grid grid-cols-3 gap-3 sm:gap-4 border-b border-gray-100">
        <FareDisplay amount={result.estimatedFare} />
        <ETABadge label="Wait" minutes={result.estimatedWaitEtaMinutes} tone="slate" />
        <ETABadge label="Total" minutes={result.estimatedTotalEtaMinutes} tone="emerald" />
      </div>

      {/* Map */}
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-600 mb-3 uppercase">Route Map</p>
        <div className="rounded-lg overflow-hidden">
          <MapView
            stops={result.stopSequence}
            activeVehicleCount={result.availability.activeCount}
          />
        </div>
      </div>

      {/* Stop Info Section */}
      <div className="p-4 sm:p-6 bg-emerald-50 border-b border-emerald-100">
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Boarding</p>
            <p className="text-sm sm:text-base font-semibold text-emerald-900">{result.boardingStop.name}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Getting Off</p>
            <p className="text-sm sm:text-base font-semibold text-emerald-900">{result.destinationStop.name}</p>
          </div>
        </div>
      </div>

      {/* Stop Sequence */}
      <div className="p-4 sm:p-6">
        <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">📍 Complete Stop Sequence</h3>
        <StopList stops={result.stopSequence} />
      </div>
    </article>
  );
}
