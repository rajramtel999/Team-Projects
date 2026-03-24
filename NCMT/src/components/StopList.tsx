import type { RouteSearchStopSequenceItem } from '@/types/searchResult';

interface StopListProps {
  stops: RouteSearchStopSequenceItem[];
}

export default function StopList({ stops }: StopListProps) {
  if (!stops.length) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-500">
        No stops available for this route segment.
      </div>
    );
  }

  return (
    <ol className="space-y-3">
      {stops.map((stop, index) => {
        const isFirst = index === 0;
        const isLast = index === stops.length - 1;

        return (
          <li key={stop.stopId} className="flex gap-3 sm:gap-4">
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={[
                  'inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full font-bold text-sm touch-manipulation',
                  isFirst
                    ? 'bg-emerald-500 text-white'
                    : isLast
                      ? 'bg-rose-500 text-white'
                      : 'bg-gray-200 text-gray-700',
                ].join(' ')}
              >
                {stop.order}
              </div>
              {!isLast && <div className="w-1 h-8 sm:h-10 bg-gray-200 mt-1" />}
            </div>
            <div className="flex-1 py-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm sm:text-base break-words">{stop.stopName}</p>
              {!isLast && (
                <p className="text-xs text-gray-500 mt-1">
                  ⏱️ {stop.avgTimeToNextStop} min to next
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
