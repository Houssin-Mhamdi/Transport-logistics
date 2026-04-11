"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";

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
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Payment & Summary</h1>
        <p className="text-on-surface-variant">Review your details and select your payment method</p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Top Section - Overview */}
        <div className="w-full">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Overview</h2>

            <div className="space-y-6">
              {/* Pickup & Delivery */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Pickup</h3>
                  <p className="font-semibold">{data.pickupContact?.company || data.pickupContact?.firstName}</p>
                  <p className="text-sm text-on-surface-variant">
                    {data.pickupAddress?.street} {data.pickupAddress?.number}<br/>
                    {data.pickupAddress?.postalCode} {data.pickupAddress?.city}
                  </p>
                  <p className="text-sm text-primary mt-2">
                    {formatDate(data.pickupDate)} • {data.pickupTimeFrom} - {data.pickupTimeTo}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Delivery</h3>
                  <p className="font-semibold">{data.deliveryContact?.company || data.deliveryContact?.firstName}</p>
                  <p className="text-sm text-on-surface-variant">
                    {data.deliveryAddress?.street} {data.deliveryAddress?.number}<br/>
                    {data.deliveryAddress?.postalCode} {data.deliveryAddress?.city}
                  </p>
                  <p className="text-sm text-secondary mt-2">
                    {formatDate(data.deliveryDate)} • {data.deliveryTimeFrom} - {data.deliveryTimeTo}
                  </p>
                </div>
              </div>

              {/* Shipment & Vehicle */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Shipment</h3>
                  <p className="font-semibold">1x {data.shipmentType}</p>
                  <p className="text-sm text-on-surface-variant">
                    {data.weight} kg • {data.length}×{data.width}×{data.height} cm
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Vehicle</h3>
                  <p className="font-semibold capitalize">{data.selectedVehicle?.replace("_", " ")}</p>
                  <p className="text-sm text-on-surface-variant">
                    {data.distance} km
                  </p>
                </div>
              </div>

              {/* Invoice Address */}
              <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Invoice</h3>
                <p className="font-semibold">
                  {data.invoiceAddress?.company && `${data.invoiceAddress.company} • `}
                  {data.invoiceAddress?.firstName} {data.invoiceAddress?.lastName}
                </p>
                <p className="text-sm text-on-surface-variant">
                  {data.invoiceAddress?.street} {data.invoiceAddress?.number}<br/>
                  {data.invoiceAddress?.postalCode} {data.invoiceAddress?.city} ({data.invoiceAddress?.country})
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined text-sm">phone</span>
                    {data.invoiceAddress?.phone}
                  </span>
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined text-sm">email</span>
                    {data.invoiceAddress?.email}
                  </span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Netto</span>
                  <span className="font-semibold">{netPrice.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">VAT 19%</span>
                  <span className="font-semibold">{vat.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-black text-primary">{totalPrice.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Payment */}
        <div className="w-full">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Select Payment Method</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {/* Credit Card */}
              <div
                onClick={() => setPaymentMethod("credit_card")}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  paymentMethod === "credit_card"
                    ? "border-primary bg-primary/5"
                    : "border-slate-200 dark:border-slate-700 hover:border-primary/50"
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      paymentMethod === "credit_card" ? "border-primary bg-primary" : "border-slate-400"
                    }`}>
                      {paymentMethod === "credit_card" && (
                        <span className="material-symbols-outlined text-white text-xs">check</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">credit_card</span>
                      <span className="font-bold">Card</span>
                    </div>
                  </div>
                  <p className="text-xs text-on-surface-variant ml-8 mb-3">
                    Secure and instant payment via Stripe
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 ml-8 mt-auto">
                  <span className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[10px] font-medium">Credit</span>
                  <span className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[10px] font-medium">Debit</span>
                </div>
              </div>

              {/* PayPal */}
              <div
                onClick={() => setPaymentMethod("paypal")}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  paymentMethod === "paypal"
                    ? "border-[#0070ba] bg-[#0070ba]/5"
                    : "border-slate-200 dark:border-slate-700 hover:border-[#0070ba]/50"
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      paymentMethod === "paypal" ? "border-[#0070ba] bg-[#0070ba]" : "border-slate-400"
                    }`}>
                      {paymentMethod === "paypal" && (
                        <span className="material-symbols-outlined text-white text-xs">check</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#0070ba]">account_balance_wallet</span>
                      <span className="font-bold">PayPal</span>
                    </div>
                  </div>
                  <p className="text-xs text-on-surface-variant ml-8">
                    Pay conveniently with your account
                  </p>
                </div>
                <div className="mt-3 ml-8">
                  <span className="px-3 py-1 bg-[#0070ba] text-white rounded text-[10px] font-bold italic">PayPal</span>
                </div>
              </div>

              {/* Bank Transfer / Invoice */}
              <div
                onClick={() => setPaymentMethod("invoice")}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  paymentMethod === "invoice"
                    ? "border-primary bg-primary/5"
                    : "border-slate-200 dark:border-slate-700 hover:border-primary/50"
                }`}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      paymentMethod === "invoice" ? "border-primary bg-primary" : "border-slate-400"
                    }`}>
                      {paymentMethod === "invoice" && (
                        <span className="material-symbols-outlined text-white text-xs">check</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">receipt_long</span>
                      <span className="font-bold">Invoice / Bank</span>
                    </div>
                  </div>
                  <p className="text-xs text-on-surface-variant ml-8 mt-2">
                    Pay later via bank transfer
                  </p>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-5 h-5 mt-0.5 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-on-surface-variant">
                  I have read and accept the{" "}
                  <Link href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">Terms and Conditions</Link>{" "}
                  and{" "}
                  <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">Privacy Policy</Link>.
                </span>
              </label>
            </div>

            {/* Book Button */}
            <button
              onClick={handleBookNow}
              disabled={!acceptedTerms || isBooking}
              className="w-full py-4 bg-primary hover:bg-primary-hover disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl shadow-xl shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isBooking ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Processing...
                </>
              ) : (
                "Book Now"
              )}
            </button>

            <p className="text-xs text-center text-on-surface-variant mt-4">
              Secure SSL encryption • Instant confirmation
            </p>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 text-center border border-slate-200 dark:border-slate-800">
        <h3 className="font-bold text-lg mb-6">Need help? We're here for you!</h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all flex items-center gap-2">
            <span className="material-symbols-outlined">phone</span>
            Call Now
          </button>
          <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all flex items-center gap-2">
            <span className="material-symbols-outlined">chat</span>
            WhatsApp
          </button>
        </div>
        <div className="text-sm text-on-surface-variant space-y-1">
          <p>Phone: +49 2233 5459590</p>
          <p>Email: anfrage@navidex.de</p>
        </div>
        <div className="flex items-center justify-center gap-4 mt-6 text-xs text-slate-400">
          <a href="#" className="hover:text-primary">Imprint</a>
          <span>•</span>
          <a href="#" className="hover:text-primary">Terms</a>
          <span>•</span>
          <a href="#" className="hover:text-primary">Privacy</a>
        </div>
      </div>
    </div>
  );
}