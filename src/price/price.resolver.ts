import { Args, Query, Resolver } from '@nestjs/graphql';
import { PriceService } from './price.service';
import {
  DailyPriceRequest,
  IntraDayPriceRequest,
  PriceRequest,
  PriceSeriesResponse,
} from './price.model';
import { IPriceResponseDTO } from './dto/IPriceResponseDTO';

@Resolver(() => PriceSeriesResponse)
export class PriceResolver {
  constructor(private priceService: PriceService) {}

  @Query(() => PriceSeriesResponse)
  getDailyPrice(@Args() args: DailyPriceRequest): Promise<IPriceResponseDTO> {
    const { source, symbol, ...options } = args;
    return this.priceService.getDailyPrice(source, symbol, options);
  }

  @Query(() => PriceSeriesResponse)
  getWeeklyPrice(@Args() args: PriceRequest): Promise<IPriceResponseDTO> {
    const { source, symbol, ...options } = args;
    return this.priceService.getWeeklyPrice(source, symbol, options);
  }

  @Query(() => PriceSeriesResponse)
  getMonthlyPrice(@Args() args: PriceRequest): Promise<IPriceResponseDTO> {
    const { source, symbol, ...options } = args;
    return this.priceService.getMonthlyPrice(source, symbol, options);
  }

  @Query(() => PriceSeriesResponse)
  getIntraDayPrice(
    @Args() args: IntraDayPriceRequest,
  ): Promise<IPriceResponseDTO> {
    const { source, symbol, interval, ...options } = args;
    return this.priceService.getIntraDayPrice(
      source,
      symbol,
      interval,
      options,
    );
  }
}
