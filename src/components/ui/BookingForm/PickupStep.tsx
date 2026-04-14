"use client";

import { useState } from "react";

interface PickupStepProps {
    data: any;
    onUpdate: (updates: any) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function PickupStep({ data, onUpdate, onNext, onBack }: PickupStepProps) {
    const [showStartLocation, setShowStartLocation] = useState(true);
    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

    const cityValue = data.pickupDetails?.city || "Berlin";
    
    const isFormComplete = !!(
        data.pickupContact?.firstName &&
        data.pickupContact?.lastName &&
        data.pickupDetails?.street &&
        data.pickupDetails?.number &&
        data.pickupDetails?.postalCode &&
        cityValue
    );

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Enter Pickup Details</h1>
                <p className="text-on-surface-variant">Provide complete pickup address information</p>
            </div>

            {/* Form Container */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                {/* Start Location Toggle */}
                <button
                    onClick={() => setShowStartLocation(!showStartLocation)}
                    className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                        </div>
                        <span className="font-bold">Pickup Location</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-400">
                        {showStartLocation ? "expand_less" : "expand_more"}
                    </span>
                </button>

                {showStartLocation && (
                    <div className="p-6 space-y-8">
                        {/* Contact Person Section */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-primary text-sm">person</span>
                                <h3 className="font-bold">Contact Person</h3>
                            </div>

                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Company (optional)"
                                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-slate-50 dark:bg-slate-800"
                                    value={data.pickupContact?.company || ""}
                                    onChange={(e) => onUpdate({
                                        pickupContact: { ...data.pickupContact, company: e.target.value }
                                    })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="First Name *"
                                        required
                                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        value={data.pickupContact?.firstName || ""}
                                        onChange={(e) => onUpdate({
                                            pickupContact: { ...data.pickupContact, firstName: e.target.value }
                                        })}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Last Name *"
                                        required
                                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        value={data.pickupContact?.lastName || ""}
                                        onChange={(e) => onUpdate({
                                            pickupContact: { ...data.pickupContact, lastName: e.target.value }
                                        })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address Section */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-secondary text-sm">location_on</span>
                                <h3 className="font-bold">Address</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="md:col-span-2">
                                    <input
                                        type="text"
                                        placeholder="Street *"
                                        required
                                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        value={data.pickupDetails?.street || ""}
                                        onChange={(e) => onUpdate({
                                            pickupDetails: { ...data.pickupDetails, street: e.target.value }
                                        })}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="No. *"
                                        required
                                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        value={data.pickupDetails?.number || ""}
                                        onChange={(e) => onUpdate({
                                            pickupDetails: { ...data.pickupDetails, number: e.target.value }
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Postal Code *"
                                        required
                                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        value={data.pickupDetails?.postalCode || ""}
                                        onChange={(e) => onUpdate({
                                            pickupDetails: { ...data.pickupDetails, postalCode: e.target.value }
                                        })}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <input
                                        type="text"
                                        placeholder="City"
                                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        value={data.pickupDetails?.city || "Berlin"}
                                        onChange={(e) => onUpdate({
                                            pickupDetails: { ...data.pickupDetails, city: e.target.value }
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <select
                                    className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm"
                                    value={data.pickupDetails?.country || "DE"}
                                    onChange={(e) => onUpdate({
                                        pickupDetails: { ...data.pickupDetails, country: e.target.value }
                                    })}
                                >
                                    <option value="DE">🇩🇪 Germany</option>
                                    <option value="NL">🇳🇱 Netherlands</option>
                                    <option value="FR">🇫 France</option>
                                    <option value="BE">🇧 Belgium</option>
                                    <option value="AT">🇦🇹 Austria</option>
                                </select>
                            </div>

                            <p className="text-xs text-slate-500 flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">info</span>
                                City and country taken from Step 1 (postal code adjustable)
                            </p>
                        </div>

                        {/* Pickup Time Window */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-primary text-sm">schedule</span>
                                <h3 className="font-bold">Desired Pickup Time Window *</h3>
                            </div>
                            <p className="text-sm text-on-surface-variant mb-4 font-semibold text-primary">
                                On {data.pickupDate ? new Date(data.pickupDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'April 6, 2026'}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold mb-2 text-slate-600 dark:text-slate-400">
                                        From (earliest)
                                    </label>
                                    <div className="relative group">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-sm text-slate-400 group-hover:text-primary transition-colors">login</span>
                                        <input
                                            type="time"
                                            value={data.pickupWindow?.from || "08:00"}
                                            onChange={(e) => onUpdate({
                                                pickupWindow: { ...(data.pickupWindow || {}), from: e.target.value }
                                            })}
                                            className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-2 text-slate-600 dark:text-slate-400">
                                        Until (latest)
                                    </label>
                                    <div className="relative group">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-sm text-slate-400 group-hover:text-secondary transition-colors">logout</span>
                                        <input
                                            type="time"
                                            value={data.pickupWindow?.until || "09:00"}
                                            onChange={(e) => onUpdate({
                                                pickupWindow: { ...(data.pickupWindow || {}), until: e.target.value }
                                            })}
                                            className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary text-sm font-black">check</span>
                                    </div>
                                    <span className="text-sm text-primary font-bold">
                                        Calculated Window: {(data.pickupWindow?.from || "08:00")} - {(data.pickupWindow?.until || "09:00")}
                                    </span>
                                </div>
                                <div className="hidden sm:flex items-center gap-1 text-[10px] uppercase font-black tracking-widest text-slate-400">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                    Availability Confirmed
                                </div>
                            </div>
                        </div>

                        {/* Contact for Questions */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-secondary text-sm">phone</span>
                                <h3 className="font-bold">Contact for Questions</h3>
                            </div>
                            <input
                                type="tel"
                                placeholder="Phone number (for driver inquiries)"
                                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                value={data.pickupContact?.phone || ""}
                                onChange={(e) => onUpdate({
                                    pickupContact: { ...data.pickupContact, phone: e.target.value }
                                })}
                            />
                        </div>

                        {/* Additional Information */}
                        <div>
                            <button
                                onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
                                type="button"
                                className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">description</span>
                                Additional Information (optional)
                                <span className="material-symbols-outlined text-sm">
                                    {showAdditionalInfo ? "expand_less" : "expand_more"}
                                </span>
                            </button>

                            {showAdditionalInfo && (
                                <div className="mt-3">
                                    <textarea
                                        rows={3}
                                        placeholder="Additional instructions for the driver..."
                                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                                        value={data.pickupInstructions || ""}
                                        onChange={(e) => onUpdate({ pickupInstructions: e.target.value })}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Extra Pickups */}
            {data.extraPickups?.map((pickup: any, index: number) => {
                const details = pickup.details || {};
                const updateDetails = (updates: any) => {
                    const newList = [...data.extraPickups];
                    newList[index] = { ...newList[index], details: { ...newList[index].details, ...updates } };
                    onUpdate({ extraPickups: newList });
                };

                return (
                    <div key={`extra-pickup-${index}`} className="mt-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                                </div>
                                <span className="font-bold">Stop {index + 1}: {pickup.address || 'Address'}</span>
                            </div>
                        </div>

                        <div className="p-6 space-y-8">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-primary text-sm">person</span>
                                    <h3 className="font-bold">Contact Person</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                            value={details.firstName || ""}
                                            onChange={(e) => updateDetails({ firstName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                            value={details.lastName || ""}
                                            onChange={(e) => updateDetails({ lastName: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-secondary text-sm">location_on</span>
                                    <h3 className="font-bold">Exact Address Details</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div className="md:col-span-2">
                                        <input
                                            type="text"
                                            placeholder="Street"
                                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                            value={details.street || ""}
                                            onChange={(e) => updateDetails({ street: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="No."
                                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                            value={details.number || ""}
                                            onChange={(e) => updateDetails({ number: e.target.value })}
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
                    Continue to Delivery
                </button>
            </div>
        </div>
    );
}