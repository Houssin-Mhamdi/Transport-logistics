"use client";

interface BookingSummaryProps {
    data: any;
    currentStep: string;
    price: string;
}

export default function BookingSummary({ data, currentStep, price }: BookingSummaryProps) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800 sticky top-4">
            <h2 className="text-2xl font-bold mb-6">Overview</h2>

            <div className="space-y-6">
                {/* Shipment Summary */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">inventory_2</span>
                            Shipment
                        </h3>
                        <button className="text-sm text-primary font-semibold hover:underline">Edit</button>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 space-y-2">
                        {data.shipments && data.shipments.map((shipment: any) => (
                            <div key={shipment.id} className="pb-2 mb-2 border-b border-slate-200 dark:border-slate-700 last:border-0 last:mb-0 last:pb-0">
                                <p className="text-sm">
                                    <span className="font-semibold capitalize">{shipment.quantity}x {shipment.shipmentType}</span>
                                </p>
                                <p className="text-xs text-on-surface-variant">
                                    {shipment.weight}kg • {shipment.length}×{shipment.width}×{shipment.height}cm
                                </p>
                            </div>
                        ))}
                        <p className="text-sm font-semibold pt-2 mt-2 border-t border-slate-200 dark:border-slate-700">
                            Total: {data.shipments?.reduce((acc: number, s: any) => acc + ((parseFloat(s.weight) || 0) * (parseInt(s.quantity) || 1)), 0)}kg
                        </p>
                    </div>
                </div>

                {/* Vehicle Type */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary">directions_car</span>
                            Vehicle Type
                        </h3>
                        <button className="text-sm text-primary font-semibold hover:underline">Edit</button>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                        <p className="font-semibold capitalize">{data.selectedVehicle.replace("_", " ")}</p>
                        <p className="text-xs text-on-surface-variant mt-1">
                            Max. 300kg, Loading from rear
                        </p>
                    </div>
                </div>

                {/* Price */}
                <div className="bg-primary/10 rounded-xl p-6 text-center">
                    <p className="text-4xl font-black text-primary mb-1">{price} €</p>
                    <p className="text-sm text-on-surface-variant">Netto</p>
                    <p className="text-xs text-on-surface-variant mt-2">
                        excl. 19% VAT • Brutto {parseFloat(price) * 1.19} €
                    </p>
                </div>
            </div>
        </div>
    );
}