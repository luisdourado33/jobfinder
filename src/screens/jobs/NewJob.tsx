import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import swal from 'sweetalert';
import { cpfMask } from '../../helpers';
import { PALETTES } from '../../theme';
import { Formik, Form } from 'formik';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { IFormNewJob, IUser } from '../../types';
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
  Textarea,
} from '@chakra-ui/react';

import { AuthContext } from '../../context/AuthContext';

const Container = styled.div`
  /* background-color: ${PALETTES.dark}; */
  background-color: #eee;
  background-image: url('https://www.transparenttextures.com/patterns/connected.png');
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
  background-color: ${PALETTES.dark};
  /* background-image: url('images/bg.jpg'); */
  /* background-image: url('https://www.transparenttextures.com/patterns/blizzard.png'); */
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
  line-height: 25px;
  font-weight: bolder;
`;

const Paragraph = styled.p`
  color: ${PALETTES.dark};
  font-size: 13px;
  font-weight: lighter;
  margin-block: 20px;
`;

const FormNewJob: React.FC<{}> = () => {
  const { state } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<IUser[]>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentlyTime = new Date(Date.now());

  async function getUsers() {
    await api.get('users').then((response) => {
      setUsers(response.data);
      console.log(response.data);
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

  const initialValues: IFormNewJob = {
    user_id: state?.userData.id,
    title: '',
    description: '',
    period: '',
    location: '',
  };

  async function handlePostJob(job: any) {
    await api
      .post('/jobs', {
        user_id: job.user_id,
        title: job.title,
        description: job.description,
        period: job.period,
        location: job.location,
      })
      .then((success) => {
        swal({
          title: 'Vaga adicionada!',
          text: `Vaga ${success.data.id} adicionada com sucesso.`,
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
    window.document.title = 'Cadastrar nova vaga | Job Finder';
    getUsers();
  }, []);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          handlePostJob(values);
        }}>
        {(props) => (
          <Form>
            <FormControl marginBlock={5} id='user_id' isRequired>
              <FormLabel marginBottom={4} htmlFor='text'>
                Responsável
              </FormLabel>
              <Select
                onChange={(e) => props.setFieldValue('user_id', e.target.value)}
                placeholder={state.userData.username}>
                {/* {users &&
                  users.map((user: IUser, key) => (
                    <option key={key} value={user.id}>
                      {user.username}
                    </option>
                  ))} */}
                <option key={state.userData.id} value={state.userData.id}>
                  {state.userData.username}
                </option>
              </Select>
            </FormControl>
            <FormControl id='title' isRequired>
              <FormLabel marginTop={11} marginBottom={4} htmlFor='title'>
                Título da vaga
              </FormLabel>
              <Input
                onChange={props.handleChange('title')}
                variant='flushed'
                type='text'
                placeholder='Ex: Vaga de Estágio em Recursos Humanos'
                required
              />
            </FormControl>
            <FormControl id='description' isRequired>
              <FormLabel marginTop={11} marginBottom={4} htmlFor='description'>
                Descrição da vaga
              </FormLabel>
              <Textarea
                onChange={props.handleChange('description')}
                variant='flushed'
                type='longtext'
                placeholder='Descreva com detalhes os requisitos necessários para a candidatura'
                required
              />
            </FormControl>
            <FormControl id='period' isRequired>
              <FormLabel marginTop={11} marginBottom={4} htmlFor='period'>
                Período de trabalho
              </FormLabel>
              <Input
                onChange={props.handleChange('period')}
                variant='flushed'
                type='text'
                placeholder='Matutino/Vespertino/Integral'
                required
              />
            </FormControl>
            <FormControl id='location' isRequired>
              <FormLabel marginTop={11} marginBottom={4} htmlFor='location'>
                Localização
              </FormLabel>
              <Input
                onChange={props.handleChange('location')}
                variant='flushed'
                type='text'
                placeholder='Ex: Cuiabá, MT'
                required
              />
            </FormControl>
            <FormControl justifyContent='space-between'>
              <Checkbox marginBlock={15.5} color={PALETTES.dark} defaultChecked>
                Eu concordo com os <b>termos de uso.</b>
              </Checkbox>
            </FormControl>
            <div
              style={{
                flex: 1,
                marginBlock: 30,
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <Button
                type='submit'
                isLoading={isLoading}
                leftIcon={<ArrowForwardIcon />}
                borderWidth={1}
                backgroundColor={PALETTES.dark}
                color={PALETTES.light}
                variant='solid'>
                Publicar vaga
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

const NewJob: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <ImageSide>
          {/* <BrandTitle>Job Finder</BrandTitle> */}
          <img src='../assets/images/vectors/work-cards.png' />
        </ImageSide>
        <FormSide>
          <Logo src='../assets/images/brand/logo.png' />
          <Title>Cadastrar nova vaga de emprego</Title>
          <Paragraph>Preencha todos os dados corretamente:</Paragraph>
          <FormNewJob />
        </FormSide>
      </Wrapper>
    </Container>
  );
};

export default NewJob;
