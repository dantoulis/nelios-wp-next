"use client";

import type { SortOption } from "@/lib/nelios-types";
import { ChevronIcon } from "@/components/packages/icons";

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Δημοφιλή", value: "popular" },
  { label: "Τιμή αύξουσα", value: "price_asc" },
  { label: "Τιμή φθίνουσα", value: "price_desc" },
];

type SortSelectProps = {
  className?: string;
  onChange: (sort: SortOption) => void;
  value: SortOption;
};

export function SortSelect({
  className = "",
  onChange,
  value,
}: SortSelectProps) {
  return (
    <label className={`relative block ${className}`}>
      <span className="sr-only">Ταξινόμηση</span>
      <select
        className="h-10 w-full appearance-none rounded-[6px] border border-field-border bg-white px-4 pr-10 text-field-text-14 text-gray outline-none"
        onChange={(event) => onChange(event.target.value as SortOption)}
        value={value}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray" />
    </label>
  );
}
