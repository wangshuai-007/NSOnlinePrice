export interface cnyCurrencyInfo {
  base:      string;
  date:      Date;
  rates:     { [key: string]: number };
  success:   boolean;
  timestamp: number;
}
