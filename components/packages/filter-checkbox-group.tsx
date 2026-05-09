import type { NeliosTerm } from "@/lib/nelios-types";

type FilterCheckboxGroupProps = {
  activeValue?: string;
  onChange: (slug: string | undefined) => void;
  options: NeliosTerm[];
  title: string;
};

export function FilterCheckboxGroup({
  activeValue,
  onChange,
  options,
  title,
}: FilterCheckboxGroupProps) {
  return (
    <div className="flex flex-col gap-4 border-t border-stroke py-6">
      <h3 className="text-small-text-12 uppercase text-brand-black">
        {title}
      </h3>
      <div className="flex flex-col gap-3">
        {options.map((option) => {
          const isChecked = activeValue === option.slug;

          return (
            <label
              className="flex items-center gap-2 text-small-text-12 text-gray"
              key={option.slug}
            >
              <input
                checked={isChecked}
                className="h-4 w-4 rounded-[3px] border-field-border accent-accent-green"
                onChange={() => onChange(isChecked ? undefined : option.slug)}
                type="checkbox"
              />
              {option.name}
            </label>
          );
        })}
      </div>
    </div>
  );
}
