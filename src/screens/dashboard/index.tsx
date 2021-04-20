import React, { useState, useEffect, useContext } from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { PALETTES } from '../../theme';
import { IJob } from '../../types';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Jumbotron,
  JumbotronSeparator,
  JumbotronSeparatorContent,
  InputGroupWrap,
  ImageWrap,
} from './styles';
import { Container, Header, Content, Footer } from 'rsuite';
import { Input, InputGroup, Button } from '@chakra-ui/react';

import Navbar from '../../components/dashboard/Navbar';
import Section from '../../components/Section';
import GridCard from '../../components/dashboard/GridCard';

import WomanSVG from '../../svg/WomanSVG';

const Dashboard: React.FC = () => {
  const [jobs, setJobs] = useState<IJob[]>();
  const { state } = useContext(AuthContext);

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

  const UserMetrics: React.FC = () => {
    return (
      <JumbotronSeparatorContent>
        <h1>Seja bem vindo(a), {state.userData.username}</h1>
        <InputGroup>
          <InputGroupWrap>
            <Input
              mr={1}
              bgColor={PALETTES.light}
              colorScheme='linkedin'
              type='text'
              placeholder='Ex: Desenvolvedor de Software em Cuiabá'
            />
            <Button colorScheme='green' leftIcon={<SearchIcon />}>
              Procurar
            </Button>
          </InputGroupWrap>
        </InputGroup>
      </JumbotronSeparatorContent>
    );
  };

  useEffect(() => {
    window.document.title = 'Plataforma - Job Finder';
    getJobs();
  }, []);

  return (
    <Container>
      <Header>
        <Navbar />
      </Header>
      <Content>
        <Jumbotron>
          <JumbotronSeparator>
            {state.isAuth ? (
              <UserMetrics />
            ) : (
              <JumbotronSeparatorContent>
                <h1>Encontre o seu emprego dos sonhos facilmente conosco!</h1>
                <InputGroup>
                  <InputGroupWrap>
                    <Input
                      minWidth='auto'
                      bgColor={PALETTES.light}
                      colorScheme='linkedin'
                      type='text'
                      placeholder='Ex: Desenvolvedor de Software em Cuiabá'
                    />
                    <Button colorScheme='orange' leftIcon={<SearchIcon />}>
                      Procurar
                    </Button>
                  </InputGroupWrap>
                </InputGroup>
              </JumbotronSeparatorContent>
            )}
            <ImageWrap>
              <WomanSVG />
            </ImageWrap>
          </JumbotronSeparator>
        </Jumbotron>
        <Section
          theme='light'
          title='Empregos relacionados ao seu perfil'
          subtitle={`+${jobs?.length} empregos adicionados hoje.`}>
          {jobs && <GridCard cardData={jobs} />}
        </Section>
      </Content>
      <Footer
        style={{
          padding: 30,
          paddingLeft: 100,
          backgroundColor: PALETTES.dark,
          color: '#eee',
        }}>
        <h3>Job Finder - Todos os direitos reservados</h3>
      </Footer>
    </Container>
  );
};

export default Dashboard;
