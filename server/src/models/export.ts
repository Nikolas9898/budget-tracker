import {ExportEvent, TransactionEvent} from './transactions';

export const EXPENSE_OR_INCOME = 'income & expense';
export const MMMM_DO_YYYY = 'MMMM Do YYYY';

export interface AggregatedTransactionType extends Document {
  _id: string;
  createdAt: Date;
  events: ExportEvent;
  userId: string;
  income: number;
  expense: number;
  updatedAt: string;
  __v: number;
}

export type Filters = {
  label: string;
  value: string;
};
