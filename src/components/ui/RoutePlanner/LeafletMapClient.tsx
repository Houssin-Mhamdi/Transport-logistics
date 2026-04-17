// components/ui/RoutePlanner/LeafletMapClient.tsx
"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { RoutePlan } from "@/types";
import TelemetryStats from "./TelemetryStats";

// Fix for default Leaflet marker icons in Next.js
if (typeof window !== "undefined") {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    });
}

// Custom marker icons
const createCustomIcon = (color: string, isOrigin = false) => {
    return L.divIcon({
        className: "custom-div-icon",
        html: `
      <div style="
        background-color: ${color};
        width: ${isOrigin ? "40px" : "32px"};
        height: ${isOrigin ? "40px" : "32px"};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        border: 3px solid white;
      ">
        <span class="material-symbols-outlined" style="
          color: white;
          font-size: ${isOrigin ? "24px" : "18px"};
          transform: rotate(45deg);
          font-weight: 700;
        ">${isOrigin ? "flag" : "location_on"}</span>
      </div>
    `,
        iconSize: isOrigin ? [40, 40] : [32, 32],
        iconAnchor: isOrigin ? [20, 40] : [16, 32],
        popupAnchor: [0, -40],
    });
};

const originIcon = typeof window !== "undefined" ? createCustomIcon("#003b93", true) : undefined;
const stopIcon = typeof window !== "undefined" ? createCustomIcon("#fb7800", false) : undefined;

// Map Controller - Only updates when center/zoom actually change
interface MapControllerProps {
    center: [number, number];
    zoom: number;
    shouldFlyTo: boolean;
}

function MapController({ center, zoom, shouldFlyTo }: MapControllerProps) {
    const map = useMap();
    const prevCenterRef = useRef<[number, number] | null>(null);
    const prevZoomRef = useRef<number>(zoom);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const hasCenterChanged = !prevCenterRef.current ||
            Math.abs(prevCenterRef.current[0] - center[0]) > 0.01 ||
            Math.abs(prevCenterRef.current[1] - center[1]) > 0.01;

        const hasZoomChanged = Math.abs(prevZoomRef.current - zoom) > 0.5;

        if ((hasCenterChanged || hasZoomChanged) && shouldFlyTo) {
            map.flyTo(center, zoom, {
                duration: 1.2,
                easeLinearity: 0.25
            });
            prevCenterRef.current = center;
            prevZoomRef.current = zoom;
        }
    }, [center, zoom, shouldFlyTo, map]);

    return null;
}

// Search Component for Locations
interface LocationSearchProps {
    onSelect: (lat: number, lng: number, name: string) => void;
    placeholder?: string;
}

