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
} from 'rsuite';
import {
  Heading,
  SimpleGrid,
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
                  <Nav.Item
                    onSelect={() => handleChangePage('1')}
                    eventKey='1'
                    icon={<Icon icon='dashboard' />}>
                    <Link to='/admin'>Minhas vagas</Link>
                  </Nav.Item>
                  <Nav.Item
                    onSelect={() => handleChangePage('1')}
                    eventKey='1'
                    icon={<Icon icon='dashboard' />}>
                    <Link to='/admin'>Minhas vagas</Link>
                  </Nav.Item>
                  <Nav.Item
                    onSelect={() => handleChangePage('1')}
                    eventKey='1'
                    icon={<Icon icon='dashboard' />}>
                    <Link to='/admin'>Minhas vagas</Link>
                  </Nav.Item>
                  <Nav.Item
                    onSelect={() => handleChangePage('1')}
                    eventKey='1'
                    icon={<Icon icon='dashboard' />}>
                    <Link to='/admin'>Minhas vagas</Link>
                  </Nav.Item>
                  <Nav.Item
                    onSelect={() => handleChangePage('1')}
                    eventKey='1'
                    icon={<Icon icon='dashboard' />}>
                    <Link to='/admin'>Minhas vagas</Link>
                  </Nav.Item>
                  <Nav.Item
                    onSelect={() => handleChangePage('1')}
                    eventKey='1'
                    icon={<Icon icon='dashboard' />}>
                    <Link to='/admin'>Minhas vagas</Link>
                  </Nav.Item>
                  <Nav.Item
                    onSelect={() => handleChangePage('1')}
                    eventKey='1'
                    icon={<Icon icon='dashboard' />}>
                    <Link to='/admin'>Minhas vagas</Link>
                  </Nav.Item>
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
              <Heading bgColor='#EEE' size='sm' padding={5}>
                Visão geral
              </Heading>
            </Header>
            <Content style={{ padding: 20 }}>
              <Table variant='striped' colorScheme='linkedin'>
                <TableCaption>
                  Imperial to metric conversion factors
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Módulo</Th>
                    <Th>Valor</Th>
                    <Th isNumeric></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <b>Vagas aplicadas</b>
                    </Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                  <Tr>
                    <Td>feet</Td>
                    <Td>centimetres (cm)</Td>
                    <Td isNumeric>30.48</Td>
                  </Tr>
                  <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr>
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Tfoot>
              </Table>
              <div
                style={{
                  paddingInline: 5,
                  flexDirection: 'row',
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
                <Heading size='sm' padding={5}>
                  Minhas vagas
                </Heading>
                <Button size='sm' onClick={handleToggle} mt='1rem'>
                  Ver {show ? 'menos' : 'mais'}
                </Button>
              </div>

              <Collapse startingHeight={1} in={show}>
                <SimpleGrid
                  style={{
                    flex: 1,
                    overflow: 'scroll',
                  }}
                  columns={3}
                  spacing={5}>
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
              </Collapse>
              <div
                style={{
                  paddingInline: 5,
                  flexDirection: 'row',
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
                <Heading size='sm' padding={5}>
                  Vagas aplicadas
                </Heading>
                <Button size='sm' onClick={handleToggle} mt='1rem'>
                  Ver {show ? 'menos' : 'mais'}
                </Button>
              </div>

              <Collapse startingHeight={1} in={show}>
                <SimpleGrid
                  style={{
                    flex: 1,
                    overflow: 'scroll',
                  }}
                  columns={3}
                  spacing={5}>
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
              </Collapse>
            </Content>
          </Container>
        </Container>
        {/* <Footer /> */}
      </Content>
    </Container>
  );
};

export default MyJobs;
