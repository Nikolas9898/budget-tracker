import {EventTypes, TransactionEvent} from '../../models/transactions';
import {accounts, MoneyAccount} from '../../models/user';

type ReplaceOneType = {
  nModified: number;
};

const NOT_ENOUGH_MONEY_IN = "Don't have enought money in ";
const getMoneyAccountsResultTemplate = (): {ok: number; error: string} => {
  return {
    ok: 0,
    error: ''
  };
};

export const addMoneyToAccounts = async (
  event: TransactionEvent,
  moneyAccounts: MoneyAccount | null
): Promise<{
  ok: number;
  error: string;
}> => {
  const responseResult = getMoneyAccountsResultTemplate();

  if (moneyAccounts && event.type === EventTypes.TRANSFER) {
    return await addMoneyIfTransfer(event, moneyAccounts);
  } else if (moneyAccounts && event.type === EventTypes.EXPENSE) {
    return await addMoneyIfExpense(event, moneyAccounts);
  } else if (moneyAccounts && event.type === EventTypes.INCOME) {
    return await addMoneyIfIncomme(event, moneyAccounts);
  } else {
    responseResult.error = 'No money accounts';
    responseResult.ok = 0;
    return responseResult;
  }
};
export const addMoneyIfTransferWithFees = async (
  event: TransactionEvent,
  moneyAccounts: MoneyAccount
): Promise<{
  ok: number;
  error: string;
}> => {
  const {accounts} = moneyAccounts;
  const from = event.from ? event.from : '';
  const fees = event.fees ? event.fees : 0;
  const to = event.to ? event.to : '';
  const responseResult = getMoneyAccountsResultTemplate();

  if (!accounts[from]) {
    responseResult.ok = 0;
    responseResult.error = `${NOT_ENOUGH_MONEY_IN}${from}`;
    return responseResult;
  }
  if (accounts[from] < event.amount + fees) {
    responseResult.ok = 0;
    responseResult.error = `${NOT_ENOUGH_MONEY_IN}${from}`;
    return responseResult;
  }
  if (!accounts[to]) {
    accounts[to] = event.amount;
    accounts[from] -= event.amount + fees;
  } else {
    accounts[to] += event.amount;
    accounts[from] -= event.amount + fees;
  }

  try {
    const result: ReplaceOneType = await moneyAccounts.replaceOne(moneyAccounts);

    responseResult.ok = result.nModified;
    responseResult.error = '';
  } catch (error) {
    responseResult.error = error.message;
  }

  return responseResult;
};
const addMoneyIfTransfer = async (
  event: TransactionEvent,
  moneyAccounts: MoneyAccount
): Promise<{
  ok: number;
  error: string;
}> => {
  const {accounts} = moneyAccounts;
  const from = event.from ? event.from : '';
  const to = event.to ? event.to : '';
  const responseResult = getMoneyAccountsResultTemplate();

  if (!accounts[from]) {
    responseResult.ok = 0;
    responseResult.error = `${NOT_ENOUGH_MONEY_IN}${from}`;
    return responseResult;
  }

  if (accounts[from] < event.amount) {
    responseResult.ok = 0;
    responseResult.error = `${NOT_ENOUGH_MONEY_IN}${from}`;
    return responseResult;
  }

  if (!accounts[to]) {
    accounts[to] = event.amount;
    accounts[from] -= event.amount;
  } else {
    accounts[to] += event.amount;
    accounts[from] -= event.amount;
  }

  try {
    const result: ReplaceOneType = await moneyAccounts.replaceOne(moneyAccounts);

    responseResult.ok = result.nModified;
    responseResult.error = '';
  } catch (error) {
    responseResult.error = error.message;
  }

  return responseResult;
};
const addMoneyIfExpense = async (
  event: TransactionEvent,
  moneyAccounts: MoneyAccount
): Promise<{ok: number; error: string}> => {
  const account = event.account ? event.account : '';
  const {accounts} = moneyAccounts;
  const responseResult = getMoneyAccountsResultTemplate();

  if (accounts[account] < event.amount) {
    responseResult.ok = 0;
    responseResult.error = `${NOT_ENOUGH_MONEY_IN}${account}`;
    return responseResult;
  }
  accounts[account] -= event.amount;

  try {
    const result: ReplaceOneType = await moneyAccounts.replaceOne(moneyAccounts);

    responseResult.ok = result.nModified;
    responseResult.error = '';
  } catch (error) {
    responseResult.error = error.message;
  }

  return responseResult;
};
const addMoneyIfIncomme = async (
  event: TransactionEvent,
  moneyAccounts: MoneyAccount
): Promise<{ok: number; error: string}> => {
  const account = event.account ? event.account : '';
  const {accounts} = moneyAccounts;
  const responseResult = getMoneyAccountsResultTemplate();

  if (!accounts[account]) {
    accounts[account] = event.amount;
  } else {
    accounts[account] += event.amount;
  }

  try {
    const result: ReplaceOneType = await moneyAccounts.replaceOne(moneyAccounts);

    responseResult.ok = result.nModified;
    responseResult.error = '';
  } catch (error) {
    responseResult.error = error.message;
  }

  return responseResult;
};

