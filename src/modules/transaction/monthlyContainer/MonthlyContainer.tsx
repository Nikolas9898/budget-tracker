import React from 'react';
import {connect} from 'react-redux';
import Moment from 'moment';
import AddTransactionModal from '../components/addTransactionModal/AddTransactionModal';
import NavBarMenu from '../../../layout/navBar/NavBar';
import InfoModal from '../components/infoModal/InfoModal';
import Calendar from './Calendar/Calendar';
import {State as StateTransaction} from '../reducers/transactionReducer';
import {
  firstDateOfFirstWeekOfTheMonth,
  transaction,
  firstDateOfTheMonth,
  lastDateOfTheMonth,
  lastDateOfLastWeekOfTheMonth,
  isTheSameDate
} from '../../../helpers/Variables';
import {validateTransaction} from '../../../helpers/Validation';
import {
  createTransactionRequest,
  deleteTransaction,
  editTransaction,
  getSpecificDatePeriod
} from '../service/TransactionService';
import {handleInput, setDate, setTransaction} from '../actions/transactionActions';
import {Transaction, TransactionEvent, TransactionReducer} from '../../../models/Transaction';
import {HandleInput} from '../../../models/Function';
import {Error} from '../../../models/Error';
import '../../../scss/variables.scss';

type Props = {
  filters: any;
  stateTransaction: StateTransaction;
  handleInput: (event: HandleInput) => void;
  setTransaction: (event: TransactionEvent) => void;
  setDate: (date: Date) => void;
};

type State = {
  isAddTransactionOpen: boolean;
  isInfoTransactionOpen: boolean;
  isEditTransactionOpen: boolean;
  selectedDay: Transaction;
  isTransfer: boolean;
  errors: Error;
  date: Date;
  calendarDates: {date: Date}[];
  transactions: Transaction[];
};

class MonthlyContainer extends React.Component<Props> {
  // eslint-disable-next-line react/state-in-constructor
  state: State = {
    isInfoTransactionOpen: false,
    isAddTransactionOpen: false,
    isEditTransactionOpen: false,
    date: Moment().toDate(),
    isTransfer: false,
    selectedDay: {
      _id: '',
      createdAt: Moment().startOf('date').toDate(),
      events: [],
      expense: 0,
      income: 0
    },
    errors: {
      account: '',
      from: '',
      category: '',
      to: '',
      amount: ''
    },
    transactions: [],
    calendarDates: []
  };

