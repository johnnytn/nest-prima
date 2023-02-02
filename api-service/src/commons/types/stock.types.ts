export enum STOCK_FIELDS {
  DATE = 'Date',
  NAME = 'Name',
  SYMBOL = 'Symbol',
  OPEN = 'Open',
  HIGH = 'High',
  LOW = 'Low',
  CLOSE = 'Close',
}

export interface Stock {
  Symbol: string;
  Date: string;
  Time: string;
  Open: string;
  High: string;
  Low: string;
  Close: string;
  Volume: string;
  Name: string;
}
