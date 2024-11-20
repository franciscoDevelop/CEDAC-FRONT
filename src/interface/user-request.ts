export interface UserRequest {
    user: {
        rpe: string;
        coordinatorRPE: string;
        name: string;
        email: string;
        phone?: string;
        society: string;
        costCenter: string;
    },
    justification: string;
}
