import { SafeHtml } from '@angular/platform-browser';

export interface TableConfig<T> {
    title: string;
    search: { show: boolean; placeholder: string; searchText: string };
    button: { label?: string; action?: () => void; color?: string; icon?: string; link?: string; show?: boolean };
    columns: { label: string | SafeHtml; identifier: string }[];
    data: T;
    pagination: { number: number; size: number; totalElements: number; totalPages: number };
    show?: { defaultSize: number; sizes: number[] };
}
