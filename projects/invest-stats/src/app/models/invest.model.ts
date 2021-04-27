export class InvestModel {
  idx?: number;

  constructor(
    public date?: string,
    public currency: string = '',
    public amount: number = 0,
    public cost: number = 0,
    public fee: number = 0
  ) {
    this.date = date ? date : (new Date()).toISOString().substring(0, 16);
  }
}
