import { UserInterface } from './user-interface';

export interface UserWithActionsInterface extends UserInterface {
    badge: { text: string; class: string };
    actions: {
        label?: string;
        tooltip?: string;
        type: string;
        icon?: string;
        color?: string;
        action: (value?: string | boolean) => void;
        options?: string[];
        checked?: boolean;
    }[];
}
