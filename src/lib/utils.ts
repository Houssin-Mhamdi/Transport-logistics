// lib/utils.ts

export function formatCurrency(amount: number, currency: string = "USD"): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

export function formatDistance(km: number): string {
    return `${km.toLocaleString("en-US")} km`;
}

export function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
}

export function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}