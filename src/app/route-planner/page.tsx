import { Metadata } from "next";
import RouteHero from "@/components/ui/RoutePlanner/RouteHero";
import { DEFAULT_ROUTE } from "@/lib/constants";
import TopNavBar from "@/components/ui/TopNavBar";
import RoutePlannerClientWrapper from "@/components/ui/RoutePlanner/RoutePlannerClientWrapper";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Route Architect | Soysal Logistics",
  description: "Define complex logistical flows with mathematical certainty",
};

export default function RoutePlannerPage() {
  // In production, fetch from API or use server-side data
  const initialRoute = DEFAULT_ROUTE;

  return (
    <main className="min-h-screen bg-background font-body text-on-surface antialiased">
      <TopNavBar activePage="route-planner" />
      
      <RouteHero />
      
      <RoutePlannerClientWrapper initialRoute={initialRoute} />
      <Footer />
    </main>
  );
}