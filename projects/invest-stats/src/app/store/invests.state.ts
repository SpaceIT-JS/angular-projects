import { InvestModel } from '../models/invest.model';

export default class InvestState {
    investitions: Array<InvestModel> = [];
    activeInvestition?: InvestModel;
}

export const initializeState = (): InvestState => {
    return {
        investitions: Array<InvestModel>()
    };
};
