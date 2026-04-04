"use client";

interface ShipmentStepProps {
  data: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const shipmentTypes = [
  {
    id: "package",
    icon: "package_2",
    title: "Package",
    description: "Cartons, small shipments",
  },
  {
    id: "documents",
    icon: "description",
    title: "Documents",
    description: "Notices, letters, files • Documented delivery with proof",
  },
  {
    id: "pallet",
    icon: "inventory",
    title: "Pallet",
    description: "Euro pallets, cage boxes",
  },
  {
    id: "vehicle",
    icon: "directions_car",
    title: "Complete Vehicle",
    description: "Furniture, bulky goods, special",
  },
];

export default function ShipmentStep({ data, onUpdate, onNext, onBack }: ShipmentStepProps) {
  const updateShipment = (id: string, updates: any) => {
    onUpdate({
      shipments: data.shipments.map((s: any) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    });
  };

  const addShipment = () => {
    onUpdate({
      shipments: [
        ...data.shipments,
        {
          id: `shipment-${Date.now()}`,
          shipmentType: "package",
          quantity: 1,
          weight: 0,
          length: 0,
          width: 0,
          height: 0,
          description: "",
        },
      ],
    });
  };

  const removeShipment = (id: string) => {
    if (data.shipments.length > 1) {
      onUpdate({
        shipments: data.shipments.filter((s: any) => s.id !== id),
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Enter Shipment</h1>
        <p className="text-on-surface-variant">Describe what should be transported</p>
      </div>

      {data.shipments.map((shipment: any, index: number) => (
        <div key={shipment.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">{index + 1}</span>
              </div>
              <h2 className="text-xl font-bold">Shipment {index + 1}</h2>
            </div>
            {data.shipments.length > 1 && (
              <button 
                onClick={() => removeShipment(shipment.id)}
                className="w-10 h-10 rounded-full bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 flex items-center justify-center transition-colors"
                title="Remove Shipment"
              >
                <span className="material-symbols-outlined text-lg">delete</span>
              </button>
            )}
          </div>

          {/* What is being transported */}
          <div className="mb-8">
            <label className="block text-sm font-bold mb-4">What is being transported? *</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {shipmentTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => updateShipment(shipment.id, { shipmentType: type.id })}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                    shipment.shipmentType === type.id
                      ? "border-primary bg-primary/5"
                      : "border-slate-200 dark:border-slate-700 hover:border-primary/50"
                  }`}
                >
                  <div className="relative">
                    <span className="material-symbols-outlined text-4xl mb-2 block">
                      {type.icon}
                    </span>
                    {shipment.shipmentType === type.id && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-sm">check</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-sm mb-1">{type.title}</h3>
                  <p className="text-xs text-on-surface-variant">{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <label className="block text-sm font-bold mb-4">How many pieces? *</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => updateShipment(shipment.id, { quantity: Math.max(1, shipment.quantity - 1) })}
                className="w-12 h-12 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center hover:border-primary transition-colors"
              >
                <span className="material-symbols-outlined">remove</span>
              </button>
              <div className="flex-1 text-center">
                <p className="text-4xl font-black text-primary">{shipment.quantity}</p>
                <p className="text-sm text-on-surface-variant">Pieces</p>
              </div>
              <button
                onClick={() => updateShipment(shipment.id, { quantity: shipment.quantity + 1 })}
                className="w-12 h-12 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center hover:border-primary transition-colors"
              >
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <label className="block text-sm font-bold mb-2">Description (optional)</label>
            <input
              type="text"
              placeholder="e.g., Euro pallet with electronics cartons, moving boxes with dishes..."
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              value={shipment.description}
              onChange={(e) => updateShipment(shipment.id, { description: e.target.value })}
            />
          </div>

          {/* Weight & Dimensions */}
          <div className="mb-8">
            <label className="block text-sm font-bold mb-4">
              <span className="material-symbols-outlined text-sm mr-1">scale</span>
              Weight & Dimensions
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-2">Weight (kg) *</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  value={shipment.weight || ""}
                  onChange={(e) => updateShipment(shipment.id, { weight: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2">Length (cm) *</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  value={shipment.length || ""}
                  onChange={(e) => updateShipment(shipment.id, { length: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2">Width (cm) *</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  value={shipment.width || ""}
                  onChange={(e) => updateShipment(shipment.id, { width: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2">Height (cm) *</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  value={shipment.height || ""}
                  onChange={(e) => updateShipment(shipment.id, { height: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mb-2">
            <button className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover">
              <span className="material-symbols-outlined">expand_more</span>
              Additional Information (optional)
            </button>
          </div>
        </div>
      ))}

      {/* Add Another Shipment */}
      <button 
        onClick={addShipment}
        className="w-full py-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-on-surface-variant font-bold hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined">add_circle</span>
        Add Another Shipment
      </button>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
        >
          Continue to Pickup
        </button>
      </div>
    </div>
  );
}