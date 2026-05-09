import type { PackageQuery, PackagesResponse } from "@/lib/nelios-types";

const defaultApiBase =
  process.env.WORDPRESS_API_URL ??
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ??
  "http://localhost:8080/wp-json/nelios/v1";

const apiBase = defaultApiBase.replace(/\/$/, "");

export const emptyPackagesResponse: PackagesResponse = {
  availableFilters: {
    hotelStars: [
      { count: 0, id: 0, name: "3 αστέρια", slug: "3-stars" },
      { count: 0, id: 0, name: "4 αστέρια", slug: "4-stars" },
      { count: 0, id: 0, name: "5 αστέρια", slug: "5-stars" },
    ],
    price: {
      currency: "EUR",
      max: 1000,
      min: 0,
      ranges: [
        { label: "Έως 50 €", max: 50, min: 0, slug: "up-to-50" },
        { label: "50 - 150 €", max: 150, min: 50, slug: "50-150" },
        { label: "150 - 500 €", max: 500, min: 150, slug: "150-500" },
      ],
      selectedMax: 1000,
      selectedMin: 0,
      step: 1,
    },
    travelStyles: [
      { count: 0, id: 0, name: "Με το Ι.Χ. σας", slug: "by-car" },
      { count: 0, id: 0, name: "Άλλο μέσο", slug: "other" },
    ],
  },
  items: [],
  total: 0,
};

function buildItemsUrl(query: PackageQuery) {
  const url = new URL(`${apiBase}/items`);

  if (query.hotelStars) {
    url.searchParams.set("hotel_stars", query.hotelStars);
  }

  if (query.travelStyle) {
    url.searchParams.set("travel_style", query.travelStyle);
  }

  if (typeof query.minPrice === "number") {
    url.searchParams.set("min_price", String(query.minPrice));
  }

  if (typeof query.maxPrice === "number") {
    url.searchParams.set("max_price", String(query.maxPrice));
  }

  return url;
}

export async function getPackages(query: PackageQuery) {
  const response = await fetch(buildItemsUrl(query), {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Nelios API request failed with ${response.status}`);
  }

  return (await response.json()) as PackagesResponse;
}
