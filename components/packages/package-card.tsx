import Image from "next/image";
import type { PackageItem } from "@/lib/nelios-types";
import { formatDuration, formatPrice } from "@/lib/package-formatters";

type PackageCardProps = {
  item: PackageItem;
  onBook: (item: PackageItem) => void;
};

export function PackageCard({ item, onBook }: PackageCardProps) {
  return (
    <article className="group flex h-fit cursor-pointer flex-col self-start overflow-hidden rounded-[8px] bg-white shadow-[0_14px_30px_rgba(85,85,99,0.11)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(85,85,99,0.18)]">
      <div className="relative h-[228px] w-full overflow-hidden md:h-[214px] lg:h-[190px]">
        <Image
          alt={item.image.alt || item.title}
          className="object-cover transition duration-500 group-hover:scale-105"
          fill
          loading="eager"
          sizes="(max-width: 768px) 90vw, (max-width: 1280px) 36vw, 270px"
          src={item.image.url}
        />
      </div>
      <div className="grid min-h-[174px] flex-1 grid-rows-[auto_1fr_auto] gap-2 p-5 md:min-h-[150px] md:p-4 lg:min-h-[150px]">
        <p className="text-small-text-12 lowercase text-gray">
          {formatDuration(item.duration)}
        </p>
        <h2 className="text-[20px] font-bold leading-[22px] text-brand-black [font-stretch:65%] md:text-[17px] md:leading-[19px] lg:text-[15px] lg:leading-[17px]">
          {item.title}
        </h2>
        <div className="flex items-end justify-between gap-4">
          <p className="text-small-text-12 uppercase text-gray">
            Από{" "}
            <span className="text-h7 text-brand-black [font-stretch:75%]">
              {formatPrice(item.price.amount)}
            </span>
          </p>
          <button
            className="h-10 cursor-pointer rounded-[4px] bg-accent-green px-5 text-button text-white transition duration-200 hover:scale-[1.03] hover:bg-[#00843f] active:scale-[0.98]"
            onClick={() => onBook(item)}
            type="button"
          >
            Κράτηση
          </button>
        </div>
      </div>
    </article>
  );
}
