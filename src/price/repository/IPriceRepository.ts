import { IPriceResponseDTO } from '../dto/IPriceResponseDTO';

export interface IPriceRepository {
  getIntraDay(
    symbol: string,
    interval: string,
    options?: object,
  ): Promise<IPriceResponseDTO>;
  getDaily(symbol: string, options?: object): Promise<IPriceResponseDTO>;
  getWeekly(symbol: string, options?: object): Promise<IPriceResponseDTO>;
  getMonthly(symbol: string, options?: object): Promise<IPriceResponseDTO>;
}
