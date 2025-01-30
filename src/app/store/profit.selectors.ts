import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProfitSocientyInterface } from "./app.state";

export const selectProfitState = createFeatureSelector<ProfitSocientyInterface>('profits');

export const selectProfits = createSelector(
    selectProfitState,
    (state: ProfitSocientyInterface) => state.selectedProfits
);
