export interface UserPrivilegesRequest {
    administration: boolean;
    forumGmcAccess: boolean;
    internalProcess: boolean;
    justification: string;
    levelDown: boolean;
    scale: boolean;
    solve: boolean;
    supervisor: boolean;
    listProfits: ProfitCenter[];
    listModules: Module[];
}

interface ProfitCenter {
    father: string;
    label: string;
    local: boolean;
    value: string;
}

interface Module {
    moduleCode: string;
    moduleName: string;
    active: boolean;
}
