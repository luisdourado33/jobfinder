import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react';
import { Container, Header, Sidebar, Sidenav, Content, Footer } from 'rsuite';
import { headerStyles, PALETTES } from '../../theme';

import Navbar from '../../components/admin/Navbar';
import NewRole from '../../screens/admin/role/new-role';
import NewCompany from '../../screens/admin/company/new-company';

const AdminPanel: React.FC = () => {
  const [expand, setExpand] = useState<boolean>(true);

  useEffect(() => {
    window.document.title = 'Painel Administrativo | Job Finder';
  }, []);

  return (
    <div className='show-fake-browser sidebar-page'>
      <Container>
        <Sidebar
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
          width={expand ? 260 : 56}
          collapsible>
          <Sidenav.Header>
            <div style={headerStyles}>
              <b>Painel Administrativo</b>
            </div>
          </Sidenav.Header>
          <Navbar />
        </Sidebar>
        <Container style={{ padding: 20 }}>
          <Header>
            <Heading size={'lg'} isTruncated mb={15}>
              Métricas
            </Heading>
          </Header>
          <Content></Content>
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
      <Route path='/admin/new-company' component={NewCompany} />
    </Router>
  );
};

export default AdminRouter;
