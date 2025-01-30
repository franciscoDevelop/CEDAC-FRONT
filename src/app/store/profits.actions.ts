import { createAction, props } from '@ngrx/store';
import { Item, ItemCascade } from 'src/interface/profit-socienty-interface';

export const setSelectedSocieties = createAction('[Profits Component] Set Selected Societies', props<{ societies: Item[] }>());

export const setSelectedProfits = createAction('[Profits Component] Set Selected Profits', props<{ profits: ItemCascade[] }>());
