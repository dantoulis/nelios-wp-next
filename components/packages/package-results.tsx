"use client";

import type { PackageFilterDraft } from "@/hooks/use-package-filters";
import type {
  PackageItem,
  PackageQuery,
  PackagesResponse,
  SortOption,
} from "@/lib/nelios-types";
import { FiltersPanel } from "@/components/packages/filters-panel";
import { PackageCard } from "@/components/packages/package-card";
import { SortSelect } from "@/components/packages/sort-select";

type PackageResultsProps = {
  data: PackagesResponse;
  draft: PackageFilterDraft;
  fetchError: boolean;
  isFiltersOpen: boolean;
  isLoading: boolean;
  onApplyFilters: () => void;
  onBook: (item: PackageItem) => void;
  onChangeFilters: (patch: Partial<PackageFilterDraft>) => void;
  onClearFilters: () => void;
  onOpenFilters: () => void;
  onSortChange: (sort: SortOption) => void;
  query: PackageQuery;
};

export function PackageResults({
  data,
  draft,
  fetchError,
  isFiltersOpen,
  isLoading,
  onApplyFilters,
  onBook,
  onChangeFilters,
  onClearFilters,
  onOpenFilters,
  onSortChange,
  query,
}: PackageResultsProps) {
  return (
    <section className="relative z-10 grid w-full max-w-[1180px] gap-7 px-5 py-8 md:px-8 md:py-16 xl:px-0">
      <div className="grid items-center gap-4 lg:grid-cols-[260px_minmax(0,1fr)_170px] lg:gap-8">
        <div className="hidden lg:block" />
        <div className="grid gap-2">
          <p className="text-14 text-brand-black">
            {data.total} διαθέσιμα πακέτα διακοπών
          </p>
          {fetchError ? (
            <p className="text-small-text-12 text-gray">
              Δεν ήταν δυνατή η σύνδεση με το WordPress API.
            </p>
          ) : null}
        </div>
        <div className="hidden justify-self-end lg:block">
          <SortSelect
            className="w-[170px]"
            onChange={onSortChange}
            value={query.sort}
          />
        </div>
        <div className="flex items-center gap-3 lg:hidden">
          <button
            aria-controls="mobile-filters"
            aria-expanded={isFiltersOpen}
            className="h-9 rounded-[5px] border border-accent-green bg-white px-5 text-button text-accent-green"
            onClick={onOpenFilters}
            type="button"
          >
            Φίλτρα
          </button>
          <SortSelect
            className="w-[155px]"
            onChange={onSortChange}
            value={query.sort}
          />
        </div>
      </div>

      <div
        className={`grid gap-7 transition-opacity duration-200 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8 ${
          isLoading ? "opacity-55" : "opacity-100"
        }`}
      >
        <div className="hidden lg:block">
          <FiltersPanel
            draft={draft}
            filters={data.availableFilters}
            onApply={onApplyFilters}
            onChange={onChangeFilters}
            onClear={onClearFilters}
          />
        </div>

        {data.items.length > 0 ? (
          <div className="grid content-start items-start gap-5 self-start md:grid-cols-2 lg:grid-cols-3">
            {data.items.map((item) => (
              <PackageCard item={item} key={item.id} onBook={onBook} />
            ))}
          </div>
        ) : (
          <div className="grid min-h-[260px] place-items-center rounded-[8px] bg-white p-8 text-center shadow-[0_12px_35px_rgba(85,85,99,0.08)]">
            <div className="grid gap-2">
              <h2 className="text-h7 uppercase text-brand-black">
                Δεν βρέθηκαν πακέτα
              </h2>
              <p className="text-14 text-gray">
                Δοκίμασε διαφορετικά φίλτρα τιμής ή κατηγορίας.
              </p>
            </div>
          </div>
        )}
      </div>

    </section>
  );
}
