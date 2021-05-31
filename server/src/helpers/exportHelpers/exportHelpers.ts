import moment from 'moment';
import {AggregatedTransactionType, Filters, MMMM_DO_YYYY} from '../../models/export';
import {TransactionEvent} from '../../models/transactions';

export const transformIntoEventsArray = (
  eventsArray: TransactionEvent[],
  transactions: AggregatedTransactionType[],
  filters: Filters[]
): TransactionEvent[] => {
  transactions.forEach(({events}) => {
    delete events._id;
    delete events.transferId;
    delete events.to;
    delete events.from;
    events.date = moment(events.date).format(MMMM_DO_YYYY);
    events.amount = events.amount / 100;
    filters.forEach((filter) => {
      events.account === filter.value && eventsArray.push(events);
    });
  });
  return eventsArray;
};
