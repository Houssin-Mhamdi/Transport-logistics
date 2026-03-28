"use client";

import { useState, useEffect, useRef } from "react";

interface Place {
  display_name: string;
  lat: string;
  lon: string;
}

interface PlacesAutocompleteProps {
  label?: string;
  icon?: string;
  value: string;
  onChange: (value: string, coordinates?: { lat: number; lng: number }) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function PlacesAutocomplete({
  label,
  icon,
  value,
  onChange,
  placeholder,
  disabled = false,
}: PlacesAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync internal query state with external value only if they differ significantly
  useEffect(() => {
    if (value?.toLowerCase() !== query?.toLowerCase()) {
      setQuery(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchPlaces = async () => {
      if (!query || query.length < 3) {
        setSuggestions([]);
        return;
      }
      
      if (query.toLowerCase() === value?.toLowerCase() && suggestions.length > 0) {
          return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`
        );
        const data = await response.json();
        setSuggestions(data || []);
        setIsOpen(true);
      } catch (error) {
        console.error("Error fetching places:", error);
        setSuggestions([]);
        setIsOpen(false);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchPlaces, 500);
    return () => clearTimeout(timeoutId);
  }, [query, value, suggestions.length]);

  const handleSelect = (place: Place) => {
    const coords = { 
      lat: parseFloat(place.lat), 
      lng: parseFloat(place.lon) 
    };
    setQuery(place.display_name);
    onChange(place.display_name, coords);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setQuery(newVal);
    // While typing, we clear coordinates and close previous results
    setSuggestions([]);
    setIsOpen(false);
    onChange(newVal); 
  };

  return (
    <div className="relative" ref={wrapperRef}>
      {label && (
        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-sm z-10">
            {icon}
          </span>
        )}
        <input
          className={`w-full bg-surface-container-low border-none rounded-md ${icon ? "pl-12" : "pl-4"} pr-10 py-4 text-primary font-semibold focus:ring-2 focus:ring-primary/20 transition-all outline-none disabled:opacity-50 relative z-0`}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
          placeholder={placeholder}
          disabled={disabled}
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin z-10" />
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-surface-container border border-outline-variant/20 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((place, index) => (
            <li
              key={`${place.lat}-${place.lon}-${index}`}
              className="px-4 py-3 hover:bg-surface-container-high cursor-pointer transition-colors text-sm text-on-surface border-b border-outline-variant/10 last:border-none"
              onClick={() => handleSelect(place)}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
