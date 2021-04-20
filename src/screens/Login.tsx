import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import swal from 'sweetalert';
import { AuthContext, handleLogoff } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { cpfMask } from '../helpers';
import { PALETTES } from '../theme';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { IFormValues, IUser, Role } from '../types';
import {
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
  Select,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

import MobileAuth from '../svg/MobileAuth';

const Container = styled.div`
  /* background-color: ${PALETTES.dark}; */
  background-color: #ffffff;
  background-image: url('https://www.transparenttextures.com/patterns/connected.png');
  position: relative;
  margin: 100px;
  justify-content: center;
  display: flex;

  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;

const Logo = styled.img`
  width: 250px;
  margin-bottom: 51.2px;
`;

const Wrapper = styled.div`
  background-color: ${PALETTES.light};
  margin: auto;
  margin-inline: 50px;
  height: 90vh;
  flex-direction: row;
  flex: auto;
  display: flex;

  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: column;
  }
`;

const ImageSide = styled.div`
  background-position: center;
  background-size: cover;
  width: 50%;
  flex: content;
  flex-direction: row;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const FormSide = styled.div`
  background-color: ${PALETTES.light};
  flex: auto;
  overflow: auto;
  display: flex;
  padding: 100px;
  flex-direction: column;

  @media (max-width: 768px) {
    position: absolute;
    align-self: center;
    flex: 1;
  }
`;

const BrandTitle = styled.h1`
  color: ${PALETTES.dark};
  font-weight: bold;
  align-self: flex-start;
`;

const Title = styled.h1`
  color: ${PALETTES.dark};
  font-size: 30px;
  font-weight: bolder;
`;

const Paragraph = styled.p`
  color: ${PALETTES.dark};
  font-size: 13px;
  font-weight: lighter;
  margin-block: 20px;
`;

const FormLogin: React.FC<{}> = () => {
  const { state, setState } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState<Role[]>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function getRoles() {
    await api.get('roles').then((response) => {
      setRoles(response.data);
    });
  }

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
    email: '',
    password: '',
    rememberCredentials: false,
  };

  async function handleSignIn(userCredentials: IFormValues) {
    setIsLoading(true);
    await api
      .post('/login', {
        email: userCredentials.email,
        password: userCredentials.password,
      })
      .then((success) => {
        const { id, username, email } = success.data.user[0];
        let userToken = success.data.token.token;

        setState({
          ...state,
          isAuth: true,
          userData: success.data.user[0],
        });

        api.defaults.headers.Authorization = `Bearer ${userToken}`;

        localStorage.setItem('token', JSON.stringify(userToken));
        localStorage.setItem('@userId', id);

        toast.success(`Seja bem vindo, ${username}!`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setIsLoading(false);
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Houve um erro ao realizar o login.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsLoading(false);
      });
  }

  async function handleSignUp(formFields: IUser) {
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

  useEffect(() => {
    window.document.title = 'Acessar a plataforma | Job Finder';
    getRoles();
  }, []);

  return (
    <>
      <Drawer id='cadastro' isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Criar uma nova conta</DrawerHeader>

            <DrawerBody>
              <Formik
                initialValues={initialSignUpValues}
                onSubmit={(values, actions) => {
                  handleSignUp(values);
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
                    <FormControl marginBlock={5} id='passwordRepeat' isRequired>
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
                          props.setFieldValue('cpf', cpfMask(cpf.target.value))
                        }
                        id='cpf'
                        value={props.values.cpf}
                        variant='flushed'
                        placeholder='Somente números'
                      />
                    </FormControl>

                    <DrawerFooter>
                      <Button variant='outline' mr={3} onClick={onClose}>
                        Cancelar
                      </Button>
                      <Button type='submit' colorScheme='blue'>
                        Criar conta
                      </Button>
                    </DrawerFooter>
                  </Form>
                )}
              </Formik>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          handleSignIn(values);
          actions.setSubmitting(false);
        }}>
        {(props) => (
          <Form>
            <FormControl id='email' isRequired>
              <FormLabel marginBottom={4} htmlFor='email'>
                E-mail
              </FormLabel>
              <Input
                variant='flushed'
                onChange={props.handleChange('email')}
                type='email'
                placeholder='Ex: johndoe@email.com'
              />
            </FormControl>
            <FormControl id='password' isRequired>
              <FormLabel marginTop={11} marginBottom={4} htmlFor='password'>
                Senha
              </FormLabel>
              <Input
                variant='flushed'
                onChange={props.handleChange('password')}
                type='password'
                placeholder='Mínimo 8 caracteres.'
                required
              />
            </FormControl>

            <FormControl justifyContent='space-between'>
              <Checkbox marginBlock={15.5} color={PALETTES.dark} defaultChecked>
                Lembrar-me
              </Checkbox>
            </FormControl>
            <div
              style={{
                flex: 1,
                marginBlock: 30,
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <Button onClick={onOpen} borderWidth={1} variant='outline'>
                Criar uma conta
              </Button>
              <Button
                type='submit'
                isLoading={isLoading}
                leftIcon={<ArrowForwardIcon />}
                backgroundColor={PALETTES.yellowGold}
                color={PALETTES.dark}
                variant='solid'>
                Acessar plataforma
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

const Login: React.FC = () => {
  const { state, setState } = useContext(AuthContext);
  const Authenticated: React.FC = () => {
    return (
      <div>
        <Button onClick={() => handleLogoff()} colorScheme='red'>
          Sair da conta
        </Button>
        <Button>
          <Link to='/dashboard'>Voltar a plataforma</Link>
        </Button>
      </div>
    );
  };

  return (
    <Container>
      <Wrapper>
        <ImageSide>
          <MobileAuth />
        </ImageSide>
        <FormSide>
          <Logo src='assets/images/brand/logo.png' />
          <Title>
            {state.isAuth
              ? `Olá novamente, ${state.userData.username}`
              : 'Entre com sua conta'}
          </Title>
          <Paragraph>
            {state.isAuth
              ? 'Você já está logado na plataforma.'
              : 'Tenha acesso a grandes oportunidades de emprego por todo o país!'}
          </Paragraph>
          {state.isAuth ? <Authenticated /> : <FormLogin />}
        </FormSide>
      </Wrapper>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </Container>
  );
};

export default Login;
