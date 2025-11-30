interface FilterOption {
  id: string;
  label: string;
}

interface ProductFiltersProps {
  options: FilterOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export default function ProductFilters({
  options,
  selectedId,
  onSelect,
  className = "",
}: ProductFiltersProps) {
  return (
    <div className={`flex gap-2 md:gap-3 p-3 flex-wrap ${className}`}>
      {options.map((option) => {
        const isSelected = selectedId === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-colors ${
              isSelected
                ? "bg-[#1a4231] text-white font-bold"
                : "bg-[#1a4231]/10 text-[#1a4231] hover:bg-[#1a4231]/20"
            }`}
          >
            <p className="text-sm leading-normal">{option.label}</p>
          </button>
        );
      })}
    </div>
  );
}
