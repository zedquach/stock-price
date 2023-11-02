import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceResolver } from './price.resolver';
import { HttpModule } from '@nestjs/axios';
import { AlphaVantageRepository } from './repository/AlphaVantageRepository';
import { PriceRepositoryFactory } from './factory/PriceRepositoryFactory';

@Module({
  imports: [HttpModule],
  providers: [
    PriceService,
    PriceResolver,
    PriceRepositoryFactory,
    AlphaVantageRepository,
  ],
})
export class PriceModule {}
