export interface UserRolesInterface {
    rpe: string;
    name: string;
    cedacRoles: { active: number; groupName: string }[];
    expertRoles: { active: number; groupName: string }[];
}
