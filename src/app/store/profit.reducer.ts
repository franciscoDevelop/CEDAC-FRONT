import { Action, createReducer, on } from "@ngrx/store";
import { initialState } from "./init.state";
import { setSelectedProfits, setSelectedSocieties } from "./profits.actions";
import { ProfitSocientyInterface } from "./app.state";

const _profitsReducer = createReducer(
    initialState,
    on(setSelectedSocieties, (state, { societies }) => ({ ...state, selectedSocieties: societies })),
    on(setSelectedProfits, (state, { profits }) => ({ ...state, selectedProfits: profits }))
);

export function profitsReducer(state: ProfitSocientyInterface = initialState, action: Action): ProfitSocientyInterface {
    return _profitsReducer(state, action);
}
