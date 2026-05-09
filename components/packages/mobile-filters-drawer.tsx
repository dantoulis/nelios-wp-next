"use client";

import type { PackageFilterDraft } from "@/hooks/use-package-filters";
import type { AvailablePackageFilters } from "@/lib/nelios-types";
import { FiltersPanel } from "@/components/packages/filters-panel";

type MobileFiltersDrawerProps = {
  draft: PackageFilterDraft;
  filters: AvailablePackageFilters;
  isOpen: boolean;
  onApply: () => void;
  onChange: (patch: Partial<PackageFilterDraft>) => void;
  onClear: () => void;
  onClose: () => void;
};

export function MobileFiltersDrawer({
  draft,
  filters,
  isOpen,
  onApply,
  onChange,
  onClear,
  onClose,
}: MobileFiltersDrawerProps) {
  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 md:hidden ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      id="mobile-filters"
    >
      <button
        aria-label="Κλείσιμο φίλτρων"
        className={`absolute inset-0 bg-pure-black/25 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        type="button"
      />
      <div
        className={`relative h-full transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <FiltersPanel
          draft={draft}
          filters={filters}
          isDrawer
          onApply={onApply}
          onChange={onChange}
          onClear={onClear}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
