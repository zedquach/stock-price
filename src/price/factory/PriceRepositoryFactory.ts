import { AlphaVantageRepository } from '../repository/AlphaVantageRepository';
import { IPriceRepository } from '../repository/IPriceRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PriceRepositoryFactory {
  constructor(
    private readonly alphaVantageRepository: AlphaVantageRepository,
  ) {}

  get(source: string): IPriceRepository | undefined {
    switch (source) {
      case 'AlphaVantage':
        return this.alphaVantageRepository;
      default:
        throw new Error('Invalid price source');
    }
  }
}
