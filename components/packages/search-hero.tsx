import { SearchIcon } from "@/components/packages/icons";

export function SearchHero() {
  return (
    <section className="relative z-10 flex w-full max-w-[1180px] flex-col items-center gap-5 px-5 py-6 md:px-8 md:py-5 xl:px-0">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-center text-h4 uppercase text-brand-black [font-stretch:65%] md:text-h1">
          ΕΛΛΑΔΑ
        </h1>
        <p className="text-center text-small-text-12 text-gray md:text-14">
          Πακέτα - Προσφορές
        </p>
      </div>

      <div className="flex h-12 w-[174px] rounded-full bg-white p-1 shadow-[0_9px_24px_rgba(85,85,99,0.16)]">
        <button className="flex-1 rounded-full bg-white text-button text-accent-green shadow-[0_5px_16px_rgba(85,85,99,0.12)]">
          Εκδρομές
        </button>
        <button className="flex-1 rounded-full text-button text-gray">
          Ξενοδοχεία
        </button>
      </div>

      <div className="flex h-12 w-full max-w-[760px] items-center rounded-[8px] bg-white/90 p-1 shadow-[0_10px_26px_rgba(85,85,99,0.10)] max-md:hidden">
        <div className="flex flex-1 flex-col px-6">
          <span className="text-small-text-12 text-gray">Προορισμός</span>
          <span className="text-field-text-14 text-brand-black">Ελλάδα</span>
        </div>
        <div className="h-6 w-px bg-stroke" />
        <div className="flex flex-1 px-6 text-field-text-14 text-gray">
          Check In
        </div>
        <div className="h-6 w-px bg-stroke" />
        <div className="flex flex-1 px-6 text-field-text-14 text-gray">
          Check Out
        </div>
        <div className="h-6 w-px bg-stroke" />
        <div className="flex flex-1 px-6 text-field-text-14 text-gray">
          Αριθμός ατόμων
        </div>
        <button className="flex h-10 items-center gap-2 rounded-[5px] bg-accent-green px-6 text-button text-white">
          <SearchIcon className="h-4 w-4" />
          Αναζήτηση
        </button>
      </div>

      <button className="flex h-10 w-full max-w-[330px] items-center justify-between rounded-full bg-white/90 px-5 text-small-text-12 text-gray shadow-[0_10px_22px_rgba(85,85,99,0.12)] md:hidden">
        <span>03/08/2023 - 08/08/2023 • 2 Ενήλικες</span>
        <SearchIcon className="h-4 w-4 text-accent-green" />
      </button>
    </section>
  );
}
