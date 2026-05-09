import { PackagesPageShell } from "@/components/packages/packages-page-shell";
import {
  emptyPackagesResponse,
  getPackages,
} from "@/lib/nelios-api";
import {
  parsePackageSearchParams,
  sortPackageItems,
} from "@/lib/package-query";
import type { SearchParamsRecord } from "@/lib/nelios-types";

type HomeProps = {
  searchParams: Promise<SearchParamsRecord>;
};

export default async function Home({ searchParams }: HomeProps) {
  const rawSearchParams = await searchParams;
  const query = parsePackageSearchParams(rawSearchParams);
  const pageKey = [
    query.hotelStars ?? "",
    query.maxPrice ?? "",
    query.minPrice ?? "",
    query.sort,
    query.travelStyle ?? "",
  ].join(":");
  let data = emptyPackagesResponse;
  let fetchError = false;

  try {
    data = await getPackages(query);
  } catch {
    fetchError = true;
  }

  return (
    <PackagesPageShell
      data={{ ...data, items: sortPackageItems(data.items, query.sort) }}
      fetchError={fetchError}
      key={pageKey}
      query={query}
    />
  );
}
