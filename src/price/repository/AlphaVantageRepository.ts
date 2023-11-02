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

  async getIntraDay(
    symbol: string,
    interval: string,
  ): Promise<IPriceResponseDTO> {
    const res = await firstValueFrom(
      this.httpService.get<AlphaVantagePriceResponseDTO>(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=demo`,
      ),
    );
    return plainToInstance(AlphaVantagePriceResponseDTO, res.data);
  }

  async getDaily(symbol: string): Promise<IPriceResponseDTO> {
    const res = await firstValueFrom(
      this.httpService.get<AlphaVantagePriceResponseDTO>(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=demo`,
      ),
    );
    return plainToInstance(AlphaVantagePriceResponseDTO, res.data);
  }

  async getWeekly(symbol: string): Promise<IPriceResponseDTO> {
    const res = await firstValueFrom(
      this.httpService.get<AlphaVantagePriceResponseDTO>(
        `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=demo`,
      ),
    );
    return plainToInstance(AlphaVantagePriceResponseDTO, res.data);
  }

  async getMonthly(symbol: string): Promise<IPriceResponseDTO> {
    const res = await firstValueFrom(
      this.httpService.get<AlphaVantagePriceResponseDTO>(
        `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=demo`,
      ),
    );
    return plainToInstance(AlphaVantagePriceResponseDTO, res.data, {
      enableImplicitConversion: true,
    });
  }
}
