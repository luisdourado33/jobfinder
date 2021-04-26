import React, { useState, useEffect } from 'react';
import { Container, Header, Sidenav, Sidebar, Content, Footer } from 'rsuite';
import { PALETTES, headerStyles } from '../../../../theme';
import { IUser, Role } from '../../../../types';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  IconButton,
  Badge,
  Heading,
  Select,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Alert,
  AlertIcon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { cpfMask } from '../../../../helpers';
import { Formik, Form } from 'formik';
import swal from 'sweetalert';
import api from '../../../../services/api';

import Navbar from '../../../../components/admin/Navbar';

interface IFormValues {
  name: string;
  status: boolean;
}

const NewUser: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>();
  const [roles, setRoles] = useState<Role[]>();
  const [now, setNow] = useState<any>();
  const [isAuth, setIsAuth] = useState<boolean>(false);

  async function getRoles() {
    await api.get('roles').then((response) => {
      setRoles(response.data);
      console.log(response.data);
    });
  }

  async function getRoleById(roleId: number) {
    await api.get(`roles/${roleId}`).then((response) => {
      return response.data.name;
    });
  }

  async function getUsers() {
    await api
      .get('/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        swal({
          title: 'Falha na conexão',
          text: `Houve um erro ao conectar-se ao banco de dados.`,
          icon: 'error',
        });
      });
  }

  async function createUser(formFields: IUser) {
    console.log(JSON.stringify(formFields));

    await api
      .post('users', {
        role_id: formFields.role_id,
        username: formFields.username,
        birthDate: formFields.birthDate,
        email: formFields.email,
        password: formFields.password,
        cpf: formFields.cpf,
      })
      .then((success) => {
        getUsers();
        swal({
          title: 'Conta criada!',
          text: `Seja bem-vind@, ${formFields.username}`,
          icon: 'success',
        });
      })
      .catch((error) => {
        swal({
          title: 'Houve um erro!',
          text:
            'Ocorreu um erro ao criar conta. Favor, tente novamente mais tarde!',
          icon: 'error',
        });
      });
  }

  function removeUser(userId: any) {
    swal({
      title: 'Confirmar remoção de usuário',
      text: 'A ação não pode ser revertida. Apagar mesmo assim?',
      icon: 'warning',
      buttons: [true, 'Prosseguir!'],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await api.delete(`/users/${userId}`).then((success) => {
          swal(success.data.msg, {
            icon: 'success',
          });
        });
      } else {
        swal('Operação cancelada!');
      }
    });
  }

  useEffect(() => {
    window.document.title = 'Novo usuário | Job Finder';
    getUsers();
    getRoles();
  }, []);

  const initialSignUpValues: IUser = {
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    role_id: 0,
    cpf: '',
    birthDate: null,
  };

  const initialValues: IFormValues = {
    name: '',
    status: true,
  };

  return (
    <div className='sidebar-page'>
      <Container>
        <Navbar />
        <Container>
          <Header style={{ padding: 20 }}>
            <Heading size={'lg'} isTruncated>
              Adicionar novo usuário
            </Heading>
          </Header>
          <Alert status='info'>
            <AlertIcon />
            Usuários com status inativo NÃO poderão fazer login à plataforma.
          </Alert>
          <Content style={{ padding: 20 }}>
            <Tabs>
              <TabList>
                <Tab>Usuários cadastrados</Tab>
                <Tab>Cadastrar novo usuário</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <div>
                    <Badge colorScheme='messenger' marginBlock={2}>
                      Usuários cadastrados: {users?.length}
                    </Badge>
                    <Table variant='simple' colorScheme='blue'>
                      {/* <TableCaption>Atualizado em:</TableCaption> */}
                      <Thead>
                        <Tr>
                          <Th>ID</Th>
                          <Th>Usuário</Th>
                          <Th>E-mail</Th>
                          <Th>Ocupação</Th>
                          <Th>Serviços publicados</Th>
                          <Th>Serviços candidatados</Th>
                          <Th>CPF</Th>
                          <Th>Tipo de Conta</Th>
                          <Th>Status</Th>
                          <Th>Ações</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {users &&
                          users.map((user: IUser, key) => (
                            <Tr key={key}>
                              <Td>{user.id}</Td>
                              <Td>
                                <b>{user.username}</b>
                              </Td>
                              <Td>
                                <b>{user.email}</b>
                              </Td>
                              <Td>
                                <b>{user.roles && user.roles.name}</b>
                              </Td>
                              <Td>
                                <b>{user.jobsCreated}</b>
                              </Td>
                              <Td>
                                <b>{user.jobsSigned}</b>
                              </Td>
                              <Td>
                                <b>{user.cpf}</b>
                              </Td>
                              <Td>
                                <b>
                                  {user.access == 60 ? (
                                    <Badge colorScheme='red'>
                                      Administrador
                                    </Badge>
                                  ) : (
                                    <Badge colorScheme='blue'>Comum</Badge>
                                  )}
                                </b>
                              </Td>
                              <Td>
                                {user.status ? (
                                  <Badge colorScheme='green'>Ativo</Badge>
                                ) : (
                                  <Badge colorScheme='red'>Bloqueado</Badge>
                                )}
                              </Td>
                              <Td>
                                <IconButton
                                  onClick={() => removeUser(user.id)}
                                  variant='outline'
                                  colorScheme='red'
                                  alt='Excluir usuário'
                                  size='xs'
                                  aria-label='Call Sage'
                                  fontSize='10px'
                                  icon={<CloseIcon />}
                                />
                              </Td>
                            </Tr>
                          ))}
                      </Tbody>
                    </Table>
                  </div>
                </TabPanel>
                <TabPanel>
                  <Formik
                    initialValues={initialSignUpValues}
                    onSubmit={(values, actions) => {
                      createUser(values);
                      actions.setSubmitting(false);
                    }}>
                    {(props) => (
                      <Form>
                        <FormControl marginBlock={5} id='username' isRequired>
                          <FormLabel marginBottom={4} htmlFor='username'>
                            Nome completo
                          </FormLabel>
                          <Input
                            onChange={props.handleChange('username')}
                            id='username'
                            variant='flushed'
                            type='text'
                            placeholder='Ex: John Doe'
                          />
                        </FormControl>
                        <FormControl marginBlock={5} id='birthDate' isRequired>
                          <FormLabel marginBottom={4} htmlFor='date'>
                            Data de Nascimento
                          </FormLabel>
                          <h1>{props.values.birthDate}</h1>
                          <Input
                            onChange={props.handleChange('birthDate')}
                            id='birthDate'
                            variant='flushed'
                            type='date'
                          />
                        </FormControl>
                        <FormControl marginBlock={5} id='email' isRequired>
                          <FormLabel marginBottom={4} htmlFor='email'>
                            E-mail
                          </FormLabel>
                          <Input
                            onChange={props.handleChange('email')}
                            id='email'
                            variant='flushed'
                            type='text'
                            placeholder='Ex: johndoe@email.com'
                          />
                        </FormControl>
                        <FormControl marginBlock={5} id='password' isRequired>
                          <FormLabel marginBottom={4} htmlFor='password'>
                            Senha
                          </FormLabel>
                          <Input
                            onChange={props.handleChange('password')}
                            id='password'
                            variant='flushed'
                            type='password'
                            placeholder='Mínimo 8 caracteres'
                          />
                        </FormControl>
                        <FormControl
                          marginBlock={5}
                          id='passwordRepeat'
                          isRequired>
                          <FormLabel marginBottom={4} htmlFor='password'>
                            Senha novamente
                          </FormLabel>
                          <Input
                            onChange={props.handleChange('passwordRepeat')}
                            id='passwordRepeat'
                            variant='flushed'
                            type='password'
                            placeholder='Mínimo 8 caracteres'
                          />
                        </FormControl>
                        <FormControl marginBlock={5} id='role_id' isRequired>
                          <FormLabel marginBottom={4} htmlFor='text'>
                            Ocupação
                          </FormLabel>
                          <Select
                            onChange={(e) =>
                              props.setFieldValue('role_id', e.target.value)
                            }
                            placeholder='Selecione sua ocupação'>
                            {roles &&
                              roles.map((role: Role, key) => (
                                <option key={key} value={role.id}>
                                  {role.name}
                                </option>
                              ))}
                          </Select>
                        </FormControl>
                        <FormControl marginBlock={5} id='cpf' isRequired>
                          <FormLabel marginBottom={4} htmlFor='text'>
                            CPF
                          </FormLabel>
                          <Input
                            maxLength={14}
                            onChange={(cpf) =>
                              props.setFieldValue(
                                'cpf',
                                cpfMask(cpf.target.value)
                              )
                            }
                            id='cpf'
                            value={props.values.cpf}
                            variant='flushed'
                            placeholder='Somente números'
                          />
                        </FormControl>
                        <Button colorScheme='blue' type='submit'>
                          Criar conta
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Content>
        </Container>
      </Container>
      <Footer>{/* <h1>Job Finder - 2021</h1> */}</Footer>
    </div>
  );
};

export default NewUser;
