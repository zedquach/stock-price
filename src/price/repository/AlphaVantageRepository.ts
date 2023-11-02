import { IPriceRepository } from './IPriceRepository';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { plainToInstance } from 'class-transformer';
import { AlphaVantagePriceResponseDTO } from '../dto/AlphaVantageResponseDTO';
import { firstValueFrom } from 'rxjs';
import { IPriceResponseDTO } from '../dto/IPriceResponseDTO';

@Injectable()
export class AlphaVantageRepository implements IPriceRepository {
  constructor(private readonly httpService: HttpService) {}
  private apiKey = process.env.VANTAGE_API_KEY;

  async getIntraDay(
    symbol: string,
    interval: string,
    options?: object,
  ): Promise<IPriceResponseDTO> {
    const queryParams = this.mapParam(options);
    const res = await firstValueFrom(
      this.httpService.get<AlphaVantagePriceResponseDTO>(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${this.apiKey}&${queryParams}`,
      ),
    );
    return plainToInstance(AlphaVantagePriceResponseDTO, res.data);
  }

  async getDaily(symbol: string, options: any): Promise<IPriceResponseDTO> {
    const { adjusted, ...optionalParams } = options;
    const adjustedParam = adjusted ? '_ADJUSTED' : '';
    const queryParams = this.mapParam(optionalParams);
    const res = await firstValueFrom(
      this.httpService.get<AlphaVantagePriceResponseDTO>(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY${adjustedParam}&symbol=${symbol}&apikey=${this.apiKey}&${queryParams}`,
      ),
    );
    return plainToInstance(AlphaVantagePriceResponseDTO, res.data);
  }

  async getWeekly(symbol: string, options: any): Promise<IPriceResponseDTO> {
    const { adjusted, ...optionalParams } = options;
    const adjustedParam = adjusted ? '_ADJUSTED' : '';
    const queryParams = this.mapParam(optionalParams);
    const res = await firstValueFrom(
      this.httpService.get<AlphaVantagePriceResponseDTO>(
        `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY${adjustedParam}&symbol=${symbol}&apikey=${this.apiKey}&${queryParams}`,
      ),
    );
    return plainToInstance(AlphaVantagePriceResponseDTO, res.data);
  }

  async getMonthly(symbol: string, options?: any): Promise<IPriceResponseDTO> {
    const { adjusted, ...optionalParams } = options;
    const adjustedParam = adjusted ? '_ADJUSTED' : '';
    const queryParams = this.mapParam(optionalParams);
    const res = await firstValueFrom(
      this.httpService.get<AlphaVantagePriceResponseDTO>(
        `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY${adjustedParam}&symbol=${symbol}&apikey=${this.apiKey}${queryParams}`,
      ),
    );
    return plainToInstance(AlphaVantagePriceResponseDTO, res.data);
  }

  private mapParam = (options) =>
    options
      ? Object.entries(options)
          .map(([key, value]) => `${key}=${value}`)
          .join('&')
      : '';
}
