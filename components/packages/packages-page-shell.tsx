"use client";

import { useEffect, useState } from "react";
import type {
  PackageItem,
  PackageQuery,
  PackagesResponse,
} from "@/lib/nelios-types";
import { BackgroundShapes } from "@/components/packages/background-shapes";
import { BookingToast } from "@/components/packages/booking-toast";
import { ContactBanner } from "@/components/packages/contact-banner";
import { MobileFiltersDrawer } from "@/components/packages/mobile-filters-drawer";
import { PackageResults } from "@/components/packages/package-results";
import { SearchHero } from "@/components/packages/search-hero";
import { usePackageFilters } from "@/hooks/use-package-filters";

type PackagesPageShellProps = {
  data: PackagesResponse;
  fetchError: boolean;
  query: PackageQuery;
};

export function PackagesPageShell({
  data,
  fetchError,
  query,
}: PackagesPageShellProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const {
    applyFilters,
    clearFilters,
    draft,
    isPending,
    setDraftValue,
    updateSort,
  } = usePackageFilters(query);

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timeout = window.setTimeout(() => setToastMessage(null), 2600);

    return () => window.clearTimeout(timeout);
  }, [toastMessage]);

  function bookPackage(item: PackageItem) {
    setToastMessage(`Η κράτηση για "${item.title}" ξεκίνησε.`);
  }

  function applyAndCloseFilters() {
    applyFilters();
    setIsFiltersOpen(false);
  }

  function clearAndCloseFilters() {
    clearFilters();
    setIsFiltersOpen(false);
  }

  return (
    <main className="relative grid min-h-screen justify-items-center overflow-hidden bg-background text-brand-black">
      <BackgroundShapes />
      <SearchHero />
      <PackageResults
        data={data}
        draft={draft}
        fetchError={fetchError}
        isFiltersOpen={isFiltersOpen}
        isLoading={isPending}
        onApplyFilters={applyAndCloseFilters}
        onBook={bookPackage}
        onChangeFilters={setDraftValue}
        onClearFilters={clearAndCloseFilters}
        onOpenFilters={() => setIsFiltersOpen(true)}
        onSortChange={updateSort}
        query={query}
      />
      <ContactBanner />
      <MobileFiltersDrawer
        draft={draft}
        filters={data.availableFilters}
        isOpen={isFiltersOpen}
        onApply={applyAndCloseFilters}
        onChange={setDraftValue}
        onClear={clearAndCloseFilters}
        onClose={() => setIsFiltersOpen(false)}
      />
      <BookingToast message={toastMessage} />
    </main>
  );
}
