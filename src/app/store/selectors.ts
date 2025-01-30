import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JustificationInterface, ModuleInterface } from './app.state';

export const selectModuleState = createFeatureSelector<ModuleInterface>('modules');
export const justificationState = createFeatureSelector<JustificationInterface>('justification');

export const selectModules = createSelector(selectModuleState, (state: ModuleInterface) => state.selectedModules);

export const justification = createSelector(justificationState, (state: JustificationInterface) => state.jusitification);
