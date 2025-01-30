import { Action, createReducer, on } from '@ngrx/store';
import { initialJustificationState, initialModuleState } from './init.state';
import { JustificationInterface, ModuleInterface } from './app.state';
import { setJustification, setSelectedModules } from './actions';
import { ItemModule } from 'src/interface/profit-socienty-interface';

const _modulesReducer = createReducer(
    initialModuleState,
    on(setSelectedModules, (state, { modules }) => ({ ...state, selectedModules: modules as ItemModule[] })),
);

const _justificationReducer = createReducer(
    initialJustificationState,
    on(setJustification, (state, { justification }) => ({ ...state, jusitification: justification })),
);

export function modulesReducer(state: ModuleInterface = initialModuleState, action: Action): ModuleInterface {
    return _modulesReducer(state, action);
}

export function justificationReducer(state: JustificationInterface = initialJustificationState, action: Action): JustificationInterface {
    return _justificationReducer(state, action);
}
