import Image from "next/image";
import { PlaneIcon } from "@/components/packages/icons";

export function ContactBanner() {
  return (
    <section className="relative z-10 w-full max-w-[1180px] px-5 py-24 md:px-8 md:py-44 xl:px-0">
      <div className="relative h-[330px] overflow-hidden rounded-[8px] shadow-[0_20px_35px_rgba(85,85,99,0.20)] md:h-[260px]">
        <Image
          alt=""
          className="object-cover"
          fill
          loading="eager"
          sizes="(max-width: 768px) 90vw, 960px"
          src="/footer.png"
        />
        <div className="absolute inset-0 bg-[#006879]/45" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-8 text-center">
          <h2 className="max-w-[560px] text-h6 uppercase text-white">
            ΔΕ ΒΡΗΚΑΤΕ ΑΥΤΟ ΠΟΥ ΨΑΧΝΕΤΕ;
          </h2>
          <a
            className="flex h-10 items-center gap-3 rounded-[4px] border border-white/80 px-6 text-button text-white transition duration-200 hover:bg-white/15"
            href="https://www.nelios.com/contact-us/"
          >
            Επικοινωνήστε μαζί μας
            <PlaneIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
