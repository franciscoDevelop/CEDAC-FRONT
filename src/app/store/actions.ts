import { createAction, props } from '@ngrx/store';
import { Item } from 'src/interface/profit-socienty-interface';

export const setSelectedModules = createAction('[Modules Component] Set Selected Modules', props<{ modules: Item[] }>());

export const setJustification = createAction('[Justification Temp Persist] Set Justification', props<{ justification: string }>());
