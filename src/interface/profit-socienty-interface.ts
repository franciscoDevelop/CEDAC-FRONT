export interface Item {
    value: string | number;
    label: string;
}

export interface ItemModule {
    value: string;
    label: string;
}

export interface ItemCascade {
    value: string | number;
    label: string;
    father: string | number;
    local: boolean;
}
