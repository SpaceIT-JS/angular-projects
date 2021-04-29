import { createAction, props } from '@ngrx/store';
import { InvestModel } from '../models/invest.model';

export const replaceInvestitions = createAction(
    '[Data Service] Replace investitions',
    props<{ newInvestitions: Array<InvestModel> }>()
);

export const setActiveInvestition = createAction(
    '[Data Service] Start editing',
    props<{ idx: number }>()
);

export const addInvestition = createAction(
    '[Data Service] Add investition',
    props<InvestModel>()
);

export const removeInvestitions = createAction(
    '[Data Service] Remove investition',
    props<{ idx: number }>()
);

export const updateInvestitions = createAction(
    '[Data Service] Update investition',
    props<{ idx: number, value: InvestModel }>()
);
