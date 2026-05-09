import type { PackageItem } from "@/lib/nelios-types";

const priceFormatter = new Intl.NumberFormat("el-GR", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

export function formatDuration(duration: PackageItem["duration"]) {
  const daysLabel = duration.days === 1 ? "ημέρα" : "ημέρες";
  const nightsLabel = duration.nights === 1 ? "νύχτα" : "νύχτες";

  if (duration.days > 0 && duration.nights > 0) {
    return `${duration.days} ${daysLabel} / ${duration.nights} ${nightsLabel}`;
  }

  if (duration.nights > 0) {
    return `${duration.nights} ${nightsLabel}`;
  }

  return `${duration.days} ${daysLabel}`;
}

export function formatPrice(amount: number) {
  return `${priceFormatter.format(amount)}€`;
}
