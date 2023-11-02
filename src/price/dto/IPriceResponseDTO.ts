export interface IPriceResponseDTO {
  time_series: ITimeSeriesDTO[];
}

export interface ITimeSeriesDTO {
  time: string;
  data: IPriceDTO;
}

export interface IPriceDTO {
  open: string;
  high: string;
  low: string;
  close: string;
}
