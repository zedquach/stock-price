import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
import { IPriceResponseDTO } from './IPriceResponseDTO';

class PriceDTO {
  @Expose({ name: '1. open', toClassOnly: true })
  open: string;

  @Expose({ name: '2. high', toClassOnly: true })
  high: string;

  @Expose({ name: '3. low', toClassOnly: true })
  low: string;

  @Expose({ name: '4. close', toClassOnly: true })
  close: string;

  @Expose({ name: '5. adjusted close', toClassOnly: true })
  adjusted_close?: string;

  @Expose({ name: '7. dividend amount', toClassOnly: true })
  dividend_amount?: string;

  @Expose({ name: '5. volume', toClassOnly: true })
  @Expose({ name: '6. volume', toClassOnly: true })
  volume: string;

  @Expose({ name: '8. split coefficient', toClassOnly: true })
  split_coefficient?: string;
}

class MetaDataDTO {
  @Expose({ name: '1. Information', toClassOnly: true })
  information: string;

  @Expose({ name: '2. Symbol', toClassOnly: true })
  symbol: string;

  @Expose({ name: '3. Last Refreshed', toClassOnly: true })
  last_refreshed: string;

  @Expose({ name: '4. Interval', toClassOnly: true })
  interval?: string;

  @Expose({ name: '4. Output Size', toClassOnly: true })
  @Expose({ name: '5. Output Size', toClassOnly: true })
  output_size?: string;

  @Expose({ name: '4. Time Zone', toClassOnly: true })
  @Expose({ name: '5. Time Zone', toClassOnly: true })
  @Expose({ name: '6. Time Zone', toClassOnly: true })
  time_zone: string;
}

export class TimeSeriesDTO {
  time: string;
  @Type(() => PriceDTO)
  data: PriceDTO;
}

export class AlphaVantagePriceResponseDTO implements IPriceResponseDTO {
  @Type(() => MetaDataDTO)
  @Expose({ name: 'Meta Data' })
  metadata: MetaDataDTO;

  @Expose()
  @Type(() => TimeSeriesDTO)
  @Transform(
    ({ obj }) => {
      const timeSeriesKey = Object.keys(obj).find((key) =>
        key.includes('Time Series'),
      );
      if (!timeSeriesKey) return undefined;
      const series = Object.entries(obj[timeSeriesKey]).map(([time, data]) => {
        return plainToInstance(TimeSeriesDTO, { time, data });
      });
      series.sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
      );
      return series;
    },
    { toClassOnly: true },
  )
  time_series: TimeSeriesDTO[];
}
