import React, { useState, useEffect, useContext } from 'react';
import api from '../../../services/api';
import styled from 'styled-components';
import { AuthContext } from '../../../context/AuthContext';
import { PALETTES } from '../../../theme';
import { IJob } from '../../../types';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  Content,
  Sidebar,
  Nav,
  Sidenav,
  Icon,
  Panel,
} from 'rsuite';
import {
  Heading,
  SimpleGrid,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Table,
  TableCaption,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Tfoot,
  Collapse,
  Button,
} from '@chakra-ui/react';

import Navbar from '../../../components/dashboard/Navbar';
import Section from '../../../components/Section';
import GridCard from '../../../components/dashboard/GridCard';
import JobCard from '../../../components/JobCard';
import Footer from '../../../components/Footer';

const CardJob = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 15px;
  border-color: #eee;
  border-width: 1px;
  cursor: pointer;
  box-shadow: 5px 5px 10px #eee;
  transition: all 1ms;

  h1 {
    color: ${PALETTES.dark};
    font-size: 15px;
    font-weight: bolder;
  }

  :hover {
    box-shadow: 5px 5px 10px #eee;
    border-color: ${PALETTES.yellowGold};
  }
`;

const MyJobs: React.FC = () => {
  const [active, setActive] = useState('1');
  const [jobs, setJobs] = useState<IJob[]>();
  const { state } = useContext(AuthContext);
  const [show, setShow] = React.useState(false);

  const handleToggle = () => setShow(!show);
  async function getJobs() {
    await api
      .get('jobs')
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.log('Houve um erro ao carregar os jobs.\n' + error);
      });
  }
  function handleChangePage(pageActive: string) {
    setActive(pageActive);
  }

  useEffect(() => {
    getJobs();
  }, [jobs]);

  return (
    <Container>
      <Header>
        <Navbar />
      </Header>
      <Content>
        <Container>
          <Sidebar>
            <Sidenav activeKey={active}>
              <Sidenav.Body>
                <Nav>
                  <Nav.Item
                    onSelect={() => handleChangePage('1')}
                    eventKey='1'
                    icon={<Icon icon='dashboard' />}>
                    <Link to='/admin'>Minhas vagas</Link>
                  </Nav.Item>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
          </Sidebar>
          <Container>
            <Header>
              <Heading bgColor='#FFF' size='lg' padding={5}>
                Visão geral
              </Heading>
            </Header>
            <Content style={{ padding: 20, backgroundColor: '#FAFAFA' }}>
              <Panel>
                <Heading size='lg' padding={5}>
                  Visão geral
                </Heading>
                <Table variant='striped' colorScheme='cyan'>
                  <Thead>
                    <Tr>
                      <Th>Módulo</Th>
                      <Th isNumeric>Quantidade</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr key={1}>
                      <Td>
                        <b>Vagas pendentes</b>
                      </Td>
                      <Td isNumeric>10</Td>
                    </Tr>
                    <Tr key={2}>
                      <Td>
                        <b>Vagas criadas por mim</b>
                      </Td>
                      <Td isNumeric>25.4</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Panel>
              <Panel>
                <Heading size='lg' padding={5}>
                  Vagas
                </Heading>
                <Tabs>
                  <TabList>
                    <Tab>Vagas pendentes</Tab>
                    <Tab>Cadastradas por mim</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <SimpleGrid columns={3} spacing={5}>
                        <JobCard
                          key={1}
                          id={1}
                          title={'job.title'}
                          description={'job.description'}
                          period={'job.period'}
                          createdAt={'job.created_at'}
                          owner={'job.user?.username'}
                          location={'job.location'}
                        />
                        <JobCard
                          key={1}
                          id={1}
                          title={'job.title'}
                          description={'job.description'}
                          period={'job.period'}
                          createdAt={'job.created_at'}
                          owner={'job.user?.username'}
                          location={'job.location'}
                        />
                      </SimpleGrid>
                    </TabPanel>
                    <TabPanel>
                      <SimpleGrid columns={3} spacing={5}>
                        <JobCard
                          key={1}
                          id={1}
                          title={'job.title'}
                          description={'job.description'}
                          period={'job.period'}
                          createdAt={'job.created_at'}
                          owner={'job.user?.username'}
                          location={'job.location'}
                        />
                        <JobCard
                          key={1}
                          id={1}
                          title={'job.title'}
                          description={'job.description'}
                          period={'job.period'}
                          createdAt={'job.created_at'}
                          owner={'job.user?.username'}
                          location={'job.location'}
                        />
                        <JobCard
                          key={1}
                          id={1}
                          title={'job.title'}
                          description={'job.description'}
                          period={'job.period'}
                          createdAt={'job.created_at'}
                          owner={'job.user?.username'}
                          location={'job.location'}
                        />
                      </SimpleGrid>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Panel>
            </Content>
          </Container>
        </Container>
        <Footer />
      </Content>
    </Container>
  );
};

export default MyJobs;
