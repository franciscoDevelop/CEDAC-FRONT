import { Item, ItemCascade, ItemModule } from "src/interface/profit-socienty-interface";

export interface ProfitSocientyInterface {
    selectedSocieties: Item[];
    selectedProfits: ItemCascade[];
}

export interface ModuleInterface {
    selectedModules: ItemModule[];
}

export interface JustificationInterface {
    jusitification: string;
}
