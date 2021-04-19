import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PALETTES } from './theme';

import { AuthProvider } from './context/AuthContext';

import Login from './screens/Login';
import Dashboard from './screens/dashboard';
import MyJobs from './screens/dashboard/my-jobs';
import AdminPanel from './screens/admin';

import Overview from './screens/jobs/Overview';
import NewJob from './screens/jobs/NewJob';

const AppRouter: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path='/' exact component={Dashboard} />
          <Route path='/login' component={Login} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/my-jobs' component={MyJobs} />
          <Route path='/admin' component={AdminPanel} />
          <Route path='/jobs/overview/:jobId' component={Overview} />
          <Route path='/jobs/new-job' component={NewJob} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