export const editMoneyInMoneyAccounts = async (
  eventFromBody: TransactionEvent,
  moneyAccounts: MoneyAccount | null,
  events: TransactionEvent[],
  event_id: string
): Promise<{
  ok: number;
  error: string;
}> => {
  const responseResult = getMoneyAccountsResultTemplate();
  const eventFromDB = getDbEvent(events, event_id);

  if (moneyAccounts && eventFromBody.type === EventTypes.INCOME) {
    return await editMoneyIfIncome(eventFromBody, moneyAccounts, eventFromDB);
  } else if (moneyAccounts && eventFromBody.type === EventTypes.EXPENSE) {
    return await editMoneyIfExpense(eventFromBody, moneyAccounts, eventFromDB);
  } else if (moneyAccounts && eventFromBody.type === EventTypes.TRANSFER) {
    return await editMoneyIfTransfer(eventFromBody, moneyAccounts, eventFromDB);
  }

  return responseResult;
};

const getDbEvent = (events: TransactionEvent[], event_id: string): TransactionEvent => {
  const foundIndex = events.findIndex((foundEvent: TransactionEvent) => foundEvent._id?.toString() === event_id);
  const eventFromDB = events[foundIndex];

  return eventFromDB;
};
const editMoneyIfTransfer = async (
  eventFromBody: TransactionEvent,
  moneyAccounts: MoneyAccount,
  eventFromDB: TransactionEvent
): Promise<{ok: number; error: string}> => {
  // const accountFromBody = eventFromBody.account;
  const accountFromDB = eventFromDB.account;
  const {accounts} = moneyAccounts;
  const responseResult = getMoneyAccountsResultTemplate();

  if (eventFromDB.type === EventTypes.INCOME) {
    accounts[accountFromDB] -= eventFromDB.amount;
    if (eventFromBody.fees > 0) accounts[eventFromBody.from] -= eventFromBody.fees;

    if (accounts[eventFromBody.from] < 0) {
      responseResult.error = `${NOT_ENOUGH_MONEY_IN} ${eventFromBody.from}`;
      return responseResult;
    }
    accounts[eventFromBody.from] -= eventFromBody.amount;
    accounts[eventFromBody.to] += eventFromBody.amount;
  }

  if (eventFromDB.type === EventTypes.EXPENSE) {
    accounts[accountFromDB] += eventFromDB.amount;
    accounts[eventFromBody.from] -= eventFromBody.amount;
    accounts[eventFromBody.to] += eventFromBody.amount;
    if (eventFromBody.fees > 0) accounts[eventFromBody.from] -= eventFromBody.fees;
    if (accounts[eventFromBody.from] < 0) {
      responseResult.error = `${NOT_ENOUGH_MONEY_IN} ${eventFromBody.from}`;
      responseResult.ok = 0;
      return responseResult;
    }
  }
  //едитването от INCOME към transfer работи перфектно !!!
  //едитването от EXPENSE към transfer работи перфектно !!!
  //едитването от TRANSFER към transfer работи перфектно !!!
  if (eventFromDB.type === EventTypes.TRANSFER) {
    accounts[eventFromDB.from] += eventFromDB.amount;
    accounts[eventFromDB.to] -= eventFromDB.amount;
    accounts[eventFromBody.from] -= eventFromBody.amount;

    if (eventFromDB.fees > 0) {
      accounts[eventFromDB.from] += eventFromDB.fees;
    }
    if (eventFromBody.fees > 0) {
      accounts[eventFromBody.from] -= eventFromBody.fees;
    }

    accounts[eventFromBody.to] += eventFromBody.amount;
    if (accounts[eventFromBody.from] < 0) {
      responseResult.error = `${NOT_ENOUGH_MONEY_IN} ${eventFromBody.from}`;
      responseResult.ok = 0;
      return responseResult;
    }
  }

  try {
    await moneyAccounts.replaceOne(moneyAccounts);

    responseResult.ok = 1;
    responseResult.error = '';
  } catch (error) {
    responseResult.error = error.message;
  }

  return responseResult;
};
const editMoneyIfIncome = async (
  eventFromBody: TransactionEvent,
  moneyAccounts: MoneyAccount,
  eventFromDB: TransactionEvent
): Promise<{ok: number; error: string}> => {
  const accountFromBody = eventFromBody.account;
  const accountFromDB = eventFromDB.account;
  const {accounts} = moneyAccounts;
  const responseResult = getMoneyAccountsResultTemplate();

  if (eventFromDB.type === EventTypes.TRANSFER && eventFromDB.from && eventFromDB.to) {
    accounts[eventFromDB.to] -= eventFromDB.amount;
    accounts[eventFromDB.from] += eventFromDB.amount;
  }
  if (eventFromDB.type === EventTypes.EXPENSE) {
    accounts[accountFromDB] += eventFromDB.amount;
  }

  if (eventFromDB.type === EventTypes.INCOME) {
    accounts[accountFromDB] -= eventFromDB.amount;
  }

  if (!accounts[accountFromBody]) {
    accounts[accountFromBody] = eventFromBody.amount;
  } else {
    accounts[accountFromBody] += eventFromBody.amount;
  }

  if (accounts[accountFromDB] < 0) {
    responseResult.error = `${NOT_ENOUGH_MONEY_IN} ${accountFromDB}`;
    responseResult.ok = 0;
    return responseResult;
  }

  try {
    const result: ReplaceOneType = await moneyAccounts.replaceOne(moneyAccounts);

    responseResult.ok = result.nModified;
    responseResult.error = '';
  } catch (error) {
    responseResult.error = error.message;
  }

  return responseResult;
};
const editMoneyIfExpense = async (
  eventFromBody: TransactionEvent,
  moneyAccounts: MoneyAccount,
  eventFromDB: TransactionEvent
): Promise<{ok: number; error: string}> => {
  const accountFromBody = eventFromBody.account;
  const accountFromDB = eventFromDB.account === '' ? eventFromDB.to : eventFromDB.account;
  const {accounts} = moneyAccounts;
  const responseResult = getMoneyAccountsResultTemplate();

  if (eventFromDB.type === EventTypes.EXPENSE) {
    accounts[accountFromDB] += eventFromDB.amount;
    accounts[accountFromBody] -= eventFromBody.amount;
  }

  if (eventFromDB.account != eventFromBody.account && eventFromDB.type === EventTypes.INCOME) {
    accounts[accountFromDB] += eventFromDB.amount;
    accounts[accountFromBody] -= eventFromBody.amount;
  }

  if (eventFromDB.account === eventFromBody.account && eventFromDB.type === EventTypes.INCOME) {
    accounts[accountFromDB] -= eventFromDB.amount;
    accounts[accountFromBody] -= eventFromBody.amount;
  }

  if (eventFromDB.type === EventTypes.TRANSFER) {
    accounts[eventFromDB.from] += eventFromDB.amount;
    accounts[eventFromDB.to] -= eventFromDB.amount;
    accounts[eventFromBody.account] -= eventFromBody.amount;
  }

  if (accounts[accountFromBody] < 0) {
    responseResult.ok = 0;
    responseResult.error = `${NOT_ENOUGH_MONEY_IN}${accountFromBody}`;
    return responseResult;
  }

  try {
    const result: ReplaceOneType = await moneyAccounts.replaceOne(moneyAccounts);

    responseResult.ok = result.nModified;
    responseResult.error = '';
  } catch (error) {
    responseResult.error = error.message;
  }

  return responseResult;
};

