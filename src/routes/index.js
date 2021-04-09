import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DashBoard from '../pages/DashBoard';
import Debts from '../pages/Debts';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={DashBoard} />
      <Route path="/debts" component={Debts} />
    </Switch>
  );
}

export default Routes;
