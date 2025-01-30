export interface UserEditInterface {
    userDetail: {
        rpe: string;
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
        level1C: boolean;
        level2C: boolean;
        autPS: boolean;
        autME: boolean;
        autDoc: boolean;
        levelDown: boolean;
        internalProcess: boolean;
    };
    showPrivileges: boolean;
}
