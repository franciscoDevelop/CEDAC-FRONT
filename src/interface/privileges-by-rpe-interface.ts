export interface PrivilegesByRpeInterface {
    coordinatorRPE: string;
    administration: boolean;
    internalProcess: boolean;
    levelDown: boolean;
    scale: boolean;
    solve: boolean;
    supervisor: boolean;
}

export interface PrivilegesUserInterface {
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
        internalProccess: boolean;
    };
    userPrivileges: {
        supervisor: boolean;
        rpe: string;
    }
}
