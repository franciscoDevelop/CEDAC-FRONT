import { UserFullInterface } from "./user-full-interface";

export interface UserResponseInterface {
    data: UserFullInterface;
    message: string;
    TotalRecords: number;
    status: number;
}
