import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './screens/Login';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Route path='login' exact component={Login} />
    </Router>
  );
};

export default AppRouter;