  componentDidMount() {
    const {stateTransaction, filters, setDate: setDateWithFilter} = this.props;
    if (filters.date) {
      this.setState({
        date: filters.date
      });
      setDateWithFilter(filters.date);
      this.getTransactions(filters.date);
      this.setCalendar(filters.date);
    } else {
      this.setState({
        date: stateTransaction.date
      });
      this.getTransactions(stateTransaction.date);
      this.setCalendar(stateTransaction.date);
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    const {stateTransaction, filters} = this.props;

    if (prevProps.stateTransaction.date !== stateTransaction.date) {
      if (!filters.date) {
        this.setCalendar(stateTransaction.date);
        this.getTransactions(stateTransaction.date);
      }
    }
  }

  getTransactions = async (date: Date) => {
    const {selectedDay} = this.state;
    const from: Date = firstDateOfFirstWeekOfTheMonth(date).toDate();
    const to: Date = lastDateOfLastWeekOfTheMonth(date).toDate();
    const data = await getSpecificDatePeriod(from, to);
    data.transactions.forEach((transactionItem: Transaction) => {
      if (isTheSameDate(selectedDay.createdAt, transactionItem.createdAt)) {
        this.setState({
          selectedDay: transactionItem
        });
      }
    });
    this.setState({transactions: data.transactions});
  };

  handleDelete = async (eventId: string) => {
    const {selectedDay, date} = this.state;
    const {_id: selectedDayId} = selectedDay;

    await deleteTransaction(selectedDayId, eventId);
    // eslint-disable-next-line no-underscore-dangle
    const newEvents: TransactionEvent[] = selectedDay.events.filter((event) => event._id !== eventId);
    this.setState({
      selectedDay: {...selectedDay, events: newEvents},
      isEditTransactionOpen: false
    });
    this.clearState();
    this.getTransactions(date);
  };

  handleOpenEdit = (event: TransactionEvent) => {
    const {isEditTransactionOpen} = this.state;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const {setTransaction} = this.props;
    if (isEditTransactionOpen) {
      this.setState({isEditTransactionOpen: false});
      this.clearState();
    } else {
      this.setState({
        isEditTransactionOpen: true
      });

      setTransaction({
        ...event,
        amount: (parseFloat(event.amount) / 100).toFixed(2),
        fees: event.fees ? (parseFloat(event.fees) / 100).toFixed(2) : ''
      });
    }
  };

  handleNextDay = async () => {
    const {selectedDay, transactions} = this.state;
    const newDate: Date = Moment(selectedDay.createdAt).add(1, 'days').toDate();

    this.setState({
      selectedDay: {createdAt: newDate, events: []},
      date: newDate
    });

    transactions.forEach((transaction) => {
      if (isTheSameDate(newDate, transaction.createdAt)) {
        this.setState({
          selectedDay: transaction
        });
      }
    });
  };

  handlePreviousDay = async () => {
    const {selectedDay, transactions} = this.state;
    const newDate: Date = Moment(selectedDay.createdAt).add(-1, 'days').toDate();
    this.setState({
      selectedDay: {createdAt: newDate, events: []},
      date: newDate
    });

    transactions.forEach((transaction) => {
      if (isTheSameDate(newDate, transaction.createdAt)) {
        this.setState({
          selectedDay: transaction
        });
      }
    });
  };

  handleOpenTransaction = () => {
    const {isAddTransactionOpen, selectedDay} = this.state;
    const {createdAt} = selectedDay;
    const {handleInput} = this.props;
    if (isAddTransactionOpen) {
      this.setState({
        isAddTransactionOpen: false
      });
      this.clearState();
    } else {
      handleInput({
        target: {
          name: 'date',
          value: createdAt
        }
      });
      this.setState({
        isAddTransactionOpen: true
      });
    }
  };

  handleOpenInfoModal = (date: Date) => {
    const {isInfoTransactionOpen} = this.state;
    if (isInfoTransactionOpen) {
      this.setState({
        isInfoTransactionOpen: false,
        selectedDay: {events: []}
      });
    } else {
      this.setState({
        isInfoTransactionOpen: true,
        selectedDay: {createdAt: date, events: []}
      });
      this.selectedDay(date);
    }
  };

  selectedDay = (date: Date) => {
    const {transactions} = this.state;
    transactions.forEach((transaction) => {
      if (isTheSameDate(date, transaction.createdAt)) {
        this.setState({
          selectedDay: transaction
        });
      }
    });
  };

  handleSave = async () => {
    const {
      isEditTransactionOpen,
      selectedDay: {_id: selectedDayId}
    } = this.state;
    const {
      stateTransaction: {transactionEvent, date}
    } = this.props;
    const {_id: transactionEventId} = transactionEvent;
    const errors: Error = validateTransaction(transactionEvent);
    const isValid: boolean = Object.values(errors).filter(Boolean).length <= 0;

    if (!isValid) {
      this.setState({errors});
      return;
    }
    const event = transaction(transactionEvent);

    if (isEditTransactionOpen) {
      await editTransaction(selectedDayId, transactionEventId, event.events[0]);
      console.log('vlezoh');
      this.getTransactions(transactionEvent.date);
      this.clearState();
    } else {
      await createTransactionRequest(event);
      this.getTransactions(date);
      this.clearState();
    }
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      ...this.state,
      errors: {},
      isAddTransactionOpen: false,
      isEditTransactionOpen: false
    });
  };

  clearState = () => {
    const {setTransaction} = this.props;

    setTransaction({
      _id: '',
      type: 'income',
      date: Moment().toDate(),
      account: '',
      from: '',
      category: '',
      fees: '0',
      to: '',
      amount: '0',
      note: '',
      description: '',
      transactionId: ''
    });
  };

  setCalendar = async (date: Date) => {
    await this.setState({calendarDates: []});
    const {calendarDates} = this.state;

    if (firstDateOfTheMonth(date).get('day') !== 1) {
      this.setFirstWeek(date);
    }

    for (let i = 1; i <= lastDateOfTheMonth(date).get('date'); i += 1) {
      calendarDates.push({
        date: Moment(firstDateOfTheMonth(date)).set('date', i).toDate()
      });
    }

    if (lastDateOfTheMonth(date).get('day') !== 0) {
      this.setLastWeek(date);
    }
  };

  setFirstWeek = (date: Date) => {
    const {calendarDates} = this.state;
    const lastDateOfPreviusMonth: number = Moment(date).set('date', 0).get('date');

    for (let i = firstDateOfFirstWeekOfTheMonth(date).get('date'); i <= lastDateOfPreviusMonth; i += 1) {
      calendarDates.push({
        date: Moment(firstDateOfFirstWeekOfTheMonth(date)).set('date', i).toDate()
      });
    }
  };

  setLastWeek = (date: Date) => {
    const {calendarDates} = this.state;

    for (let i = 1; i <= lastDateOfLastWeekOfTheMonth(date).get('date'); i += 1) {
      calendarDates.push({
        date: Moment(lastDateOfLastWeekOfTheMonth(date)).startOf('date').set('date', i).toDate()
      });
    }
  };

  render() {
    const {
      errors,
      selectedDay,
      transactions,
      calendarDates,
      isAddTransactionOpen,
      isEditTransactionOpen,
      isInfoTransactionOpen
    } = this.state;
    const {
      handleInput,
      stateTransaction: {date, transactionEvent}
    } = this.props;
    return (
      <div className="wrapper">
        <NavBarMenu />
        <Calendar
          handleOpenInfoModal={this.handleOpenInfoModal}
          transactions={transactions}
          calendarDates={calendarDates}
          date={date}
        />
        <InfoModal
          handleDelete={this.handleDelete}
          selectedDay={selectedDay}
          handleNextDay={this.handleNextDay}
          isInfoTransactionOpen={isInfoTransactionOpen}
          handlePreviousDay={this.handlePreviousDay}
          handleOpenInfoModal={this.handleOpenInfoModal}
          handleOpenTransaction={this.handleOpenTransaction}
          handleOpenEdit={this.handleOpenEdit}
        />
        <AddTransactionModal
          isEditTransactionOpen={isEditTransactionOpen}
          errors={errors}
          transactionEvent={transactionEvent}
          handleSave={this.handleSave}
          handleOpenEdit={this.handleOpenEdit}
          handleInputChange={handleInput}
          isAddTransactionOpen={isAddTransactionOpen}
          handleOpenTransaction={this.handleOpenTransaction}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: {transactionReducer: TransactionReducer}) => {
  return {
    stateTransaction: state.transactionReducer
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleInput: (event: HandleInput) => dispatch(handleInput(event)),
    setTransaction: (event: TransactionEvent) => dispatch(setTransaction(event)),
    setDate: (date: Date) => dispatch(setDate(date))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyContainer);
