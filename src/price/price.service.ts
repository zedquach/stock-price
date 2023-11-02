import { Injectable } from '@nestjs/common';
import { PriceSeriesResponse } from './price.model';
import { mockIntraday } from '../../mock/mock-data';

@Injectable()
export class PriceService {
  async getIntraDayData(): Promise<PriceSeriesResponse> {
    const data = new PriceSeriesResponse(mockIntraday);
    return data;
  }
}
