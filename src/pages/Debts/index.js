import React from 'react';

import DebtProvider from '../../features/debt';

import DebtForm from './form';
import DebtList from './table';

function Debts() {
  return (
    <DebtProvider>
      <DebtForm />
      <DebtList />
    </DebtProvider>
  );
}

export default Debts;
