import React, { useState, useEffect } from 'react';
import { Container, Header, Sidenav, Sidebar, Content, Footer } from 'rsuite';
import { PALETTES } from '../../../../theme';
import { Role } from '../../../../types';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Badge,
  Heading,
  Select,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import swal from 'sweetalert';
import api from '../../../../services/api';

import Navbar from '../../../../components/admin/Navbar';

const headerStyles = {
  padding: 20,
  fontSize: 16,
  background: PALETTES.dark,
  color: ' #fff',
};

interface IFormValues {
  name: string;
  status: boolean;
}

const NewRole: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>();
  const [now, setNow] = useState<any>();

  async function getRoles() {
    await api
      .get('/roles')
      .then((response) => {
        setRoles(response.data);
      })
      .catch((err) => {
        alert('Dados inválidos!');
      });
  }

  async function createRole(role: any) {
    await api
      .post('/roles', {
        name: role.name,
        status: role.status,
      })
      .then((success) => {
        swal({
          title: 'Profissão adicionada!',
          text: `Profissão ${success.data.name} adicionada com sucesso.`,
          icon: 'success',
        });
      })
      .catch((error) => {
        swal({
          title: 'Houve um erro',
          text: error,
          icon: 'error',
        });
      });
  }

  useEffect(() => {
    window.document.title = 'Nova profissão | Job Finder';
    getRoles();
  }, []);

  const initialValues: IFormValues = {
    name: '',
    status: true,
  };

  return (
    <div className='sidebar-page'>
      <Container>
        <Sidebar
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          collapsible>
          <Sidenav.Header>
            <div style={headerStyles}>
              Olá, <b>Luís</b>!
            </div>
          </Sidenav.Header>
          <Navbar />
        </Sidebar>
        <Container>
          <Header style={{ padding: 20 }}>
            <Heading size={'lg'} isTruncated>
              Adicionar nova profissão
            </Heading>
          </Header>
          <Content style={{ padding: 20 }}>
            <div>
              <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                  createRole(values);
                }}>
                {(props) => (
                  <Form style={{ marginBottom: 50 }}>
                    <FormControl marginBlock={5} id='name' isRequired>
                      <FormLabel marginBottom={4} htmlFor='text'>
                        Nome da profissão
                      </FormLabel>
                      <Input
                        onChange={props.handleChange('name')}
                        id='name'
                        variant='filled'
                        type='text'
                        placeholder='Ex: Engenheiro Civil'
                      />
                    </FormControl>
                    <FormControl marginBlock={5} id='status' isRequired>
                      <FormLabel marginBottom={4} htmlFor='text'>
                        Status
                      </FormLabel>
                      <Select
                        variant='filled'
                        onChange={(e) => {
                          console.log(e.target.value);
                          props.setFieldValue(
                            'status',
                            !props.values.status ? 0 : 1
                          );
                          console.log('Status: ' + props.values.status);
                        }}
                        placeholder='Selecione uma opção'>
                        <option inputMode='numeric' value={1}>
                          Ativo
                        </option>
                        <option inputMode='numeric' value={0}>
                          Inativo
                        </option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <Button type='submit' colorScheme='blue'>
                        Adicionar profissão
                      </Button>
                    </FormControl>
                  </Form>
                )}
              </Formik>
              <Badge colorScheme='teal'>
                Profissões cadastradas: {roles?.length}
              </Badge>
              <Table variant='striped' colorScheme='facebook'>
                <TableCaption>Atualizado em:</TableCaption>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Profissão</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {roles &&
                    roles.map((role: Role) => (
                      <Tr>
                        <Td>{role.id}</Td>
                        <Td>
                          <b>{role.name}</b>
                        </Td>
                        <Td>
                          {role.status ? (
                            <Badge colorScheme='green'>Ativo</Badge>
                          ) : (
                            <Badge colorScheme='red'>Inativo</Badge>
                          )}
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </div>
          </Content>
        </Container>
      </Container>
      <Footer>{/* <h1>Job Finder - 2021</h1> */}</Footer>
    </div>
  );
};

export default NewRole;
