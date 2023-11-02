import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Matches } from 'class-validator';
import { INTERVALS, OUTPUT_SIZES, PRICE_SOURCES } from '../enum';
import { Expose } from 'class-transformer';

@ObjectType()
export class Price {
  @Field((type) => String)
  open: string;

  @Field((type) => String)
  high: string;

  @Field((type) => String)
  low: string;

  @Field((type) => String)
  close: string;

  @Expose({ name: 'adjusted close' })
  @Field(() => String, { nullable: true })
  adjusted_close?: string;

  @Expose({ name: 'dividend amount' })
  @Field(() => String, { nullable: true })
  dividend_amount?: string;

  @Field((type) => String)
  volume: string;

  @Expose({ name: 'split coefficient' })
  @Field(() => String, { nullable: true })
  split_coefficient?: string;
}

@ObjectType()
export class TimeSeries {
  @Field((type) => String)
  time: string;

  @Field((type) => Price)
  data: Price;
}

@ObjectType()
export class MetaData {
  @Field((type) => String, { nullable: true })
  information?: string;

  @Field((type) => String, { nullable: true })
  last_refreshed?: string;

  @Field((type) => String, { nullable: true })
  output_size?: string;

  @Field((type) => String, { nullable: true })
  time_zone?: string;

  @Field((type) => String, { nullable: true })
  interval?: string;

  @Field((type) => String, { nullable: true })
  symbol?: string;
}

@ObjectType()
export class PriceSeriesResponse {
  @Field((type) => MetaData)
  metadata: MetaData;

  @Field((type) => [TimeSeries])
  time_series: [TimeSeries];
}

@ArgsType()
export class PriceRequest {
  @Field(() => PRICE_SOURCES)
  source: PRICE_SOURCES;

  @Field(() => String)
  symbol: string;

  @Field(() => Boolean, { nullable: true })
  adjusted?: boolean;
}

@ArgsType()
export class DailyPriceRequest extends PriceRequest {
  @Field(() => OUTPUT_SIZES, { nullable: true })
  outputsize?: OUTPUT_SIZES;
}

@ArgsType()
export class IntraDayPriceRequest extends DailyPriceRequest {
  @Field(() => INTERVALS)
  interval: INTERVALS;

  @Field(() => Boolean, { nullable: true })
  extended_hours?: boolean;

  @Matches(/^\d{4}-[0,1]\d$/)
  @Field(() => String, { nullable: true })
  month?: string;
}
