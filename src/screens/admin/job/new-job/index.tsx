import React, { useState, useEffect } from 'react';
import { Container, Header, Sidenav, Sidebar, Content, Footer } from 'rsuite';
import { PALETTES, headerStyles } from '../../../../theme';
import { IJob, IUser, Role } from '../../../../types';
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
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import api from '../../../../services/api';

import Navbar from '../../../../components/admin/Navbar';

interface IFormValues {
  name: string;
  status: boolean;
}

const NewJob: React.FC = () => {
  const [jobs, setJobs] = useState<IJob[]>();
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

  async function getJobs() {
    await api
      .get('/jobs')
      .then((response) => {
        setJobs(response.data);
      })
      .catch((err) => {
        swal({
          title: 'Falha na conexão',
          text: `Houve um erro ao conectar-se ao banco de dados.`,
          icon: 'error',
        });
      });
  }

  function removeJob(jobId: any) {
    swal({
      title: 'Confirmar remoção de usuário',
      text: 'A ação não pode ser revertida. Apagar mesmo assim?',
      icon: 'warning',
      buttons: [true, 'Prosseguir!'],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await api.delete(`/jobs/${jobId}`).then((success) => {
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
    window.document.title = 'Painel de Vagas | Job Finder';
    getJobs();
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
              Adicionar nova vaga
            </Heading>
          </Header>
          <Alert status='info'>
            <AlertIcon />
            Usuários com status inativo NÃO poderão fazer login à plataforma.
          </Alert>
          <Content style={{ padding: 20 }}>
            <Tabs>
              <TabList>
                <Tab>Vagas publicadas</Tab>
                <Tab>Cadastrar nova vaga</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <div>
                    <Badge colorScheme='messenger' marginBlock={2}>
                      Vagas cadastrados: {jobs?.length}
                    </Badge>
                    <Table variant='simple' colorScheme='blue'>
                      <Thead>
                        <Tr>
                          <Th>ID</Th>
                          <Th>Título</Th>
                          <Th>Descrição</Th>
                          <Th>Período</Th>
                          <Th>Local</Th>
                          <Th>Responsável</Th>
                          <Th>Status</Th>
                          <Th>Ações</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {jobs &&
                          jobs.map((job: IJob, key) => (
                            <Tr key={key}>
                              <Td>{job.id}</Td>
                              <Td>
                                <Link to={`/jobs/overview/${job.id}`}>
                                  <b>{job.title}</b>
                                </Link>
                              </Td>
                              <Td>{job.description}</Td>
                              <Td>{job.period}</Td>
                              <Td>{job.location}</Td>
                              <Td>{job.user?.username}</Td>
                              <Td>
                                {job.status == 1 ? (
                                  <Badge colorScheme='green'>Ativa</Badge>
                                ) : (
                                  <Badge colorScheme='red'>Inativa</Badge>
                                )}
                              </Td>
                              <Td>
                                <IconButton
                                  onClick={() => removeJob(job.id)}
                                  variant='outline'
                                  colorScheme='red'
                                  alt='Excluir vaga'
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
                  {/* <Formik
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
                  </Formik> */}
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

export default NewJob;