function LocationSearch({ onSelect, placeholder = "Search location..." }: LocationSearchProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const searchLocation = useCallback(async (searchQuery: string) => {
        if (typeof window === "undefined") return;
        if (!searchQuery || searchQuery.length < 3) {
            setResults([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`
            );
            const data = await response.json();
            setResults(data || []);
            setIsOpen((data || []).length > 0);
        } catch (error) {
            console.error("Search error:", error);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            searchLocation(value);
        }, 500);
    };

    const handleSelect = (result: any) => {
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        onSelect(lat, lng, result.display_name);
        setQuery(result.display_name);
        setIsOpen(false);
        setResults([]);
    };

    return (
        <div className="relative w-full max-w-md">
            <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    search
                </span>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => results.length > 0 && setIsOpen(true)}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
                {isLoading && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined animate-spin text-primary">
                        progress_activity
                    </span>
                )}
            </div>

            {isOpen && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-[500] max-h-80 overflow-y-auto">
                    {results.map((result, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelect(result)}
                            className="w-full px-4 py-3 text-left hover:bg-surface-container transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0"
                        >
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary mt-0.5">location_on</span>
                                <div>
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 line-clamp-2">
                                        {result.display_name}
                                    </p>
                                    {result.type && (
                                        <p className="text-xs text-slate-500 capitalize mt-0.5">{result.type}</p>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

interface LeafletMapClientProps {
    route: RoutePlan;
}

export default function LeafletMapClient({ route }: LeafletMapClientProps) {
    const [mapCenter, setMapCenter] = useState<[number, number]>([51.8975, 4.4853]);
    const [mapZoom, setMapZoom] = useState(6);
    const [shouldFlyTo, setShouldFlyTo] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const routeCoordinates = useMemo(() => {
        const coords: [number, number][] = [
            [route.origin.coordinates?.lat || 0, route.origin.coordinates?.lng || 0],
            ...route.stops.map(stop => [
                stop.coordinates?.lat || 0,
                stop.coordinates?.lng || 0
            ] as [number, number])
        ];
        return coords.filter(coord => coord[0] !== 0 || coord[1] !== 0);
    }, [route.origin, route.stops]);

    const calculateOptimalView = useCallback(() => {
        if (typeof window === "undefined" || routeCoordinates.length === 0) return;

        const lats = routeCoordinates.map(coord => coord[0]);
        const lngs = routeCoordinates.map(coord => coord[1]);

        const centerLat = (Math.max(...lats) + Math.min(...lats)) / 2;
        const centerLng = (Math.max(...lngs) + Math.min(...lngs)) / 2;

        const latDiff = Math.max(...lats) - Math.min(...lats);
        const lngDiff = Math.max(...lngs) - Math.min(...lngs);
        const maxDiff = Math.max(latDiff, lngDiff);

        let calculatedZoom = 6;
        if (maxDiff < 0.5) calculatedZoom = 12;
        else if (maxDiff < 1) calculatedZoom = 11;
        else if (maxDiff < 2) calculatedZoom = 10;
        else if (maxDiff < 5) calculatedZoom = 8;
        else if (maxDiff < 10) calculatedZoom = 7;
        else calculatedZoom = 6;

        calculatedZoom = Math.max(4, Math.min(14, calculatedZoom));

        setMapCenter([centerLat, centerLng]);
        setMapZoom(calculatedZoom);
        setShouldFlyTo(true);

        setTimeout(() => setShouldFlyTo(false), 1500);
    }, [routeCoordinates]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            calculateOptimalView();
        }
    }, [calculateOptimalView]);

    const handleSearchSelect = useCallback((lat: number, lng: number, name: string) => {
        setMapCenter([lat, lng]);
        setMapZoom(14);
        setShouldFlyTo(true);
        setTimeout(() => setShouldFlyTo(false), 1500);
    }, []);

    // Don't render anything on server
    if (typeof window === "undefined") {
        return <div className="w-full h-[600px] bg-surface-container-low animate-pulse rounded-xl" />;
    }

    return (
        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden flex-grow min-h-[600px] relative group">
            {showSearch && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[500] w-full max-w-lg px-4">
                    <LocationSearch
                        onSelect={handleSearchSelect}
                        placeholder="Search for a city, address, or place..."
                    />
                </div>
            )}

            <button
                onClick={() => setShowSearch(!showSearch)}
                className="absolute top-6 left-6 z-[500] glass-panel px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 hover:bg-white/90 transition-colors"
            >
                <span className="material-symbols-outlined text-primary">search</span>
                <span className="font-bold text-sm text-primary hidden sm:inline">
                    {showSearch ? "Close Search" : "Search Location"}
                </span>
            </button>

            <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                className="w-full h-full min-h-[600px] z-0"
                scrollWheelZoom={true}
                zoomControl={false}
                attributionControl={false}
                minZoom={4}
                maxZoom={16}
                maxBounds={[
                    [-90, -180],
                    [90, 180]
                ]}
            >
                <MapController center={mapCenter} zoom={mapZoom} shouldFlyTo={shouldFlyTo} />

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Polyline
                    positions={routeCoordinates}
                    pathOptions={{
                        color: "#003b93",
                        weight: 4,
                        opacity: 0.8,
                        dashArray: "10, 10",
                        lineCap: "round"
                    }}
                />

                {route.origin.coordinates && originIcon && (
                    <Marker
                        position={[route.origin.coordinates.lat, route.origin.coordinates.lng]}
                        icon={originIcon}
                    >
                        <Popup>
                            <div className="p-2 min-w-[200px]">
                                <h3 className="font-bold text-primary text-lg mb-1">🚩 {route.origin.name}</h3>
                                <p className="text-sm text-slate-600 mb-2">{route.origin.address}</p>
                            </div>
                        </Popup>
                    </Marker>
                )}

                {route.stops.map((stop, index) => (
                    stop.coordinates && stopIcon && (
                        <Marker
                            key={stop.id}
                            position={[stop.coordinates.lat, stop.coordinates.lng]}
                            icon={stopIcon}
                        >
                            <Popup>
                                <div className="p-2 min-w-[220px]">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-secondary-container text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                                            {index + 1}
                                        </span>
                                        <h3 className="font-bold text-primary text-lg">Stop {index + 1}</h3>
                                    </div>
                                    <p className="font-semibold text-slate-800 mb-1">{stop.name}</p>
                                    <p className="text-sm text-slate-600">{stop.address}</p>
                                    {stop.estimatedArrival && (
                                        <div className="bg-primary/10 rounded-lg p-2 mt-2">
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="material-symbols-outlined text-primary text-sm">schedule</span>
                                                <span className="font-semibold text-primary">ETA: {stop.estimatedArrival}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Popup>
                        </Marker>
                    )
                ))}
            </MapContainer>

            <div className="absolute top-6 right-6 z-[400] glass-panel p-2 rounded-lg flex flex-col gap-2 shadow-lg">
                <button
                    className="w-10 h-10 bg-white hover:bg-surface-container rounded flex items-center justify-center text-primary transition-colors shadow-md"
                    onClick={() => setMapZoom(prev => Math.min(prev + 1, 16))}
                    aria-label="Zoom in"
                >
                    <span className="material-symbols-outlined text-xl">add</span>
                </button>
                <button
                    className="w-10 h-10 bg-white hover:bg-surface-container rounded flex items-center justify-center text-primary transition-colors shadow-md"
                    onClick={() => setMapZoom(prev => Math.max(prev - 1, 4))}
                    aria-label="Zoom out"
                >
                    <span className="material-symbols-outlined text-xl">remove</span>
                </button>
                <div className="h-px bg-outline-variant/20 w-full"></div>
                <button
                    className="w-10 h-10 bg-white hover:bg-surface-container rounded flex items-center justify-center text-primary transition-colors shadow-md"
                    onClick={calculateOptimalView}
                    title="Fit route to view"
                    aria-label="Fit to route"
                >
                    <span className="material-symbols-outlined text-xl">fit_screen</span>
                </button>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-[400]">
                <TelemetryStats route={route} />
            </div>

            <div className="absolute top-20 right-6 z-[400] glass-panel px-6 py-4 rounded-lg shadow-lg hidden lg:block">
                <div className="flex items-center gap-4">
                    <div className="text-center">
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Distance</p>
                        <p className="text-xl font-black text-primary">{route.totalDistance.toFixed(1)} km</p>
                    </div>
                    <div className="w-px h-10 bg-outline-variant/30"></div>
                    <div className="text-center">
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Stops</p>
                        <p className="text-xl font-black text-primary">{route.stops.length}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}