import { UserWithActionsInterface } from './user-with-actions-interface';

export interface UserResponse {
    _embedded: {
        tupleBackedMapList: UserWithActionsInterface[];
    };
    page: {
        number: number;
        size: number;
        totalElements: number;
        totalPages: number;
    };
    _links: {
        first: { href: string };
        prev: { href: string };
        self: { href: string };
        next: { href: string };
        last: { href: string };
    };
}
