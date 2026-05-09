"use client";

import type { PackageFilterDraft } from "@/hooks/use-package-filters";
import type { AvailablePackageFilters } from "@/lib/nelios-types";
import { CloseIcon } from "@/components/packages/icons";
import { FilterCheckboxGroup } from "@/components/packages/filter-checkbox-group";
import { PriceFilter } from "@/components/packages/price-filter";

type FiltersPanelProps = {
  draft: PackageFilterDraft;
  filters: AvailablePackageFilters;
  isDrawer?: boolean;
  onApply: () => void;
  onChange: (patch: Partial<PackageFilterDraft>) => void;
  onClear: () => void;
  onClose?: () => void;
};

export function FiltersPanel({
  draft,
  filters,
  isDrawer = false,
  onApply,
  onChange,
  onClear,
  onClose,
}: FiltersPanelProps) {
  const panelClasses = isDrawer
    ? "flex h-full w-full max-w-[360px] flex-col gap-8 overflow-y-auto rounded-r-[10px] bg-white p-6 shadow-[0_18px_38px_rgba(85,85,99,0.22)]"
    : "flex flex-col gap-8 rounded-[8px] bg-white p-7 shadow-[0_12px_35px_rgba(85,85,99,0.08)]";

  return (
    <aside className={panelClasses}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-h7 uppercase text-brand-black">ΦΙΛΤΡΑ</h2>
        {isDrawer ? (
          <button
            aria-label="Κλείσιμο φίλτρων"
            className="grid h-12 w-12 place-items-center rounded-full bg-white text-gray shadow-[0_14px_28px_rgba(85,85,99,0.22)]"
            onClick={onClose}
            type="button"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        ) : null}
      </div>

      <PriceFilter
        draft={draft}
        isDrawer={isDrawer}
        onChange={onChange}
        price={filters.price}
      />

      <div className="flex flex-col gap-6">
        <FilterCheckboxGroup
          activeValue={draft.hotelStars}
          onChange={(hotelStars) => onChange({ hotelStars })}
          options={filters.hotelStars}
          title="Αστέρια Ξενοδοχείου"
        />
        <FilterCheckboxGroup
          activeValue={draft.travelStyle}
          onChange={(travelStyle) => onChange({ travelStyle })}
          options={filters.travelStyles}
          title="Τρόπος Ταξιδιού"
        />
      </div>

      <div className="grid gap-3">
        <button
          className="h-12 rounded-[8px] bg-accent-green px-7 text-button text-white transition duration-200 hover:bg-[#00843f]"
          onClick={onApply}
          type="button"
        >
          Εφαρμογή
        </button>
        <button
          className="h-10 rounded-[8px] border border-field-border bg-white px-7 text-button text-gray"
          onClick={onClear}
          type="button"
        >
          Καθαρισμός
        </button>
      </div>
    </aside>
  );
}
