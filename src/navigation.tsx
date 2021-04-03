import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { PALETTES } from './theme';

import Login from './screens/Login';
import Dashboard from './screens/dashboard';

/**
 * Job Routes
 */
import Overview from './screens/jobs/Overview';

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
          <Link to='/login'>
            Drawer de Cadastro <b>(100%)</b>
          </Link>
        </li>
        <li>
          <Link to='/dashboard'>
            Página de dashboard <b>(0%)</b>
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
    <Router>
      <Route path='/' exact component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/jobs/overview/:jobId' component={Overview} />
    </Router>
  );
};

export default AppRouter;
