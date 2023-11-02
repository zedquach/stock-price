import { Injectable } from '@nestjs/common';
import { PriceRepositoryFactory } from './factory/PriceRepositoryFactory';
import { IPriceResponseDTO } from './dto/IPriceResponseDTO';

@Injectable()
export class PriceService {
  constructor(private priceRepositoryFactory: PriceRepositoryFactory) {}

  async getDailyPrice(source, symbol, options): Promise<IPriceResponseDTO> {
    return await this.priceRepositoryFactory
      .get(source)!
      .getDaily(symbol, options);
  }

  async getWeeklyPrice(source, symbol, options): Promise<IPriceResponseDTO> {
    return await this.priceRepositoryFactory
      .get(source)!
      .getWeekly(symbol, options);
  }

  async getMonthlyPrice(source, symbol, options): Promise<IPriceResponseDTO> {
    return await this.priceRepositoryFactory
      .get(source)!
      .getMonthly(symbol, options);
  }
  async getIntraDayPrice(
    source,
    symbol,
    interval,
    options,
  ): Promise<IPriceResponseDTO> {
    return await this.priceRepositoryFactory
      .get(source)!
      .getIntraDay(symbol, interval, options);
  }
}
