"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RouteStep from "@/components/ui/BookingForm/RouteStep";

import TopNavBar from "@/components/ui/TopNavBar";
import Footer from "@/components/ui/Footer";
import ShipmentStep from "@/components/ui/BookingForm/ShipmentStep";
import PickupStep from "@/components/ui/BookingForm/PickupStep";
import DeliveryStep from "@/components/ui/BookingForm/DeliveryStep";
import InvoiceStep from "@/components/ui/BookingForm/InvoiceStep";
import PaymentStep from "@/components/ui/BookingForm/PaymentStep";
import BookingSummary from "@/components/ui/BookingForm/BookingSummary";

type BookingStep = "route" | "shipment" | "pickup" | "delivery" | "invoice" | "payment";

interface BookingData {
  // Route
  pickupAddress: string;
  pickupCoords?: { lat: number; lng: number };
  deliveryAddress: string;
  deliveryCoords?: { lat: number; lng: number };
  selectedVehicle: string;
  pickupDate: string;
  distance: number;
  duration: string;
  
  // Shipments
  shipments: {
    id: string;
    shipmentType: "package" | "documents" | "pallet" | "vehicle";
    quantity: number;
    weight: number;
    length: number;
    width: number;
    height: number;
    description: string;
  }[];
  
  // Pickup
  pickupTimeWindow: string;
  pickupInstructions: string;
  
  // Delivery
  deliveryTimeWindow: string;
  deliveryInstructions: string;
  
  // Invoice
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  taxId: string;
  
  // Payment
  paymentMethod: "credit_card" | "paypal" | "bank_transfer" | "invoice";
}

