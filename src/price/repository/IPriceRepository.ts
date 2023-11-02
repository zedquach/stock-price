import { IPriceResponseDTO } from '../dto/IPriceResponseDTO';

export interface IPriceRepository {
  getIntraDay(symbol: string, interval: string): Promise<IPriceResponseDTO>;
  getDaily(symbol: string): Promise<IPriceResponseDTO>;
  getWeekly(symbol: string): Promise<IPriceResponseDTO>;
  getMonthly(symbol: string): Promise<IPriceResponseDTO>;
}
