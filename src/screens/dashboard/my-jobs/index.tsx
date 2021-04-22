import React, { useState, useEffect, useContext, useCallback } from 'react';
import api from '../../../services/api';
import styled from 'styled-components';
import { AuthContext } from '../../../context/AuthContext';
import { PALETTES } from '../../../theme';
import { IJob } from '../../../types';
import {
  Container,
  Header,
  Content,
  Sidebar,
  Nav,
  Sidenav,
  Icon,
  Dropdown,
  Panel,
} from 'rsuite';
import {
  Heading,
  Grid,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Tfoot,
  Badge,
  Button,
  Collapse,
  Tooltip,
} from '@chakra-ui/react';

import Navbar from '../../../components/dashboard/Navbar';
import InfoBox from '../../../components/InfoBox';

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
  const { state } = useContext(AuthContext);
  const [active, setActive] = useState('1');
  const [jobs, setJobs] = useState<IJob[]>();
  const [myJobs, setMyJobs] = useState<IJob[]>();
  const [show, setShow] = React.useState(false);
  const [showJobs, setShowJobs] = useState<boolean>(false);
  const [showMyJobs, setShowMyJobs] = useState<boolean>(false);

  const handleToggle = () => setShow(!show);

  function handleChangePage(pageActive: string) {
    setActive(pageActive);
  }

  useEffect(() => {
    (async () => {
      await api
        .get(`jobs/jobApply/${state.userData.id}`)
        .then((response) => {
          setJobs(response.data);
        })
        .catch((error) => {
          console.log('Houve um erro ao carregar os jobs.\n' + error);
        });

      await api
        .post('jobs/userJobs', {
          userId: state.userData.id,
        })
        .then((response) => {
          setMyJobs(response.data);
        })
        .catch((error) => {
          console.log('Houve um erro ao carregar os jobs.\n' + error);
        });
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Navbar />
      </Header>
      <Content>
        <Container>
          <Sidebar>
            <Sidenav appearance='default' activeKey='1'>
              <Sidenav.Body>
                <Nav>
                  <Nav.Item eventKey='1' icon={<Icon icon='dashboard' />}>
                    Visão geral
                  </Nav.Item>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
          </Sidebar>
          <Container>
            <Header>
              <Heading size='md' p={15}>
                Visão geral
              </Heading>
            </Header>
            <Content style={{ padding: 15 }}>
              <Grid templateColumns='repeat(5, 1fr)' gap={2} mb={5}>
                <InfoBox
                  title={'Vagas em Interesse'}
                  value={jobs?.length}
                  bgColor={PALETTES.yellowGold}
                  textColor={PALETTES.dark}
                />
                <InfoBox
                  title={'Vagas publicadas'}
                  value={myJobs?.length}
                  bgColor={PALETTES.dark}
                  textColor={PALETTES.light}
                />
              </Grid>
              <Panel bordered>
                <div
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                  <div
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      alignContent: 'center',
                    }}>
                    <Badge variant='outline' mr={2}>
                      {jobs?.length}
                    </Badge>
                    <Heading size='md'>Vagas em Interesse</Heading>
                  </div>
                  <Button
                    onClick={() => setShowJobs((prevState) => !prevState)}>
                    {showJobs ? 'Ocultar' : 'Mostrar'}
                  </Button>
                </div>
                <Collapse in={showJobs} animateOpacity>
                  <Table variant='striped' colorScheme='blackAlpha'>
                    <TableCaption>Itens atualizados diariamente</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Nº</Th>
                        <Th>Vaga</Th>
                        <Th>Período</Th>
                        <Th>Data de Publicação</Th>
                        <Th>Criador</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {jobs?.map((job) => (
                        <Tr>
                          <Td>
                            <Badge
                              borderRadius={5}
                              backgroundColor={PALETTES.yellowGold}>
                              {job.id && job.id < 10 && `0${job.id}`}
                              {job.id && job.id >= 10 && `${job.id}`}
                            </Badge>
                          </Td>
                          <Td>
                            <Tooltip
                              label={job.description}
                              aria-label='A tooltip'>
                              <a href={`jobs/overview/${job.id}`}>
                                <strong>{job.title}</strong>
                              </a>
                            </Tooltip>
                          </Td>
                          <Td>{job.period}</Td>
                          <Td>{job.created_at}</Td>
                          <Td>{job.user?.username}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Collapse>
              </Panel>
              <Panel style={{ marginTop: 5 }} bordered>
                <div
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                  <div
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      alignContent: 'center',
                    }}>
                    <Badge variant='outline' mr={2}>
                      {myJobs?.length}
                    </Badge>
                    <Heading size='md'>Minhas publicações</Heading>
                  </div>
                  <Button
                    onClick={() => setShowMyJobs((prevState) => !prevState)}>
                    {showMyJobs ? 'Ocultar' : 'Mostrar'}
                  </Button>
                </div>
                <Collapse in={showMyJobs} animateOpacity>
                  <Table variant='striped' colorScheme='blackAlpha'>
                    <TableCaption>Itens atualizados diariamente</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Nº</Th>
                        <Th>Vaga</Th>
                        <Th>Período</Th>
                        <Th>Data de Publicação</Th>
                        <Th>Criador</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {myJobs?.map((job) => (
                        <Tr>
                          <Td>
                            <Badge
                              borderRadius={20}
                              backgroundColor={PALETTES.yellowGold}>
                              {job.id && job.id < 10 && `0${job.id}`}
                              {job.id && job.id >= 10 && `${job.id}`}
                            </Badge>
                          </Td>
                          <Td>
                            <Tooltip
                              label={job.description}
                              aria-label='A tooltip'>
                              <a href={`jobs/overview/${job.id}`}>
                                <strong>{job.title}</strong>
                              </a>
                            </Tooltip>
                          </Td>
                          <Td>{job.period}</Td>
                          <Td>{job.created_at}</Td>
                          <Td>{job.user?.username}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Collapse>
              </Panel>
            </Content>
          </Container>
        </Container>
        {/* <Footer /> */}
      </Content>
    </Container>
  );
};

export default MyJobs;
