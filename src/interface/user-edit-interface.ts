export interface UserEditInterface {
    data: {
        user: {
            name: string;
            active: string;
            password: string;
            phone: string;
            email: string;
            society: string;
            tsociety: string;
            profitCenter: string;
            tprofitCenter: string;
            costCenter: string;
            tcostCenter: string;
            supervisor: number;
            forumGmcAccess: number;
            sapuser: string;
            sirh: string;
        };
        roles: {
            rpe: string;
            groupUser: string;
        }[];
        haveProfile: {
            rpe: string;
            solve: boolean;
            scale: boolean;
            administration: boolean;
            level1c: boolean;
            level2c: boolean;
            autps: boolean;
            autme: boolean;
            autdoc: boolean;
            levelDown: boolean;
            internalProcess: boolean;
        };
        showPrivileges: boolean;
    };
    TotalRecords: number;
    message: string;
    status: number;
}
