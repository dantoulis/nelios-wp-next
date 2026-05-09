"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import type { PackageQuery, SortOption } from "@/lib/nelios-types";

export type PackageFilterDraft = {
  hotelStars?: string;
  maxPrice?: number;
  minPrice?: number;
  priceRange?: string;
  travelStyle?: string;
};

function queryToDraft(query: PackageQuery): PackageFilterDraft {
  return {
    hotelStars: query.hotelStars,
    maxPrice: query.maxPrice,
    minPrice: query.minPrice,
    travelStyle: query.travelStyle,
  };
}

export function usePackageFilters(query: PackageQuery) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [draft, setDraft] = useState<PackageFilterDraft>(() =>
    queryToDraft(query),
  );
  const [isPending, startTransition] = useTransition();

  function pushParams(updates: Record<string, string | number | undefined>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === "") {
        params.delete(key);
        return;
      }

      params.set(key, String(value));
    });

    const queryString = params.toString();

    startTransition(() => {
      router.push(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    });
  }

  function setDraftValue(patch: Partial<PackageFilterDraft>) {
    setDraft((current) => ({ ...current, ...patch }));
  }

  function applyFilters() {
    pushParams({
      hotel_stars: draft.hotelStars,
      max_price: draft.maxPrice,
      min_price: draft.minPrice,
      travel_style: draft.travelStyle,
    });
  }

  function clearFilters() {
    setDraft({});
    pushParams({
      hotel_stars: undefined,
      max_price: undefined,
      min_price: undefined,
      travel_style: undefined,
    });
  }

  function updateSort(sort: SortOption) {
    pushParams({ sort: sort === "popular" ? undefined : sort });
  }

  return {
    applyFilters,
    clearFilters,
    draft,
    isPending,
    setDraftValue,
    updateSort,
  };
}
