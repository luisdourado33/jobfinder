import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
  Link,
} from 'react-router-dom';

import Login from './screens/Login';

const divTemp = {
  backgroundColor: 'orange',
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
          <Link to='/login'>Página de Login (87%)</Link>
        </li>
        <li>
          <Link to='/cadastro'>Página de cadastro (0%)</Link>
        </li>
        <li>
          <Link to='/dashboard'>Página de dashboard (0%)</Link>
        </li>
        <li>
          <Link to='/vagas'>Página de vagas (0%)</Link>
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
    </Router>
  );
};

export default AppRouter;
