"use client";

import { useState } from "react";

interface DeliveryStepProps {
  data: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function DeliveryStep({ data, onUpdate, onNext, onBack }: DeliveryStepProps) {
  const [showDestination, setShowDestination] = useState(true);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [deliveryTimeFrom, setDeliveryTimeFrom] = useState("15:00");
  const [deliveryTimeTo, setDeliveryTimeTo] = useState("16:00");
  const [deliveryDate, setDeliveryDate] = useState("2026-04-13");

  const cityValue = data.deliveryDetails?.city || "Cologne";

  const isFormComplete = !!(
                         data.deliveryContact?.firstName && 
                         data.deliveryContact?.lastName && 
                         data.deliveryDetails?.street && 
                         data.deliveryDetails?.number && 
                         data.deliveryDetails?.postalCode && 
                         cityValue
  );

  // Calculate delivery date based on pickup + transit time
  const getDeliveryDateDisplay = () => {
    const date = new Date(deliveryDate);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Enter Delivery Details</h1>
        <p className="text-on-surface-variant">Provide complete delivery address information</p>
      </div>

      {/* Form Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Destination Location Toggle */}
        <button
          onClick={() => setShowDestination(!showDestination)}
          className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50"
          type="button"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-sm">near_me</span>
            </div>
            <div>
              <span className="font-bold block">Destination Location</span>
              {data.deliveryDetails?.street ? (
                <span className="text-sm text-on-surface-variant">
                  {data.deliveryDetails?.street}, {data.deliveryDetails?.postalCode} {data.deliveryDetails?.city || "Cologne"}
                </span>
              ) : (
                <span className="text-sm text-on-surface-variant">{data.deliveryAddress}</span>
              )}
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-400">
            {showDestination ? "expand_less" : "expand_more"}
          </span>
        </button>

        {showDestination && (
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
                  value={data.deliveryContact?.company || ""}
                  onChange={(e) => onUpdate({ 
                    deliveryContact: { ...data.deliveryContact, company: e.target.value }
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
                    value={data.deliveryContact?.firstName || ""}
                    onChange={(e) => onUpdate({ 
                      deliveryContact: { ...data.deliveryContact, firstName: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name *"
                    required
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    value={data.deliveryContact?.lastName || ""}
                    onChange={(e) => onUpdate({ 
                      deliveryContact: { ...data.deliveryContact, lastName: e.target.value }
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
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Street *"
                      required
                      className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none pr-10"
                      value={data.deliveryDetails?.street || ""}
                      onChange={(e) => onUpdate({ 
                        deliveryDetails: { ...data.deliveryDetails, street: e.target.value }
                      })}
                    />
                    <button 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-sm">my_location</span>
                    </button>
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="No. *"
                    required
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    value={data.deliveryDetails?.number || ""}
                    onChange={(e) => onUpdate({ 
                      deliveryDetails: { ...data.deliveryDetails, number: e.target.value }
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
                    value={data.deliveryDetails?.postalCode || ""}
                    onChange={(e) => onUpdate({ 
                      deliveryDetails: { ...data.deliveryDetails, postalCode: e.target.value }
                    })}
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none pr-10"
                      value={data.deliveryDetails?.city || "Cologne"}
                      onChange={(e) => onUpdate({ 
                        deliveryDetails: { ...data.deliveryDetails, city: e.target.value }
                      })}
                    />
                    <button 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-sm">public</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <select
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm"
                  value={data.deliveryDetails?.country || "DE"}
                  onChange={(e) => onUpdate({ 
                    deliveryDetails: { ...data.deliveryDetails, country: e.target.value }
                  })}
                >
                  <option value="DE">🇩🇪 Germany</option>
                  <option value="NL">🇳 Netherlands</option>
                  <option value="FR">🇫🇷 France</option>
                  <option value="BE">🇧 Belgium</option>
                  <option value="AT">🇦🇹 Austria</option>
                  <option value="CH">🇨🇭 Switzerland</option>
                </select>
              </div>

              <p className="text-xs text-slate-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">info</span>
                City and country taken from Step 1 (postal code adjustable)
              </p>
            </div>

            {/* Delivery Date & Time Window */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-sm">event</span>
                <h3 className="font-bold text-green-800 dark:text-green-300">
                  Desired Delivery Date & Time Window *
                </h3>
              </div>
              
              {/* Transit Time Info */}
              <p className="text-sm text-green-700 dark:text-green-400 mb-4">
                Transit time: 6 hrs 8 min
              </p>

              {/* Date Selection */}
              <div className="mb-4">
                <label className="block text-xs font-semibold mb-2 text-green-800 dark:text-green-300">
                  Delivery Date
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    calendar_today
                  </span>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-green-200 dark:border-green-800 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              {/* Time Window */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-2 text-green-800 dark:text-green-300">
                    From (earliest)
                  </label>
                  <input
                    type="time"
                    value={deliveryTimeFrom}
                    onChange={(e) => setDeliveryTimeFrom(e.target.value)}
                    className="w-full px-4 py-3 border border-green-200 dark:border-green-800 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 text-green-800 dark:text-green-300">
                    Until (latest)
                  </label>
                  <input
                    type="time"
                    value={deliveryTimeTo}
                    onChange={(e) => setDeliveryTimeTo(e.target.value)}
                    className="w-full px-4 py-3 border border-green-200 dark:border-green-800 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              {/* Confirmation */}
              <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-sm">check</span>
                <span className="text-sm text-green-700 dark:text-green-300 font-medium">
                  Delivery on {new Date(deliveryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} between {deliveryTimeFrom} and {deliveryTimeTo}
                </span>
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
                value={data.deliveryContact?.phone || ""}
                onChange={(e) => onUpdate({ 
                  deliveryContact: { ...data.deliveryContact, phone: e.target.value }
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
                    placeholder="Additional instructions for the driver (e.g., gate code, delivery instructions)..."
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                    value={data.deliveryInstructions || ""}
                    onChange={(e) => onUpdate({ deliveryInstructions: e.target.value })}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

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
          Continue to Invoice Address
        </button>
      </div>
    </div>
  );
}