import type { VehicleAvailabilityResult } from '@/lib/vehicleAvailabilityCalculator';

interface AvailabilityChipProps {
  availability: VehicleAvailabilityResult;
}

const availabilityClassMap = {
  available: 'bg-emerald-500 text-white border-emerald-600',
  limited: 'bg-amber-500 text-white border-amber-600',
  'not-available': 'bg-rose-500 text-white border-rose-600',
};

export default function AvailabilityChip({ availability }: AvailabilityChipProps) {
  return (
    <div
      className={`rounded-full border-2 px-3 py-2 sm:px-3 sm:py-1 text-xs sm:text-xs font-bold whitespace-nowrap inline-flex gap-1 items-center ${availabilityClassMap[availability.level]}`}
    >
      <span>{availability.label}</span>
      <span className="font-normal">({availability.activeCount})</span>
    </div>
  );
}
