import { Injectable } from '@nestjs/common';
import { PriceRepositoryFactory } from './factory/PriceRepositoryFactory';
import { IPriceResponseDTO } from './dto/IPriceResponseDTO';

@Injectable()
export class PriceService {
  constructor(private priceRepositoryFactory: PriceRepositoryFactory) {}

  async getDailyPrice(source, symbol): Promise<IPriceResponseDTO> {
    return await this.priceRepositoryFactory.get(source)!.getDaily(symbol);
  }

  async getWeeklyPrice(source, symbol): Promise<IPriceResponseDTO> {
    return await this.priceRepositoryFactory.get(source)!.getWeekly(symbol);
  }

  async getMonthlyPrice(source, symbol): Promise<IPriceResponseDTO> {
    return await this.priceRepositoryFactory.get(source)!.getMonthly(symbol);
  }
  async getIntraDayPrice(source, symbol, interval): Promise<IPriceResponseDTO> {
    return await this.priceRepositoryFactory
      .get(source)!
      .getIntraDay(symbol, interval);
  }
}
