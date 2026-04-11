"use client";

import { useState } from "react";

interface DeliveryStepProps {
    data: any;
    onUpdate: (updates: any) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function DeliveryStep({ data, onUpdate, onNext, onBack }: DeliveryStepProps) {
    const isFormComplete = true; // Simplified for now

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Enter Delivery Details</h1>
                <p className="text-on-surface-variant">Provide complete delivery address information</p>
            </div>

            {/* Main Delivery Location */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-secondary text-sm">near_me</span>
                        </div>
                        <span className="font-bold">Delivery Location: {data.deliveryAddress || 'Address'}</span>
                    </div>
                </div>

                <div className="p-6 space-y-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-secondary text-sm">person</span>
                            <h3 className="font-bold">Contact Person</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
                                    value={data.deliveryContact?.firstName || ""}
                                    onChange={(e) => onUpdate({
                                        deliveryContact: { ...data.deliveryContact, firstName: e.target.value }
                                    })}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
                                    value={data.deliveryContact?.lastName || ""}
                                    onChange={(e) => onUpdate({
                                        deliveryContact: { ...data.deliveryContact, lastName: e.target.value }
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Extra Deliveries */}
            {data.extraDeliveries?.map((delivery: any, index: number) => {
                const details = delivery.details || {};
                const updateDetails = (updates: any) => {
                    const newList = [...data.extraDeliveries];
                    newList[index] = { ...newList[index], details: { ...newList[index].details, ...updates } };
                    onUpdate({ extraDeliveries: newList });
                };

                return (
                    <div key={`extra-delivery-${index}`} className="mt-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-secondary text-sm">near_me</span>
                                </div>
                                <span className="font-bold">Delivery Stop {index + 1}: {delivery.address || 'Address'}</span>
                            </div>
                        </div>

                        <div className="p-6 space-y-8">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-secondary text-sm">person</span>
                                    <h3 className="font-bold">Contact Person</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
                                            value={details.firstName || ""}
                                            onChange={(e) => updateDetails({ firstName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
                                            value={details.lastName || ""}
                                            onChange={(e) => updateDetails({ lastName: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
                <button
                    onClick={onBack}
                    type="button"
                    className="px-8 py-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                    Back
                </button>
                <button
                    onClick={onNext}
                    disabled={!isFormComplete}
                    className="flex-1 py-4 bg-primary hover:bg-primary-hover disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
                >
                    Continue to Invoice
                </button>
            </div>
        </div>
    );
}