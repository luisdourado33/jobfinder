import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container, Header, Sidebar, Content, Footer } from 'rsuite';

import Navbar from '../../components/admin/Navbar';
import NewRole from '../../screens/admin/role/new-role';

const AdminPanel: React.FC = () => {
  const [expand, setExpand] = useState<boolean>(true);

  useEffect(() => {
    window.document.title = 'Painel Administrativo | Job Finder';
  }, []);

  return (
    <div className='show-fake-browser sidebar-page'>
      <Container>
        <Sidebar
          style={{ display: 'flex', flexDirection: 'column' }}
          width={expand ? 260 : 56}
          collapsible>
          <Navbar />
        </Sidebar>
        <Container>
          <Header>
            <h1>Painel Administrativo - Job Finder</h1>
          </Header>
          <Content>Content</Content>
        </Container>
      </Container>
    </div>
  );
};

const AdminRouter: React.FC = () => {
  return (
    <Router>
      <Route path='/admin' exact component={AdminPanel} />
      <Route path='/admin/new-role' component={NewRole} />
    </Router>
  );
};

export default AdminRouter;
