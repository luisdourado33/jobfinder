import React, { useState } from 'react';
import styled from 'styled-components';
import { IFormValues } from '../types';
import { lightTheme, PALETTES } from '../theme';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Checkbox,
  Box,
  Image,
  Badge,
  Link,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
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
`;

const ImageSide = styled.div`
  background-color: transparent;
  background-image: url('images/bg.jpg');
  background-position: center;
  background-size: cover;
  width: 50%;
  flex: content;
  display: flex;
`;

const FormSide = styled.div`
  background-color: ${PALETTES.light};
  flex: auto;
  overflow: auto;
  display: flex;
  padding: 100px;
  flex-direction: column;
`;

const BrandTitle = styled.h1`
  color: ${PALETTES.light};
  font-weight: bold;
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
  const initialValues: IFormValues = {
    email: '',
    password: '',
    rememberCredentials: false,
  };

  return (
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
            <Button borderWidth={1} variant='outline'>
              Criar uma conta
            </Button>
            <Button
              onClick={() => setIsLoading(!isLoading)}
              isLoading={isLoading}
              leftIcon={<ArrowForwardIcon />}
              // borderRadius={30}
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
  );
};
// --
const Login: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <ImageSide>{/* <BrandTitle>Job Finder</BrandTitle> */}</ImageSide>
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
