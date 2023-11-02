import { Query, Resolver } from '@nestjs/graphql';
import { PriceService } from './price.service';
import { PriceSeriesResponse } from './price.model';

@Resolver(() => PriceSeriesResponse)
export class PriceResolver {
  constructor(private priceService: PriceService) {}

  @Query(() => PriceSeriesResponse)
  getIntraDayData(): Promise<PriceSeriesResponse> {
    return this.priceService.getIntraDayData();
  }
}
