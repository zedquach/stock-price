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

  constructor(data: any) {
    if (data) {
      this.open = data.open;
      this.high = data.high;
      this.low = data.low;
      this.close = data.close;
      this.volume = data.volume;
      this.adjusted_close = data['adjusted close'];
      this.split_coefficient = data['split coefficient'];
      this.dividend_amount = data['dividend amount'];
    }
  }
}

@ObjectType()
export class TimeSeries {
  @Field((type) => String)
  time: string;

  @Field((type) => Price)
  data: Price;

  constructor({ time, data }: any) {
    this.time = time;
    this.data = new Price(data);
  }
}

@ObjectType()
export class MetaData {
  @Field((type) => String, { nullable: true })
  information?: String;

  @Field((type) => String, { nullable: true })
  last_refreshed?: String;

  @Field((type) => String, { nullable: true })
  output_size?: String;

  @Field((type) => String, { nullable: true })
  time_zone?: String;

  @Field((type) => Interval, { nullable: true })
  interval?: String;

  @Field((type) => String, { nullable: true })
  symbol?: String;

  constructor(data?: any) {
    if (data) {
      this.information = data.information;
      this.symbol = data.symbol;
      this.last_refreshed = data.last_refreshed;
      this.interval = data.interval;
      this.output_size = data.output_size;
      this.time_zone = data.time_zone;
    }
  }
}

@ObjectType()
export class PriceSeriesResponse {
  @Field((type) => MetaData)
  metadata: MetaData;

  @Field((type) => [TimeSeries!])
  time_series: TimeSeries[];

  constructor(data: any) {
    this.metadata = new MetaData(data.metadata);
    this.time_series = Object.entries(data.time_series).map(
      ([time, data]) => new TimeSeries({ time, data: new Price(data) }),
    );
  }
}
