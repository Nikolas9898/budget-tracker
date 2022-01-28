import React from 'react';
import {useSelector} from 'react-redux';
import {getUserAccounts} from '../../../helpers/userSelectors';
import AddTransactionButton from '../../../layout/addTranasctionButton/AddTransactionButton';
import classes from './TotalStyle.module.css';

const TotalContainer = (): JSX.Element => {
  const {accounts} = useSelector(getUserAccounts);
  const accountsName = Object.keys(accounts);
  const accountsValue = Object.values(accounts);
  return (
    <div className="wrapper ">
      <div className=" row  justify-content-end mb-3 mt-3 ">
        <div className="col-lg-5 col-sm-12 mt-sm-2 d-flex justify-content-end">
          <AddTransactionButton />
        </div>
      </div>
      <div className={classes.title}>Accounts</div>
      <div className=" row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2">
        {accountsValue.map((element, index) => (
          <div className="mt-4" key={accountsName[index]}>
            <div className={`${classes.account_container} `}>
              <div className={` ${classes.name}`}>{accountsName[index].toUpperCase()}</div>
              <div className="text-end">{(element / 100).toFixed(2)} BGN</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TotalContainer;
