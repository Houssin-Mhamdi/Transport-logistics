// components/ui/RoutePlanner/LiveMap.tsx
import dynamic from "next/dynamic";
import { RoutePlan } from "@/types";

// Dynamically import the client-only map component with SSR disabled
const LeafletMapClient = dynamic(
  () => import("./LeafletMapClient"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden flex-grow min-h-[600px] flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-4xl text-primary animate-spin mb-4">
            progress_activity
          </span>
          <p className="text-on-surface-variant font-medium">Loading interactive map...</p>
        </div>
      </div>
    ),
  }
);

interface LiveMapProps {
  route: RoutePlan;
}

export default function LiveMap({ route }: LiveMapProps) {
  return <LeafletMapClient route={route} />;
}