'use client';

import { useEffect, useState } from 'react';
import LiveMapView from '@/components/LiveMapView';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import type { RouteDoc, RouteStopDoc, StopDoc } from '@/types/transit';

interface RouteWithStops {
  route: RouteDoc;
  stops: Array<{
    latitude: number;
    longitude: number;
    stopName: string;
    order: number;
  }>;
}

export default function LiveTrackingPage() {
  const [routes, setRoutes] = useState<RouteWithStops[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoutes();
  }, []);

  async function fetchRoutes() {
    try {
      // Fetch routes
      const routesSnapshot = await getDocs(collection(db, 'routes'));
      const routesDocs = routesSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as RouteDoc)
      );

      // Fetch route stops
      const routeStopsSnapshot = await getDocs(collection(db, 'routeStops'));
      const routeStopsDocs = routeStopsSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as RouteStopDoc)
      );

      // Fetch stops
      const stopsSnapshot = await getDocs(collection(db, 'stops'));
      const stopsDocs = stopsSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as StopDoc)
      );

      // Combine data
      const routesWithStops: RouteWithStops[] = routesDocs
        .filter((route) => route.isApproved)
        .map((route) => {
          const routeStops = routeStopsDocs
            .filter((rs) => rs.routeId === route.id)
            .sort((a, b) => a.order - b.order);

          const stops = routeStops
            .map((rs) => {
              const stop = stopsDocs.find((s) => s.id === rs.stopId);
              if (!stop) return null;
              return {
                latitude: stop.latitude,
                longitude: stop.longitude,
                stopName: stop.name,
                order: rs.order,
              };
            })
            .filter((s) => s !== null) as RouteWithStops['stops'];

          return { route, stops };
        });

      setRoutes(routesWithStops);
      if (routesWithStops.length > 0) {
        setSelectedRouteId(routesWithStops[0].route.id);
      }
    } catch (error) {
      console.error('Error fetching routes:', error);
    } finally {
      setLoading(false);
    }
  }

  const selectedRoute = routes.find((r) => r.route.id === selectedRouteId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-blue-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            🚍 Live Vehicle Tracking
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            See vehicles moving in real-time across selected routes
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 sm:py-16">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600 text-sm">Loading routes...</p>
          </div>
        ) : routes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 text-center border-l-4 border-yellow-400">
            <p className="text-gray-600">⚠️ No routes available for tracking</p>
          </div>
        ) : (
          <>
            {/* Route selector */}
            <div className="mb-6 rounded-xl bg-white p-4 sm:p-6 shadow-sm border border-gray-200">
              <label htmlFor="route-select" className="block text-sm font-semibold text-gray-700 mb-3">
                Select Route to Track
              </label>
              <select
                id="route-select"
                value={selectedRouteId}
                onChange={(e) => setSelectedRouteId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base bg-white"
              >
                {routes.map((r) => (
                  <option key={r.route.id} value={r.route.id}>
                    {r.route.name} ({r.route.type})
                  </option>
                ))}
              </select>
            </div>

            {/* Live map */}
            {selectedRoute && (
              <div className="mb-6 rounded-xl overflow-hidden shadow-lg border border-gray-200">
                <LiveMapView
                  routeId={selectedRoute.route.id}
                  stops={selectedRoute.stops}
                  routeName={selectedRoute.route.name}
                />
              </div>
            )}

            {/* Info card */}
            <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-lg p-4 sm:p-6">
              <div className="flex gap-3 sm:gap-4">
                <span className="text-2xl flex-shrink-0">ℹ️</span>
                <div>
                  <h3 className="font-bold text-emerald-900 mb-2 text-sm sm:text-base">Live Tracking Demo</h3>
                  <p className="text-emerald-800 text-xs sm:text-sm leading-relaxed">
                    Vehicles appear on the map and update positions in real-time. Start the simulator via PowerShell to see vehicles moving along the route. Blue arrows show direction of travel.
                    Click on any vehicle to see its current speed and status.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