export const deleteMoneyInMoneyAccounts = async (
  // eventFromBody: TransactionEvent,
  moneyAccounts: MoneyAccount | null,
  events: TransactionEvent[],
  event_id: string
): Promise<{
  ok: number;
  error: string;
}> => {
  const responseResult = getMoneyAccountsResultTemplate();
  const eventFromDB = getDbEvent(events, event_id);

  if (eventFromDB.type === EventTypes.INCOME && moneyAccounts) {
    return await deleteMoneyIfIncome(moneyAccounts, eventFromDB);
  } else if (eventFromDB.type === EventTypes.EXPENSE && moneyAccounts) {
    return await deleteMoneyIfExpense(moneyAccounts, eventFromDB);
  } else if (eventFromDB.type === EventTypes.TRANSFER && moneyAccounts) {
    return await deleteMoneyIfTransfer(moneyAccounts, eventFromDB);
  }

  return responseResult;
};

const deleteMoneyIfIncome = async (moneyAccounts: MoneyAccount, eventFromDB: TransactionEvent) => {
  const responseResult = getMoneyAccountsResultTemplate();
  const {accounts} = moneyAccounts;

  accounts[eventFromDB.account] -= eventFromDB.amount;

  if (accounts[eventFromDB.account] < 0) {
    responseResult.error = `First delete other events then income`;
    responseResult.ok = 0;
    return responseResult;
  }

  try {
    const result: ReplaceOneType = await moneyAccounts.replaceOne(moneyAccounts);

    responseResult.ok = result.nModified;
    responseResult.error = '';
  } catch (error) {
    responseResult.error = error.message;
  }

  return responseResult;
};
const deleteMoneyIfExpense = async (moneyAccounts: MoneyAccount, eventFromDB: TransactionEvent) => {
  const responseResult = getMoneyAccountsResultTemplate();
  const {accounts} = moneyAccounts;

  accounts[eventFromDB.account] += eventFromDB.amount;

  if (accounts[eventFromDB.account] < 0) {
    responseResult.error = `First delete other events then income`;
    responseResult.ok = 0;
    return responseResult;
  }

  try {
    const result: ReplaceOneType = await moneyAccounts.replaceOne(moneyAccounts);

    responseResult.ok = result.nModified;
    responseResult.error = '';
  } catch (error) {
    responseResult.error = error.message;
  }

  return responseResult;
};
const deleteMoneyIfTransfer = async (moneyAccounts: MoneyAccount, eventFromDB: TransactionEvent) => {
  const responseResult = getMoneyAccountsResultTemplate();
  const {accounts} = moneyAccounts;

  accounts[eventFromDB.from] += eventFromDB.amount;
  accounts[eventFromDB.to] -= eventFromDB.amount;

  if (accounts[eventFromDB.account] < 0 || accounts[eventFromDB.to] < 0) {
    responseResult.error = `First delete other events then income`;
    responseResult.ok = 0;
    return responseResult;
  }

  try {
    const result: ReplaceOneType = await moneyAccounts.replaceOne(moneyAccounts);

    responseResult.ok = result.nModified;
    responseResult.error = '';
  } catch (error) {
    responseResult.error = error.message;
  }

  return responseResult;
};
