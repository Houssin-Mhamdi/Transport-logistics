// lib/constants.ts

import { MapLayer, RoutePlan } from "@/types";

export const SERVICES = [
    {
        id: "air-freight",
        title: "Air Freight",
        description: "Expedited global shipping for time-critical assets. Our air network provides door-to-door delivery with surgical precision across six continents.",
        icon: "flight_takeoff",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8hc_s6V-YhxKGgis0XTTbiVF1l1hVXXQWYjgqgFGeSLG14IXEo70S678BXPV6eZCi8TzwbX6yub3c6e-hKJH5_SK-MBUVmNQHE6kQKENs6Mj3GBz0rTxI5C_rLM2sI7sTTuXGOzVSJZhL4yplhVt7ZpRxePXpybUncEQ29sD8vGPx5hAOqDtvm5CC8shmj4LZQcUnHBsz2mwcjjub5bUL0677B7mVloUZZKKceqJ2F7oxMb7ZPgunhtN4XrVc9HgNEQsUeLsd0mhs",
        imageAlt: "dramatic close-up of a wide-body cargo aircraft nose with cargo doors open at an illuminated airport terminal at twilight",
        layout: "wide", // "wide" or "narrow"
        reverse: false,
    },
    {
        id: "ocean-freight",
        title: "Ocean Freight",
        description: "High-capacity maritime transport for global trade routes. Specializing in FCL and LCL shipments with real-time port telemetry.",
        icon: "sailing",
        image: null,
        layout: "narrow",
        reverse: false,
    },
    {
        id: "road-transport",
        title: "Road Transport",
        description: "Dynamic trucking solutions across domestic and regional borders. Fleet equipped with advanced GPS and temperature control.",
        icon: "local_shipping",
        image: null,
        layout: "narrow",
        reverse: false,
        variant: "dark",
    },
    {
        id: "warehousing",
        title: "Warehousing",
        description: "Smart fulfillment centers strategically located near major transit hubs. Fully integrated WMS and automated inventory tracking.",
        icon: "inventory_2",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxcP7yZ7E1TKNInQxEuv9mffFA8w-BhiNZ0IPbOvLhYNaaMOMay_y6wosE7Fz98g3li7Ev77gUx79UooueQV4ePoZdPg37XTgCOWrbYOe71tsHJMC41yWPYoei_sqNdlBThG3bhE75WL0KPSQQnEYA9Kv6RJaEFA2TJGA6UlbihWN-fTC2YDr4tJa7FX3G8XaaAYnJhUH1HIcekhed8uBn4x-oEVUbvYWIyYcx9pfEJB9tUmE_3BZpo9xcUzSsDCfeetd3872RXojX",
        imageAlt: "ultra-modern organized warehouse interior with tall industrial shelving and clean polished floors in a cool aesthetic",
        layout: "wide",
        reverse: true,
    },
] as const;

export const STATS = [
    { value: "24/7", label: "Global Support" },
    { value: "180+", label: "Countries Reached" },
    { value: "99.9%", label: "On-time Delivery" },
    { value: "12M", label: "Annual Shipments" },
] as const;

// lib/constants.ts - Add these exports

export const DEFAULT_ROUTE: RoutePlan = {
  id: "route-draft-001",
  origin: {
    id: "loc-001",
    name: "Rotterdam Port Terminal 4",
    address: "Wilhelminakade 909, 3072 AP Rotterdam, Netherlands",
    coordinates: { lat: 51.8975, lng: 4.4853 }
  },
  stops: [
    {
      id: "stop-001",
      name: "Berlin Distribution Hub",
      address: "Tempelhofer Ufer 1, 10963 Berlin, Germany",
      order: 1,
      coordinates: { lat: 52.5065, lng: 13.3769 },
      estimatedArrival: "Day 1, 18:30",
      serviceTime: 45
    }
  ],
  totalDistance: 1248.5,
  estimatedTime: "14h 22m",
  carbonFootprint: 242,
  congestionIndex: 12,
  vehicleType: "transporter",
  pricing: {
    ratePerKm: 0.85, 
    baseFee: 50,
    fuelSurcharge: 120, // (1248.5 * 0.85 * 0.12) roughly
    tollFees: 89.00,
    total: 1320.225, // (1248.5 * 0.85) + 50 + 120 + 89
    currency: "EUR",
    validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  },
  routeType: "standard",
  status: "draft"
};

export const VEHICLES = [
  {
    id: "car",
    name: "Car Station Wagon",
    baseRate: 0.45, 
    baseFee: 20,
    icon: "directions_car",
    capacity: "450 kg",
    dimensions: "180x110x90 cm"
  },
  {
    id: "transporter",
    name: "Transporter",
    baseRate: 0.85,
    baseFee: 50,
    icon: "local_shipping",
    capacity: "1,200 kg",
    dimensions: "430x180x120 cm"
  },
  {
    id: "suitcase",
    name: "Suitcase Truck",
    baseRate: 1.5,
    baseFee: 120,
    icon: "shipping",
    capacity: "3,500 kg",
    dimensions: "610x240x240 cm"
  },
  {
    id: "suitcase_lift",
    name: "Suitcase (Lifting Platform)",
    baseRate: 2.1,
    baseFee: 200,
    icon: "expand",
    capacity: "5,000 kg",
    dimensions: "Integrated Lift"
  }
] as const;

export const ROUTE_TYPES = [
  {
    id: "standard",
    name: "Standard Route",
    icon: "route",
    description: "Balanced optimization for cost and time",
    color: "primary"
  },
  {
    id: "express",
    name: "Express Route",
    icon: "bolt",
    description: "Priority bypass for urgent deliveries. Optimized for time over fuel cost.",
    benefit: "+15% Speed Enhancement",
    color: "secondary-container"
  },
  {
    id: "eco",
    name: "Eco-Flow Routing",
    icon: "park",
    description: "Smart gradients and terrain matching to reduce fuel consumption.",
    benefit: "-8% Fuel Consumption",
    benefitColor: "#008f39",
    color: "surface-container-highest"
  }
] as const;

export const MAP_LAYERS: MapLayer[] = [
  { id: "routes", name: "Active Routes", visible: true, type: "routes" },
  { id: "traffic", name: "Live Traffic", visible: true, type: "traffic" },
  { id: "terrain", name: "Terrain", visible: false, type: "terrain" },
  { id: "satellite", name: "Satellite", visible: false, type: "satellite" }
];