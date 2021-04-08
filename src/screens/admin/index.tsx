import React, { useState, useEffect } from 'react';
import { headerStyles, PALETTES } from '../../theme';
import { Heading } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Badge } from '@chakra-ui/react';
import {
  Container,
  Header,
  Sidebar,
  Sidenav,
  Content,
  Row,
  Col,
  Panel,
  Footer,
} from 'rsuite';

import Navbar from '../../components/admin/Navbar';
import NewRole from '../../screens/admin/role/new-role';
import NewCompany from '../../screens/admin/company/new-company';
import NewUser from '../../screens/admin/user/new-user';

const Card = (props: any) => (
  <Panel {...props} bordered header={props.headerTitle}>
    <p>Hello world</p>
  </Panel>
);

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
              <b>
                <b>Painel Administrativo</b>
              </b>
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
          <Content>
            <Row>
              <Col md={6} sm={12}>
                <Panel
                  shaded
                  bordered
                  bodyFill
                  style={{ display: 'inline-block', width: 240 }}>
                  <img src='https://via.placeholder.com/240x240' height='240' />
                  <Panel header='Usuários'>
                    <Badge size='lg'>Cadastrados até o momento: 10</Badge>
                    <p>
                      <small>
                        Relatório de usuários que utilizam a plataforma
                      </small>
                    </p>
                  </Panel>
                </Panel>
              </Col>
            </Row>
          </Content>
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
      <Route path='/admin/new-user' component={NewUser} />
    </Router>
  );
};

export default AdminRouter;
