"use client";

interface LocationInputProps {
  label: string;
  icon: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function LocationInput({
  label,
  icon,
  value,
  onChange,
  placeholder,
  disabled = false,
}: LocationInputProps) {
  return (
    <div className="relative">
      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-sm">
          {icon}
        </span>
        <input
          className="w-full bg-surface-container-low border-none rounded-md pl-12 pr-4 py-4 text-primary font-semibold focus:ring-2 focus:ring-primary/20 transition-all outline-none disabled:opacity-50"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
    </div>
  );
}