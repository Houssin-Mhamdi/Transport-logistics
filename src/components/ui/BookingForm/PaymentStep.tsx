"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { phoneNumber, email } from "@/lib/constants";

interface PaymentStepProps {
  data: any;
  onUpdate: (updates: any) => void;
  onBack: () => void;
  price: string;
}

type PaymentMethod = "credit_card" | "paypal" | "bank_transfer" | "invoice";

export default function PaymentStep({ data, onUpdate, onBack, price }: PaymentStepProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit_card");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const netPrice = parseFloat(price);
  const vat = netPrice * 0.19;
  const totalPrice = netPrice + vat;

  const handleBookNow = () => {
    if (!acceptedTerms) return;
    
    setIsBooking(true);
    // Simulate booking process
    setTimeout(() => {
      alert("Booking successful! Confirmation email sent.");
      setIsBooking(false);
      // Here you would redirect to a success page
    }, 2000);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black mb-2 tracking-tight">Payment & Summary</h1>
        <p className="text-on-surface-variant font-medium">Review your details and select your payment method</p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Top Section - Overview */}
        <div className="w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-primary">Order Summary</h2>
              <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-black uppercase tracking-widest rounded-full">
                Review Details
              </span>
            </div>

            <div className="space-y-10">
              {/* Pickup & Delivery */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                  <span className="material-symbols-outlined text-slate-200 dark:text-slate-800 text-4xl">
                    arrow_forward_ios
                  </span>
                </div>

                {/* Pickup Summary */}
                <div className="space-y-3 p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-sm font-black">location_on</span>
                    </div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Pickup</h3>
                  </div>
                  <p className="font-black text-lg text-slate-800 dark:text-slate-200">
                    {data.pickupContact?.company ? `${data.pickupContact.company} • ` : ""}
                    {data.pickupContact?.firstName || '—'} {data.pickupContact?.lastName || ''}
                  </p>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {data.pickupDetails?.street} {data.pickupDetails?.number}<br/>
                    <span className="font-bold">{data.pickupDetails?.postalCode} {data.pickupDetails?.city}</span> ({data.pickupDetails?.country})
                  </p>
                  <div className="pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
                    <p className="text-sm font-black text-primary flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">event</span>
                      {formatDate(data.pickupDate)}
                    </p>
                    <p className="text-xs font-bold text-slate-500 mt-1 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      Window: {data.pickupWindow?.from || "08:00"} - {data.pickupWindow?.until || "09:00"}
                    </p>
                  </div>
                </div>

                {/* Delivery Summary */}
                <div className="space-y-6">
                  {/* Main Delivery */}
                  <div className="space-y-3 p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-sm font-black">near_me</span>
                      </div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Main Delivery</h3>
                    </div>
                    <p className="font-black text-lg text-slate-800 dark:text-slate-200">
                      {data.deliveryContact?.company ? `${data.deliveryContact.company} • ` : ""}
                      {data.deliveryContact?.firstName || '—'} {data.deliveryContact?.lastName || ''}
                    </p>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {data.deliveryDetails?.street} {data.deliveryDetails?.number}<br/>
                      <span className="font-bold">{data.deliveryDetails?.postalCode} {data.deliveryDetails?.city}</span> ({data.deliveryDetails?.country})
                    </p>
                    <div className="pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
                      <p className="text-sm font-black text-secondary flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">event</span>
                        {formatDate(data.deliveryDate)}
                      </p>
                      <p className="text-xs font-bold text-slate-500 mt-1 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        Window: {data.deliveryWindow?.from || "15:00"} - {data.deliveryWindow?.until || "16:00"}
                      </p>
                    </div>
                  </div>

                  {/* Extra Deliveries */}
                  {data.extraDeliveries?.map((delivery: any, idx: number) => (
                    <div key={idx} className="space-y-3 p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 relative">
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-secondary text-white text-[10px] font-black rounded italic">Stop {idx + 1}</span>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                          <span className="material-symbols-outlined text-[10px] font-black">near_me</span>
                        </div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Additional Stop</h3>
                      </div>
                      <p className="font-bold text-slate-700 dark:text-slate-300">
                        {delivery.details?.company ? `${delivery.details.company} • ` : ""}
                        {delivery.details?.firstName || '—'} {delivery.details?.lastName || ''}
                      </p>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        {delivery.details?.street} {delivery.details?.number}<br/>
                        <span className="font-bold">{delivery.address}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipment Items */}
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">inventory_2</span>
                  Shipment Items
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.shipments?.map((shipment: any) => (
                    <div key={shipment.id} className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="w-10 h-10 shrink-0 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center font-black text-primary">
                        {shipment.quantity}x
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm capitalize truncate">{shipment.shipmentType}</p>
                        <p className="text-[10px] font-black text-on-surface-variant mt-0.5">
                          {shipment.weight} kg • {shipment.length}×{shipment.width}×{shipment.height} cm
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vehicle & Route */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-primary/5 rounded-3xl border-2 border-primary/10">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary/60 mb-4">Selected Vehicle</h3>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl bg-white dark:bg-slate-900 w-16 h-16 rounded-full flex items-center justify-center shadow-md">
                      {data.selectedVehicle === 'pkw_kombi' ? '🚗' : 
                       data.selectedVehicle === 'transporter' ? '🚐' : 
                       data.selectedVehicle === 'koffer' ? '🚚' : '🚛'}
                    </div>
                    <div>
                      <p className="font-black text-primary text-xl capitalize">{data.selectedVehicle?.replace("_", " ")}</p>
                      <p className="text-xs font-bold text-slate-500">Asset type confirmed by driver</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border-2 border-slate-100 dark:border-slate-700/50">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Route Info</h3>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-black text-slate-800 dark:text-slate-200 tracking-tighter">{data.distance} <span className="text-lg">km</span></p>
                      <p className="text-xs font-bold text-slate-500">Total Distance</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-slate-800 dark:text-slate-200">{data.duration}</p>
                      <p className="text-xs font-bold text-slate-500">Est. Duration</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice Address Detailed */}
              <div className="p-8 bg-slate-900 dark:bg-black rounded-[2.5rem] text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12">
                   <span className="material-symbols-outlined text-[120px]">receipt_long</span>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                       <span className="material-symbols-outlined text-sm">description</span>
                       Billing & Invoice Details
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <p className="font-black text-xl mb-2">
                        {data.invoiceAddress?.company && `${data.invoiceAddress.company} • `}
                        {data.invoiceAddress?.firstName} {data.invoiceAddress?.lastName}
                      </p>
                      <p className="text-white/60 leading-relaxed font-medium">
                        {data.invoiceAddress?.street} {data.invoiceAddress?.number}<br/>
                        {data.invoiceAddress?.postalCode} {data.invoiceAddress?.city} ({data.invoiceAddress?.country})
                      </p>
                    </div>
                    <div className="md:border-l md:border-white/10 md:pl-8 space-y-3">
                      <p className="flex items-center gap-3 text-white/80 font-bold">
                        <span className="material-symbols-outlined text-primary">phone</span>
                        {data.invoiceAddress?.phone || '—'}
                      </p>
                      <p className="flex items-center gap-3 text-white/80 font-bold underline decoration-primary underline-offset-4">
                        <span className="material-symbols-outlined text-primary">mail</span>
                        {data.invoiceAddress?.email || '—'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border-2 border-slate-100 dark:border-slate-800">
                <div className="space-y-5">
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="text-sm font-black uppercase tracking-[0.2em]">Net Service Price</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">{netPrice.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="text-sm font-black uppercase tracking-[0.2em]">VAT (19%)</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">{vat.toFixed(2)} €</span>
                  </div>
                  <div className="pt-8 border-t-4 border-double border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-4xl font-black text-primary tracking-tighter">
                           {totalPrice.toFixed(2)} <span className="text-2xl">€</span>
                        </p>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Total inclusive VAT</p>
                      </div>
                      <div className="text-right hidden sm:block">
                        <span className="px-4 py-2 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">Best Price Guarantee</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Payment */}
        <div className="w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <h2 className="text-2xl font-black mb-8">Select Payment Method</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* Credit Card */}
              <div
                onClick={() => setPaymentMethod("credit_card")}
                className={`group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  paymentMethod === "credit_card"
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-slate-100 dark:border-slate-800 hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    paymentMethod === "credit_card" ? "border-primary bg-primary" : "border-slate-300 group-hover:border-primary"
                  }`}>
                    {paymentMethod === "credit_card" && (
                      <span className="material-symbols-outlined text-white text-xs font-black">done</span>
                    )}
                  </div>
                  <span className="material-symbols-outlined text-3xl text-primary">credit_card</span>
                </div>
                <p className="font-black text-lg">Card</p>
                <p className="text-xs text-slate-500 mt-1">Secure via Stripe</p>
              </div>

              {/* PayPal */}
              <div
                onClick={() => setPaymentMethod("paypal")}
                className={`group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  paymentMethod === "paypal"
                    ? "border-[#0070ba] bg-[#0070ba]/5 shadow-lg shadow-[#0070ba]/10"
                    : "border-slate-100 dark:border-slate-800 hover:border-[#0070ba]/50"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    paymentMethod === "paypal" ? "border-[#0070ba] bg-[#0070ba]" : "border-slate-300 group-hover:border-[#0070ba]"
                  }`}>
                    {paymentMethod === "paypal" && (
                      <span className="material-symbols-outlined text-white text-xs font-black">done</span>
                    )}
                  </div>
                  <span className="material-symbols-outlined text-3xl text-[#0070ba]">account_balance_wallet</span>
                </div>
                <p className="font-black text-lg">PayPal</p>
                <p className="text-xs text-slate-500 mt-1">Fast Checkout</p>
              </div>

              {/* Invoice */}
              <div
                onClick={() => setPaymentMethod("invoice")}
                className={`group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  paymentMethod === "invoice"
                    ? "border-slate-900 bg-slate-900/5 shadow-lg"
                    : "border-slate-100 dark:border-slate-800 hover:border-slate-900/50"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    paymentMethod === "invoice" ? "border-slate-900 bg-slate-900" : "border-slate-300 group-hover:border-slate-900"
                  }`}>
                    {paymentMethod === "invoice" && (
                      <span className="material-symbols-outlined text-white text-xs font-black">done</span>
                    )}
                  </div>
                  <span className="material-symbols-outlined text-3xl text-slate-900">receipt_long</span>
                </div>
                <p className="font-black text-lg">Bank Transfer</p>
                <p className="text-xs text-slate-500 mt-1">Invoice Payment</p>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
              <label className="flex items-start gap-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-6 h-6 mt-0.5 rounded-lg border-slate-300 text-primary focus:ring-primary transition-all cursor-pointer"
                />
                <span className="text-sm text-on-surface-variant font-medium leading-relaxed">
                  I have read and accept the{" "}
                  <Link href="/terms" target="_blank" className="text-primary hover:underline font-black">Terms and Conditions</Link>{" "}
                  and{" "}
                  <Link href="/privacy" target="_blank" className="text-primary hover:underline font-black">Privacy Policy</Link>. 
                  I confirm that all provided data is correct.
                </span>
              </label>
            </div>

            {/* Book Button */}
            <button
              onClick={handleBookNow}
              disabled={!acceptedTerms || isBooking}
              className="w-full py-5 bg-primary hover:bg-primary-hover disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-black text-xl rounded-2xl shadow-2xl shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3 overflow-hidden group relative"
            >
              {isBooking ? (
                <>
                  <span className="material-symbols-outlined animate-spin font-black">progress_activity</span>
                  Finalizing Order...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined font-black group-hover:translate-x-1 transition-transform">shopping_cart_checkout</span>
                  Proceed and Book Now
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-12 bg-slate-100 dark:bg-slate-800/40 rounded-[2.5rem] p-10 text-center border-2 border-white dark:border-slate-800">
        <h3 className="font-black text-2xl mb-8">Need Assistance?</h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
          <button className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-black rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined">phone_in_talk</span>
            {phoneNumber}
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-green-500 text-white font-black rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-500/20">
            <span className="material-symbols-outlined">chat</span>
            WhatsApp Support
          </button>
        </div>
      </div>
    </div>
  );
}