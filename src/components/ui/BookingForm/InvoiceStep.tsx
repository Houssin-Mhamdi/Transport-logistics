"use client";

import { useState } from "react";

interface InvoiceStepProps {
  data: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onBack: () => void;
}

type CustomerType = "business" | "private";

export default function InvoiceStep({ data, onUpdate, onNext, onBack }: InvoiceStepProps) {
  const [customerType, setCustomerType] = useState<CustomerType>(data.customerType || "business");

  const isFormComplete = !!(
    (customerType === "business" ? data.invoiceAddress?.company : true) &&
    data.invoiceAddress?.firstName && 
    data.invoiceAddress?.lastName && 
    data.invoiceAddress?.street && 
    data.invoiceAddress?.number && 
    data.invoiceAddress?.postalCode && 
    data.invoiceAddress?.city && 
    data.invoiceAddress?.email && 
    data.invoiceAddress?.phone
  );

  // Copy address from pickup or delivery
  const copyFromPickup = () => {
    onUpdate({
      invoiceAddress: {
        ...data.invoiceAddress,
        company: data.pickupContact?.company || "",
        firstName: data.pickupContact?.firstName || "",
        lastName: data.pickupContact?.lastName || "",
        street: data.pickupDetails?.street || "",
        number: data.pickupDetails?.number || "",
        postalCode: data.pickupDetails?.postalCode || "",
        city: data.pickupDetails?.city || "",
        country: data.pickupDetails?.country || "DE",
      }
    });
  };

  const copyFromDelivery = () => {
    onUpdate({
      invoiceAddress: {
        ...data.invoiceAddress,
        company: data.deliveryContact?.company || "",
        firstName: data.deliveryContact?.firstName || "",
        lastName: data.deliveryContact?.lastName || "",
        street: data.deliveryDetails?.street || "",
        number: data.deliveryDetails?.number || "",
        postalCode: data.deliveryDetails?.postalCode || "",
        city: data.deliveryDetails?.city || "",
        country: data.deliveryDetails?.country || "DE",
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Invoice Address</h1>
        <p className="text-on-surface-variant">Where should the invoice be sent?</p>
      </div>

      {/* Form Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
        {/* Customer Type Toggle */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setCustomerType("business")}
            className={`p-4 rounded-xl border-2 transition-all ${
              customerType === "business"
                ? "border-primary bg-primary/5"
                : "border-slate-200 dark:border-slate-700 hover:border-primary/50"
            }`}
            type="button"
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                customerType === "business" ? "border-primary bg-primary" : "border-slate-400"
              }`}>
                {customerType === "business" && (
                  <span className="material-symbols-outlined text-white text-xs">check</span>
                )}
              </div>
              <div className="text-left">
                <p className="font-bold">Business Customer</p>
                <p className="text-xs text-on-surface-variant">Company/Enterprise</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setCustomerType("private")}
            className={`p-4 rounded-xl border-2 transition-all ${
              customerType === "private"
                ? "border-green-500 bg-green-500/10"
                : "border-slate-200 dark:border-slate-700 hover:border-green-500/50"
            }`}
            type="button"
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                customerType === "private" ? "border-green-500 bg-green-500" : "border-slate-400"
              }`}>
                {customerType === "private" && (
                  <span className="material-symbols-outlined text-white text-xs">check</span>
                )}
              </div>
              <div className="text-left">
                <p className="font-bold">Private Customer</p>
                <p className="text-xs text-on-surface-variant">Individual Person</p>
              </div>
            </div>
          </button>
        </div>

        {/* Copy Address Buttons */}
        <div>
          <label className="block text-sm font-semibold mb-3">Invoice address matches:</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={copyFromPickup}
              type="button"
              className="px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left"
            >
              <span className="material-symbols-outlined text-primary text-sm mr-2">location_on</span>
              Copy from Pickup Address
            </button>
            <button
              onClick={copyFromDelivery}
              type="button"
              className="px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg hover:border-secondary hover:bg-secondary/5 transition-all text-left"
            >
              <span className="material-symbols-outlined text-secondary text-sm mr-2">near_me</span>
              Copy from Delivery Address
            </button>
          </div>
        </div>

        {/* Company Field (Business Only) */}
        {customerType === "business" && (
          <div>
            <label className="block text-sm font-semibold mb-2">
              Company *
            </label>
            <input
              type="text"
              placeholder="Enter company name"
              required
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              value={data.invoiceAddress?.company || ""}
              onChange={(e) => onUpdate({ 
                invoiceAddress: { ...data.invoiceAddress, company: e.target.value }
              })}
            />
          </div>
        )}

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              First Name *
            </label>
            <input
              type="text"
              placeholder="Enter first name"
              required
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              value={data.invoiceAddress?.firstName || ""}
              onChange={(e) => onUpdate({ 
                invoiceAddress: { ...data.invoiceAddress, firstName: e.target.value }
              })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Last Name *
            </label>
            <input
              type="text"
              placeholder="Enter last name"
              required
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              value={data.invoiceAddress?.lastName || ""}
              onChange={(e) => onUpdate({ 
                invoiceAddress: { ...data.invoiceAddress, lastName: e.target.value }
              })}
            />
          </div>
        </div>

        {/* Address Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2">
              Street *
            </label>
            <input
              type="text"
              placeholder="Enter street name"
              required
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              value={data.invoiceAddress?.street || ""}
              onChange={(e) => onUpdate({ 
                invoiceAddress: { ...data.invoiceAddress, street: e.target.value }
              })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              House No. *
            </label>
            <input
              type="text"
              placeholder="55"
              required
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              value={data.invoiceAddress?.number || ""}
              onChange={(e) => onUpdate({ 
                invoiceAddress: { ...data.invoiceAddress, number: e.target.value }
              })}
            />
          </div>
        </div>

        {/* Postal Code, City, Country */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Postal Code *
            </label>
            <input
              type="text"
              placeholder="44"
              required
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              value={data.invoiceAddress?.postalCode || ""}
              onChange={(e) => onUpdate({ 
                invoiceAddress: { ...data.invoiceAddress, postalCode: e.target.value }
              })}
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-semibold mb-2">
              City *
            </label>
            <input
              type="text"
              placeholder="City"
              required
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              value={data.invoiceAddress?.city || ""}
              onChange={(e) => onUpdate({ 
                invoiceAddress: { ...data.invoiceAddress, city: e.target.value }
              })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Country
            </label>
            <select
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              value={data.invoiceAddress?.country || "DE"}
              onChange={(e) => onUpdate({ 
                invoiceAddress: { ...data.invoiceAddress, country: e.target.value }
              })}
            >
              <option value="DE">🇩🇪 Germany</option>
              <option value="NL">🇳 Netherlands</option>
              <option value="FR">🇫 France</option>
              <option value="BE">🇧 Belgium</option>
              <option value="AT">🇦 Austria</option>
              <option value="CH">🇨🇭 Switzerland</option>
              <option value="IT">🇮🇹 Italy</option>
              <option value="ES">🇪 Spain</option>
            </select>
          </div>
        </div>

        {/* Email for Invoice */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Email for Invoice Delivery *
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            required
            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            value={data.invoiceAddress?.email || ""}
            onChange={(e) => onUpdate({ 
              invoiceAddress: { ...data.invoiceAddress, email: e.target.value }
            })}
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            placeholder="+49 123 456782"
            required
            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            value={data.invoiceAddress?.phone || ""}
            onChange={(e) => onUpdate({ 
              invoiceAddress: { ...data.invoiceAddress, phone: e.target.value }
            })}
          />
        </div>

        {/* Invoice Reference (Optional) */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Invoice Reference (optional)
          </label>
          <input
            type="text"
            placeholder="e.g., Order number, project number, etc."
            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            value={data.invoiceAddress?.reference || ""}
            onChange={(e) => onUpdate({ 
              invoiceAddress: { ...data.invoiceAddress, reference: e.target.value }
            })}
          />
          <p className="text-xs text-slate-500 mt-2">
            This reference will appear on your invoice for better assignment
          </p>
        </div>
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
          Continue to Payment
        </button>
      </div>
    </div>
  );
}