const steps: { id: BookingStep; label: string; icon: string }[] = [
  { id: "route", label: "Route", icon: "route" },
  { id: "shipment", label: "Shipment", icon: "inventory_2" },
  { id: "pickup", label: "Pickup", icon: "schedule" },
  { id: "delivery", label: "Delivery", icon: "local_shipping" },
  { id: "invoice", label: "Invoice", icon: "receipt_long" },
  { id: "payment", label: "Payment", icon: "payments" },
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState<BookingStep>("route");
  const [bookingData, setBookingData] = useState<BookingData>({
    pickupAddress: "",
    deliveryAddress: "",
    selectedVehicle: "pkw_kombi",
    pickupDate: "",
    distance: 0,
    duration: "",
    shipments: [
      {
        id: "shipment-1",
        shipmentType: "package",
        quantity: 1,
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        description: "",
      }
    ],
    pickupTimeWindow: "any",
    pickupInstructions: "",
    deliveryTimeWindow: "any",
    deliveryInstructions: "",
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    postalCode: "",
    country: "DE",
    taxId: "",
    paymentMethod: "credit_card",
  });

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...updates }));
  };
  
  useEffect(() => {
    const calculateDistance = async () => {
      const p = bookingData.pickupCoords;
      const d = bookingData.deliveryCoords;
      
      if (p && d && typeof p.lat === 'number' && typeof d.lat === 'number') {
        try {
          const response = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${p.lng},${p.lat};${d.lng},${d.lat}?overview=false`
          );
          const rawData = await response.json();
          if (rawData.routes && rawData.routes[0]) {
            const distKm = parseFloat((rawData.routes[0].distance / 1000).toFixed(2));
            const durationSec = rawData.routes[0].duration;
            const hours = Math.floor(durationSec / 3600);
            const minutes = Math.floor((durationSec % 3600) / 60);
            const durText = `ca. ${hours > 0 ? `${hours}h ` : ''}${minutes}min`;
            
            setBookingData((prev) => ({
              ...prev,
              distance: distKm,
              duration: durText,
            }));
          }
        } catch (error) {
          console.error("Error calculating distance:", error);
        }
      } else {
        if (bookingData.distance > 0) {
            setBookingData((prev) => ({ ...prev, distance: 0, duration: "" }));
        }
      }
    };
    
    const timeoutId = setTimeout(calculateDistance, 800);
    return () => clearTimeout(timeoutId);
  }, [bookingData.pickupCoords, bookingData.deliveryCoords]);

  const nextStep = () => {
    const stepIndex = steps.findIndex((s) => s.id === currentStep);
    if (stepIndex < steps.length - 1) {
      setCurrentStep(steps[stepIndex + 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    const stepIndex = steps.findIndex((s) => s.id === currentStep);
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToStep = (step: BookingStep) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const calculatePriceValue = () => {
    const basePrice = 50;
    const distancePrice = bookingData.distance * 0.85;
    const vehicleMultiplier = {
      pkw_kombi: 1,
      transporter: 1.5,
      koffer: 2,
      koffer_hebebuehne: 2.5,
    }[bookingData.selectedVehicle] || 1;
    
    return (basePrice + distancePrice) * vehicleMultiplier;
  };

  const calculatePrice = () => {
    if (bookingData.distance === 0) return "0.00";
    return calculatePriceValue().toFixed(2);
  };

  return (
    <main className="min-h-screen bg-surface-container-low">
      <TopNavBar activePage="Booking" />
      
      {/* Progress Stepper */}
      <div className="sticky top-[70px] lg:top-[80px] z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto hide-scrollbar">
          <div className="flex items-start justify-between relative min-w-[700px]">
            {steps.map((step, index) => {
              const currentStepIndex = steps.findIndex((s) => s.id === currentStep);
              const isCompleted = currentStepIndex > index;
              const isCurrent = currentStepIndex === index;
              
              return (
                <div key={step.id} className="flex flex-col items-center relative flex-1">
                  <button
                    onClick={() => isCompleted && goToStep(step.id)}
                    className={`flex flex-col items-center gap-2 transition-all relative z-10 ${
                      isCompleted ? "cursor-pointer hover:opacity-80" : "cursor-default"
                    }`}
                    disabled={!isCompleted && !isCurrent}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                        isCompleted
                          ? "bg-green-500 text-white ring-4 ring-green-500/20"
                          : isCurrent
                          ? "bg-primary text-white ring-4 ring-primary/20"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                      }`}
                    >
                      {isCompleted ? (
                        <span className="material-symbols-outlined text-lg">check</span>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span
                      className={`hidden md:block text-sm font-semibold text-center ${
                        isCurrent
                          ? "text-primary"
                          : isCompleted
                          ? "text-green-600"
                          : "text-slate-500"
                      }`}
                    >
                      {step.label}
                    </span>
                  </button>
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute top-5 left-[50%] w-full h-0.5 transition-all z-0 ${
                        currentStepIndex > index ? "bg-green-500" : "bg-slate-200 dark:bg-slate-800"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === "route" && (
                <motion.div
                  key="route"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <RouteStep
                    data={bookingData}
                    onUpdate={updateBookingData}
                    onNext={nextStep}
                    price={calculatePrice()}
                  />
                </motion.div>
              )}
              
              {currentStep === "shipment" && (
                <motion.div
                  key="shipment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ShipmentStep
                    data={bookingData}
                    onUpdate={updateBookingData}
                    onNext={nextStep}
                    onBack={prevStep}
                  />
                </motion.div>
              )}
              
              {currentStep === "pickup" && (
                <motion.div
                  key="pickup"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <PickupStep
                    data={bookingData}
                    onUpdate={updateBookingData}
                    onNext={nextStep}
                    onBack={prevStep}
                  />
                </motion.div>
              )}
              
              {currentStep === "delivery" && (
                <motion.div
                  key="delivery"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <DeliveryStep
                    data={bookingData}
                    onUpdate={updateBookingData}
                    onNext={nextStep}
                    onBack={prevStep}
                  />
                </motion.div>
              )}
              
              {currentStep === "invoice" && (
                <motion.div
                  key="invoice"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <InvoiceStep
                    data={bookingData}
                    onUpdate={updateBookingData}
                    onNext={nextStep}
                    onBack={prevStep}
                  />
                </motion.div>
              )}
              
              {currentStep === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <PaymentStep
                    data={bookingData}
                    onUpdate={updateBookingData}
                    onBack={prevStep}
                    price={calculatePrice()}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-[280px]">
              <BookingSummary
                data={bookingData}
                currentStep={currentStep}
                price={calculatePrice()}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}