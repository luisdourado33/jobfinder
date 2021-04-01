import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { cpfMask } from '../helpers';
import { lightTheme, PALETTES } from '../theme';
import { Formik, Form } from 'formik';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { IFormValues, IFormSignUp } from '../types';
import {
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

const Container = styled.div`
  background-color: ${PALETTES.dark};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  justify-content: center;
  display: flex;

  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;

const Logo = styled.img`
  width: 70px;
  height: 70px;
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
  background-color: transparent;
  background-image: url('images/bg.jpg');
  background-position: center;
  background-size: cover;
  width: 50%;
  flex: content;
  padding: 15px;
  display: flex;

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
  color: ${PALETTES.light};
  font-weight: lighter;
  align-self: flex-end;
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
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const initialSignUpValues: IFormSignUp = {
    fullName: '',
    email: '',
    password: '',
    passwordRepeat: '',
    occupation: '',
    cpf: '',
    birthDate: null,
  };

  const initialValues: IFormValues = {
    email: '',
    password: '',
    rememberCredentials: false,
  };

  function handleSignUp(formFields: IFormSignUp) {
    console.log(JSON.stringify(formFields));
  }

  return (
    <>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Criar uma nova conta</DrawerHeader>

            <DrawerBody>
              <Formik
                initialValues={initialSignUpValues}
                onSubmit={(values, actions) => {
                  console.log({ values, actions });
                  alert(JSON.stringify(values, null, 2));
                  actions.setSubmitting(false);
                }}>
                {(props) => (
                  <Form>
                    <FormControl marginBlock={5} id='fullName' isRequired>
                      <FormLabel marginBottom={4} htmlFor='name'>
                        Nome completo
                      </FormLabel>
                      <Input
                        onChange={props.handleChange('fullName')}
                        id='fullName'
                        variant='flushed'
                        type='text'
                        placeholder='Ex: John Doe'
                      />
                    </FormControl>
                    <FormControl marginBlock={5} id='birthDate' isRequired>
                      <FormLabel marginBottom={4} htmlFor='text'>
                        Data de Nascimento
                      </FormLabel>
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
                    <FormControl marginBlock={5} id='occupation' isRequired>
                      <FormLabel marginBottom={4} htmlFor='text'>
                        Ocupação
                      </FormLabel>
                      <Input
                        onChange={props.handleChange('occupation')}
                        id='occupation'
                        variant='flushed'
                        type='text'
                        placeholder='Ex: Desenvolvedor de Software'
                      />
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
          alert(JSON.stringify(values, null, 2));
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
                onClick={() => setIsLoading(!isLoading)}
                isLoading={isLoading}
                leftIcon={<ArrowForwardIcon />}
                borderWidth={1}
                backgroundColor={PALETTES.dark}
                color={PALETTES.light}
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
  return (
    <Container>
      <Wrapper>
        <ImageSide>
          <BrandTitle>
            Job Finder - Todos os direitos reservados - 2021
          </BrandTitle>
        </ImageSide>
        <FormSide>
          <Logo src='logo192.png' />
          <Title>Entre com sua conta</Title>
          <Paragraph>
            Tenha acesso a grandes oportunidades de emprego por todo o país!
          </Paragraph>
          <FormLogin />
        </FormSide>
      </Wrapper>
    </Container>
  );
};

export default Login;
