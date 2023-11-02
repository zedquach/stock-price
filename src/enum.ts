import { registerEnumType } from '@nestjs/graphql';

export enum INTERVALS {
  oneMin = '1min',
  fiveMin = '5min',
  fifteenMin = '15min',
  thirtyMin = '30min',
  sixtyMin = '60min',
  daily = 'daily',
  weekly = 'weekly',
  monthly = 'monthly',
}

registerEnumType(INTERVALS, {
  name: 'INTERVALS',
  description: 'Time interval',
});

export enum PRICE_SOURCES {
  AlphaVantage = 'AlphaVantage',
}
registerEnumType(PRICE_SOURCES, {
  name: 'PRICE_SOURCES',
  description: 'Price source',
});

export enum OUTPUT_SIZES {
  compact = 'compact',
  full = 'full',
}

registerEnumType(OUTPUT_SIZES, {
  name: 'OUTPUT_SIZES',
  description: 'Output Sizes',
});
