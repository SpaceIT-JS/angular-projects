import {
  Action,
  createReducer,
  on
} from '@ngrx/store';
import {
  addInvestition,
  getInvestitions,
  setActiveInvestition,
  removeInvestitions,
  updateInvestitions
} from './invests.actions';
import InvestState, { initializeState } from './invests.state';

export const dataStateFeatureKey = 'dataState';

export const intialState = initializeState();
export const reducer = createReducer(
  intialState,
  on(getInvestitions, (state) => state),
  on(setActiveInvestition, (state, props) => {
    return {
      ...state,
      activeInvestition: {
        ...state.investitions[props.idx],
        idx: props.idx
      }
    };
  }),
  on(addInvestition, (state, newInvest) => {
    return {
      ...state,
      investitions: [...state.investitions, newInvest]
    };
  }),
  on(removeInvestitions, (state, props) => {
    return {
      ...state,
      investitions: state.investitions.filter((_, elIdx) => {
        return props.idx !== elIdx;
      })
    };
  }),
  on(updateInvestitions, (state, props) => {
    const newState = {
      ...state,
      investitions: [...state.investitions],
      activeInvestition: undefined
    };
    newState.investitions[props.idx] = props.value;

    return newState;
  })
);

export function InvestitionReducer(state: InvestState | undefined, action: Action) {
  return reducer(state, action);
}
