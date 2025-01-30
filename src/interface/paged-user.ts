export interface PagedUser {
    rpe: string;
    name: string;
    secondment: string;
    roles: string;
    active: string;
}

export interface PagedUserResponse {
    users: PagedUser[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}
