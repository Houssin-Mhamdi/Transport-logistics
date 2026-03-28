// types/index.ts

export interface Location {
  id: string;
  name: string;
  address: string;
  coordinates?: { lat: number; lng: number };
}

export interface RouteStop extends Location {
  order: number;
  estimatedArrival?: string;
  serviceTime?: number; // in minutes
}

export interface RoutePlan {
  id: string;
  origin: Location;
  stops: RouteStop[];
  destination?: Location;
  totalDistance: number; // in km
  estimatedTime: string;
  carbonFootprint: number; // in kg CO2
  congestionIndex: number; // percentage
  pricing: {
    ratePerKm: number;
    baseFee: number;
    fuelSurcharge: number;
    tollFees: number;
    total: number;
    currency: string;
    validUntil: string;
  };
  routeType: 'standard' | 'express' | 'eco';
  status: 'draft' | 'calculated' | 'booked' | 'active';
}

export interface MapLayer {
  id: string;
  name: string;
  visible: boolean;
  type: 'traffic' | 'terrain' | 'satellite' | 'routes';
}