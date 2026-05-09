import type { PackageFilterDraft } from "@/hooks/use-package-filters";
import type { AvailablePackageFilters, PriceRange } from "@/lib/nelios-types";

const histogramBars = [
  16, 28, 34, 22, 40, 31, 18, 27, 46, 24, 36, 20, 30, 41, 26, 37, 33, 19, 39,
  25,
];

type PriceFilterProps = {
  draft: PackageFilterDraft;
  isDrawer: boolean;
  onChange: (patch: Partial<PackageFilterDraft>) => void;
  price: AvailablePackageFilters["price"];
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function parsePrice(value: string) {
  if (value.trim() === "") {
    return undefined;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : undefined;
}

function inputValue(value: number | undefined) {
  return typeof value === "number" ? String(value) : "";
}

function matchingRangeSlug(
  draft: PackageFilterDraft,
  ranges: PriceRange[],
) {
  return (
    draft.priceRange ??
    ranges.find(
      (range) => draft.minPrice === range.min && draft.maxPrice === range.max,
    )?.slug
  );
}

export function PriceFilter({
  draft,
  isDrawer,
  onChange,
  price,
}: PriceFilterProps) {
  const minLimit = price.min;
  const maxLimit = price.max;
  const minPrice = clamp(draft.minPrice ?? price.selectedMin, minLimit, maxLimit);
  const maxPrice = clamp(draft.maxPrice ?? price.selectedMax, minLimit, maxLimit);
  const rangeSize = Math.max(maxLimit - minLimit, 1);
  const leftPercent = ((minPrice - minLimit) / rangeSize) * 100;
  const rightPercent = 100 - ((maxPrice - minLimit) / rangeSize) * 100;
  const selectedRangeSlug = matchingRangeSlug(draft, price.ranges);

  function setMinPrice(value: number | undefined) {
    if (value === undefined) {
      onChange({ minPrice: undefined, priceRange: undefined });
      return;
    }

    onChange({
      minPrice: Math.min(clamp(value, minLimit, maxLimit), maxPrice),
      priceRange: undefined,
    });
  }

  function setMaxPrice(value: number | undefined) {
    if (value === undefined) {
      onChange({ maxPrice: undefined, priceRange: undefined });
      return;
    }

    onChange({
      maxPrice: Math.max(clamp(value, minLimit, maxLimit), minPrice),
      priceRange: undefined,
    });
  }

  function selectRange(range: PriceRange) {
    onChange({
      maxPrice: range.max,
      minPrice: range.min,
      priceRange: range.slug,
    });
  }

  return (
    <section className="flex flex-col gap-5">
      <h3 className="text-small-text-12 uppercase text-brand-black">
        ΕΥΡΟΣ ΤΙΜΗΣ
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-small-text-12 text-gray">
          Από
          <span className="flex h-10 items-center gap-2 rounded-[6px] border border-field-border bg-white px-3 text-field-text-14 text-gray">
            €
            <input
              className="min-w-0 flex-1 bg-transparent outline-none"
              inputMode="numeric"
              onChange={(event) => setMinPrice(parsePrice(event.target.value))}
              placeholder="0"
              type="number"
              value={inputValue(draft.minPrice)}
            />
          </span>
        </label>
        <label className="flex flex-col gap-1 text-small-text-12 text-gray">
          Έως
          <span className="flex h-10 items-center gap-2 rounded-[6px] border border-field-border bg-white px-3 text-field-text-14 text-gray">
            €
            <input
              className="min-w-0 flex-1 bg-transparent outline-none"
              inputMode="numeric"
              onChange={(event) => setMaxPrice(parsePrice(event.target.value))}
              placeholder={String(maxLimit)}
              type="number"
              value={inputValue(draft.maxPrice)}
            />
          </span>
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex h-14 items-end gap-[3px]">
          {histogramBars.map((height, index) => (
            <span
              className="w-[7px] rounded-t-[2px] bg-accent-blue/25"
              key={`${height}-${index}`}
              style={{ height }}
            />
          ))}
        </div>
        <div className="relative h-5">
          <div className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-accent-blue/25" />
          <div
            className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-accent-blue"
            style={{ left: `${leftPercent}%`, right: `${rightPercent}%` }}
          />
          <input
            aria-label="Ελάχιστη τιμή"
            className="price-range-thumb absolute inset-x-0 top-0 h-5 w-full appearance-none bg-transparent"
            max={maxLimit}
            min={minLimit}
            onChange={(event) => setMinPrice(Number(event.target.value))}
            step={price.step}
            type="range"
            value={minPrice}
          />
          <input
            aria-label="Μέγιστη τιμή"
            className="price-range-thumb absolute inset-x-0 top-0 h-5 w-full appearance-none bg-transparent"
            max={maxLimit}
            min={minLimit}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
            step={price.step}
            type="range"
            value={maxPrice}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {price.ranges.map((range) => (
          <label
            className="flex items-center gap-2 text-small-text-12 text-gray"
            key={range.slug}
          >
            <input
              checked={selectedRangeSlug === range.slug}
              className="h-4 w-4 border-field-border accent-accent-green"
              name={isDrawer ? "mobile-price" : "desktop-price"}
              onChange={() => selectRange(range)}
              type="radio"
            />
            {range.label}
          </label>
        ))}
      </div>
    </section>
  );
}
