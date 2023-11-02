import { Field, ObjectType } from '@nestjs/graphql';
import { Interval } from '../scalars';

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

  @Field(() => String, { nullable: true })
  adjusted_close?: string;

  @Field(() => String, { nullable: true })
  dividend_amount?: string;

  @Field((type) => String)
  volume: string;

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

  @Field((type) => Interval, { nullable: true })
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
