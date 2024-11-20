import { ProfitSocietyCenterInterface } from "./profit-society-center-interface";

export interface ResponsePSCInterface {
    data: ProfitSocietyCenterInterface;
    message: string;
    TotalRecords: number;
    status: number;
}
