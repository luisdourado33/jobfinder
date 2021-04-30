import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { headerStyles, PALETTES } from '../../theme';
import { Heading } from '@chakra-ui/react';
import { SimpleGrid } from '@chakra-ui/react';
import { Container, Header, Content, Panel } from 'rsuite';

import api from '../../services/api';

import Navbar from '../../components/admin/Navbar';
import NewRole from '../../screens/admin/role/new-role';
import NewCompany from '../../screens/admin/company/new-company';
import NewUser from '../../screens/admin/user/new-user';
import NewJob from '../../screens/admin/job/new-job';

import NotAuthorized from '../../components/NotAuthorized';
import InfoBox from '../../components/InfoBox';

import { AuthContext } from '../../context/AuthContext';

const AdminPanel: React.FC = () => {
  const { state, setState } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [expand, setExpand] = useState<boolean>(true);

  async function getJobs() {
    await api
      .get('jobs')
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        alert('Houve um erro ao carregar as vagas.');
      });
  }

  async function getUsers() {
    await api
      .get('users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        alert('Houve um erro ao carregar as vagas.');
      });
  }

  async function getRoles() {
    await api
      .get('roles')
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        alert('Houve um erro ao carregar as vagas.');
      });
  }

  async function getCompanies() {
    await api
      .get('companies')
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        alert('Houve um erro ao carregar as vagas.');
      });
  }

  useEffect(() => {
    window.document.title = 'Painel Administrativo | Job Finder';

    getJobs();
    getUsers();
    getRoles();
    getCompanies();
  }, []);

  const iconStyles = {
    width: 56,
    height: 56,
    lineHeight: '56px',
    textAlign: 'center',
  };

  return (
    <div className='show-fake-browser sidebar-page'>
      <Container>
        <Navbar />
        <Container>
          <Header>
            <Heading size={'lg'} isTruncated padding={15}>
              Métricas
            </Heading>
          </Header>
          <Content>
            <Panel bordered style={{ marginInline: 10 }}>
              <Heading size={'md'} isTruncated mb={5}>
                Vagas
              </Heading>
              <SimpleGrid columns={[2, null, 3]} spacing='10px'>
                <InfoBox
                  title={'Vagas cadastradas'}
                  value={jobs?.length}
                  bgColor={'#FFF'}
                  textColor={PALETTES.dark}
                />
              </SimpleGrid>
              <hr style={{ marginBlock: 20 }} />
              <Heading size={'md'} isTruncated mb={5}>
                Usuários
              </Heading>
              <SimpleGrid columns={[2, null, 3]} spacing='10px'>
                <InfoBox
                  title={'Usuários cadastrados'}
                  value={users?.length}
                  bgColor={'#FFF'}
                  textColor={PALETTES.dark}
                />
              </SimpleGrid>
              <hr style={{ marginBlock: 20 }} />
              <Heading size={'md'} isTruncated mb={5}>
                Outros módulos
              </Heading>
              <SimpleGrid columns={[2, null, 3]} spacing='10px'>
                <InfoBox
                  title={'Profissões cadastradas'}
                  value={roles?.length}
                  bgColor={'#FFF'}
                  textColor={PALETTES.dark}
                />
                <InfoBox
                  title={'Categorias cadastradas'}
                  value={companies?.length}
                  bgColor={'#FFF'}
                  textColor={PALETTES.dark}
                />
              </SimpleGrid>
            </Panel>
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
      <Route path='/admin/new-job' component={NewJob} />
    </Router>
  );
};

export default AdminRouter;
