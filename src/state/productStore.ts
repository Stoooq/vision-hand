import { create } from 'zustand';

export type GetProductFilters = {
    limit: number;
    page: number;
    sort: string;
}

type ProductStore = {
    filters?: GetProductFilters
    setFilters: (filters?: GetProductFilters) => void
}

export const useProductStore = create<ProductStore>((set) => ({
    filters: undefined,
    setFilters: (filters) => set(() => ({ filters: filters })),
}))