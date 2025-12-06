import { create } from 'zustand';

interface FiltersState {
  selectedCategory: string;
  searchQuery: string;
  minPrice: number | null;
  maxPrice: number | null;
  inStockOnly: boolean;
  sortBy: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest' | null;

  // Actions
  setCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  setInStockOnly: (value: boolean) => void;
  setSortBy: (sort: FiltersState['sortBy']) => void;
  clearFilters: () => void;
}

const initialState = {
  selectedCategory: 'all',
  searchQuery: '',
  minPrice: null,
  maxPrice: null,
  inStockOnly: false,
  sortBy: null as FiltersState['sortBy'],
};

export const useFiltersStore = create<FiltersState>((set) => ({
  ...initialState,

  setCategory: (category: string) => {
    set({ selectedCategory: category });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  setPriceRange: (min: number | null, max: number | null) => {
    set({ minPrice: min, maxPrice: max });
  },

  setInStockOnly: (value: boolean) => {
    set({ inStockOnly: value });
  },

  setSortBy: (sort: FiltersState['sortBy']) => {
    set({ sortBy: sort });
  },

  clearFilters: () => {
    set(initialState);
  },
}));

export default useFiltersStore;



