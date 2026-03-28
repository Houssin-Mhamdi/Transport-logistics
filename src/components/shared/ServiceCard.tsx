"use client";

import Link from "next/link";
import Image from "next/image";

interface ServiceCardProps {
    id: string;
    title: string;
    description: string;
    icon: string;
    image: string | null;
    imageAlt?: string;
    layout: "wide" | "narrow";
    reverse?: boolean;
    variant?: "light" | "dark";
    index: number;
}

export default function ServiceCard({
    id,
    title,
    description,
    icon,
    image,
    imageAlt,
    layout,
    reverse = false,
    variant = "light",
}: ServiceCardProps) {
    const isWide = layout === "wide";
    const isDark = variant === "dark";

    const colSpan = isWide ? "md:col-span-8" : "md:col-span-4";
    const flexDirection = reverse ? "md:flex-row-reverse" : "md:flex-row";

    return (
        <div className={`${colSpan} group relative overflow-hidden rounded-xl transition-all hover:shadow-2xl ${isWide
                ? `flex ${flexDirection} hover:shadow-primary/5 ${isDark ? "bg-surface-container-high" : "bg-surface-container-low"}`
                : `${isDark ? "bg-primary text-white" : "bg-surface-container-lowest"} flex flex-col justify-between hover:shadow-xl border ${!isDark ? "border-outline-variant/10" : "border-transparent"}`
            }`}>

            {/* Content Section */}
            <div className={`flex-1 p-12 flex flex-col justify-between ${isWide ? "" : ""}`}>
                <div>
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-8 ${isDark
                            ? "bg-white/10 backdrop-blur"
                            : "bg-primary-fixed"
                        }`}>
                        <span className={`material-symbols-outlined text-2xl ${isDark ? "text-white" : "text-primary"}`}>
                            {icon}
                        </span>
                    </div>

                    {/* Title & Description */}
                    <h2 className={`text-3xl font-black tracking-tight mb-4 ${isDark ? "text-white" : "text-primary"}`}>
                        {title}
                    </h2>
                    <p className={`leading-relaxed mb-8 ${isWide ? "max-w-sm" : ""} ${isDark ? "text-primary-fixed-dim" : "text-on-surface-variant"
                        }`}>
                        {description}
                    </p>
                </div>

                {/* Learn More Link */}
                <Link
                    href={`/services/${id}`}
                    className={`inline-flex items-center font-bold hover:underline gap-2 group/link ${isDark ? "text-secondary-container" : "text-secondary"
                        }`}
                >
                    Learn More
                    <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">
                        arrow_forward
                    </span>
                </Link>
            </div>

            {/* Image Section (Wide cards only) */}
            {image && isWide && (
                <div className="flex-1 min-h-[300px] relative">
                    <Image
                        src={image}
                        alt={imageAlt || title}
                        fill
                        className={`object-cover transition-all duration-700 ${title === "Warehousing" ? "grayscale hover:grayscale-0" : ""
                            }`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={false}
                    />
                </div>
            )}

            {/* Decorative Icon (Road Transport) */}
            {isDark && !image && (
                <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                    <span className="material-symbols-outlined text-[200px] text-white">
                        {icon}
                    </span>
                </div>
            )}
        </div>
    );
}