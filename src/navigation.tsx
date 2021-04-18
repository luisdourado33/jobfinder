import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { PALETTES } from './theme';
import { AuthProvider } from './context/AuthContext';

import Login from './screens/Login';
import Dashboard from './screens/dashboard';
import MyJobs from './screens/dashboard/my-jobs';
import AdminPanel from './screens/admin';

import Overview from './screens/jobs/Overview';
import NewJob from './screens/jobs/NewJob';

const divTemp = {
  backgroundColor: PALETTES.dark,
  color: '#FFF',
  padding: '30px',
};

const Home: React.FC = () => {
  return (
    <div style={divTemp}>
      <h1>
        <b>Job Finder:</b> Cronograma
      </h1>
      <ul>
        <li>
          <Link to='/login'>
            Página de Login <b>(100%)</b>
          </Link>
        </li>
        <li>
          <Link to='/cadastro'>
            Drawer de Cadastro <b>(100%)</b>
          </Link>
        </li>
        <li>
          <Link to='/dashboard'>
            Página de dashboard <b>(95%)</b>
          </Link>
        </li>
        <li>
          <Link to='/vagas'>
            Página de vagas <b>(0%)</b>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const AppRouter: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
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
