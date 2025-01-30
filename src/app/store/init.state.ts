import { JustificationInterface, ModuleInterface, ProfitSocientyInterface } from "./app.state";

export const initialState: ProfitSocientyInterface = {
    selectedSocieties: [],
    selectedProfits: []
};

export const initialModuleState: ModuleInterface = {
    selectedModules: []
};

export const initialJustificationState: JustificationInterface = {
    jusitification: ""
}
