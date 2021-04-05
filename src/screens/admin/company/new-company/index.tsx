import React, { useState, useEffect } from 'react';
import { Container, Header, Sidenav, Sidebar, Content, Footer } from 'rsuite';
import { PALETTES, headerStyles } from '../../../../theme';
import { Company } from '../../../../types';
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
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Formik, Form } from 'formik';
import swal from 'sweetalert';
import api from '../../../../services/api';

import Navbar from '../../../../components/admin/Navbar';

interface IFormValues {
  name: string;
  status: boolean;
}

const NewCompany: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>();
  const [now, setNow] = useState<any>();
  const [isAuth, setIsAuth] = useState<boolean>(false);

  async function getCompanies() {
    await api
      .get('/companies')
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((err) => {
        alert('Dados inválidos!');
      });
  }

  async function createCompanyType(type: any) {
    await api
      .post('/companies', {
        name: type.name,
        status: type.status,
      })
      .then((success) => {
        swal({
          title: 'Tipo de empresa adicionado!',
          text: `Tipo ${success.data.name} adicionada(o) com sucesso.`,
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

  function removeCompany(companyId: number) {
    swal({
      title: 'Confirmar remoção de tipo',
      text: 'A ação não pode ser revertida. Apagar mesmo assim?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await api.delete(`/companies/${companyId}`).then((success) => {
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
    window.document.title = 'Novo tipo de empresa | Job Finder';
    getCompanies();
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
              Adicionar novo tipo de empresa
            </Heading>
          </Header>
          <Content style={{ padding: 20 }}>
            <div>
              <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                  createCompanyType(values);
                }}>
                {(props) => (
                  <Form style={{ marginBottom: 50 }}>
                    <FormControl marginBlock={5} id='name' isRequired>
                      <FormLabel marginBottom={4} htmlFor='text'>
                        Tipo de empresa
                      </FormLabel>
                      <Input
                        onChange={props.handleChange('name')}
                        id='name'
                        variant='filled'
                        type='text'
                        placeholder='Ex: Construção Civil'
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
                        Adicionar tipo de empresa
                      </Button>
                    </FormControl>
                  </Form>
                )}
              </Formik>
              <Badge colorScheme='teal'>
                Tipos cadastrados: {companies?.length}
              </Badge>
              <Table variant='simple' colorScheme='facebook'>
                {/* <TableCaption>Atualizado em:</TableCaption> */}
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Categoria de empresa</Th>
                    <Th>Status</Th>
                    <Th>Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {companies &&
                    companies.map((company: Company, key) => (
                      <Tr key={key}>
                        <Td>{company.id}</Td>
                        <Td>
                          <b>{company.name}</b>
                        </Td>
                        <Td>
                          {company.status ? (
                            <Badge colorScheme='green'>Ativo</Badge>
                          ) : (
                            <Badge colorScheme='red'>Inativo</Badge>
                          )}
                        </Td>
                        <Td>
                          <IconButton
                            onClick={() => removeCompany(company.id)}
                            variant='outline'
                            colorScheme='red'
                            alt='Excluir profissão'
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
          </Content>
        </Container>
      </Container>
      <Footer>{/* <h1>Job Finder - 2021</h1> */}</Footer>
    </div>
  );
};

export default NewCompany;
