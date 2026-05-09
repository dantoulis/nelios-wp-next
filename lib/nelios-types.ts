export type SearchParamsRecord = Record<
  string,
  string | string[] | undefined
>;

export type SortOption = "popular" | "price_asc" | "price_desc";

export type PackageQuery = {
  hotelStars?: string;
  maxPrice?: number;
  minPrice?: number;
  sort: SortOption;
  travelStyle?: string;
};

export type NeliosTerm = {
  count?: number;
  id: number;
  name: string;
  slug: string;
};

export type PriceRange = {
  label: string;
  max: number;
  min: number;
  slug: string;
};

export type AvailablePackageFilters = {
  hotelStars: NeliosTerm[];
  price: {
    currency: "EUR";
    max: number;
    min: number;
    ranges: PriceRange[];
    selectedMax: number;
    selectedMin: number;
    step: number;
  };
  travelStyles: NeliosTerm[];
};

export type PackageItem = {
  duration: {
    days: number;
    nights: number;
  };
  filters: {
    hotelStars: NeliosTerm[];
    travelStyle: NeliosTerm[];
  };
  id: number;
  image: {
    alt: string;
    url: string;
  };
  price: {
    amount: number;
    currency: "EUR";
    prefix: string;
  };
  slug: string;
  title: string;
};

export type PackagesResponse = {
  availableFilters: AvailablePackageFilters;
  items: PackageItem[];
  total: number;
};
