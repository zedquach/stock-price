import { Args, Query, Resolver } from '@nestjs/graphql';
import { PriceService } from './price.service';
import { PriceSeriesResponse } from './price.model';
import { IPriceResponseDTO } from './dto/IPriceResponseDTO';

@Resolver(() => PriceSeriesResponse)
export class PriceResolver {
  constructor(private priceService: PriceService) {}

  @Query(() => PriceSeriesResponse)
  getDailyPrice(
    @Args('source') source: string,
    @Args('symbol') symbol: string,
  ): Promise<IPriceResponseDTO> {
    return this.priceService.getDailyPrice(source, symbol);
  }

  @Query(() => PriceSeriesResponse)
  getWeeklyPrice(
    @Args('source') source: string,
    @Args('symbol') symbol: string,
  ): Promise<IPriceResponseDTO> {
    return this.priceService.getWeeklyPrice(source, symbol);
  }

  @Query(() => PriceSeriesResponse)
  getMonthlyPrice(
    @Args('source') source: string,
    @Args('symbol') symbol: string,
  ): Promise<IPriceResponseDTO> {
    return this.priceService.getMonthlyPrice(source, symbol);
  }

  @Query(() => PriceSeriesResponse)
  getIntraDayPrice(
    @Args('source') source: string,
    @Args('symbol') symbol: string,
    @Args('interval') interval: string,
  ): Promise<IPriceResponseDTO> {
    return this.priceService.getIntraDayPrice(source, symbol, interval);
  }
}
