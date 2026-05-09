import type {
  PackageItem,
  PackageQuery,
  SearchParamsRecord,
  SortOption,
} from "@/lib/nelios-types";

const sortOptions: SortOption[] = ["popular", "price_asc", "price_desc"];

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function numberValue(value: string | string[] | undefined) {
  const parsed = Number(firstValue(value));

  return Number.isFinite(parsed) ? parsed : undefined;
}

function normalizeHotelStars(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  if (["3", "4", "5"].includes(value)) {
    return `${value}-stars`;
  }

  return value;
}

function normalizeSort(value: string | undefined): SortOption {
  if (sortOptions.includes(value as SortOption)) {
    return value as SortOption;
  }

  return "popular";
}

export function parsePackageSearchParams(
  searchParams: SearchParamsRecord,
): PackageQuery {
  return {
    hotelStars: normalizeHotelStars(firstValue(searchParams.hotel_stars)),
    maxPrice: numberValue(searchParams.max_price),
    minPrice: numberValue(searchParams.min_price),
    sort: normalizeSort(firstValue(searchParams.sort)),
    travelStyle: firstValue(searchParams.travel_style),
  };
}

export function sortPackageItems(items: PackageItem[], sort: SortOption) {
  const sortedItems = [...items];

  if (sort === "price_asc") {
    sortedItems.sort((a, b) => a.price.amount - b.price.amount);
  }

  if (sort === "price_desc") {
    sortedItems.sort((a, b) => b.price.amount - a.price.amount);
  }

  return sortedItems;
}
