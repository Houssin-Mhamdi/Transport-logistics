import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import ServiceCard from "@/components/shared/ServiceCard";

export default function ServicesBentoGrid() {
    return (
        <section className="max-w-7xl mx-auto px-6 mb-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {SERVICES.map((service, index) => (
                    <ServiceCard key={service.id} {...service} index={index} />
                ))}
            </div>
        </section>
    );
}