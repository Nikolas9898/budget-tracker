import {EventTypes, TransactionEvent} from '../../models/transactions';
import {MoneyAccount} from '../../models/user';

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
  events: [TransactionEvent],
  moneyAccounts: MoneyAccount | null
): Promise<{
  ok: number;
  error: string;
}> => {
  const event = events[0];
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
  events: [TransactionEvent],
  moneyAccounts: MoneyAccount
): Promise<{
  ok: number;
  error: string;
}> => {
  const {accounts} = moneyAccounts;
  const event = events[0];
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
  eventFromDB: TransactionEvent
): Promise<{
  ok: number;
  error: string;
}> => {
  const responseResult = getMoneyAccountsResultTemplate();

  if (moneyAccounts && eventFromBody.type === EventTypes.INCOME) {
    console.log('a;a;');
    return await editMoneyIfIncome(eventFromBody, moneyAccounts, eventFromDB);
  } else if (moneyAccounts && eventFromBody.type === EventTypes.EXPENSE) {
    return await editMoneyIfExpense(eventFromBody, moneyAccounts, eventFromDB);
  }

  return responseResult;
};
const editMoneyIfIncome = async (
  eventFromBody: TransactionEvent,
  moneyAccounts: MoneyAccount,
  eventFromDB: TransactionEvent
): Promise<{ok: number; error: string}> => {
  const accountFromBody = eventFromBody.account ? eventFromBody.account : '';
  const accountFromDB = eventFromDB.account ? eventFromDB.account : '';
  const {accounts} = moneyAccounts;
  const responseResult = getMoneyAccountsResultTemplate();

  console.log(eventFromBody);
  console.log(eventFromDB);

  if (eventFromDB.type === EventTypes.INCOME) {
    accounts[accountFromDB] -= eventFromDB.amount;
  }

  if (!accounts[accountFromBody]) {
    accounts[accountFromBody] = eventFromBody.amount;
  } else {
    accounts[accountFromBody] += eventFromBody.amount;
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
  const accountFromBody = eventFromBody.account ? eventFromBody.account : '';
  const accountFromDB = eventFromDB.account ? eventFromDB.account : '';
  const {accounts} = moneyAccounts;
  const responseResult = getMoneyAccountsResultTemplate();

  if (accounts[accountFromBody] < eventFromBody.amount) {
    responseResult.ok = 0;
    responseResult.error = `${NOT_ENOUGH_MONEY_IN}${accountFromBody}`;
    return responseResult;
  }

  accounts[accountFromBody] -= eventFromBody.amount;

  try {
    const result: ReplaceOneType = await moneyAccounts.replaceOne(moneyAccounts);

    responseResult.ok = result.nModified;
    responseResult.error = '';
  } catch (error) {
    responseResult.error = error.message;
  }

  return responseResult;
};
