import React, { useEffect, useState } from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import { Jumbotron, JumbotronSeparator } from './styles';
import { Container, Header, Content, Footer } from 'rsuite';
import { PALETTES } from '../../theme';
import { Input, InputGroup, InputLeftElement, Button } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import Navbar from '../../components/dashboard/Navbar';
import Section from '../../components/Section';

const Dashboard: React.FC = () => {
  useEffect(() => {
    window.document.title = 'Plataforma | Job Finder';
  }, []);

  return (
    <div className='show-container'>
      <Container>
        <Header>
          <Navbar />
        </Header>
        <Content>
          <Jumbotron>
            <JumbotronSeparator>
              <div
                style={{
                  flexDirection: 'column',
                  flex: 1,
                  display: 'flex',
                  padding: '100px',
                  justifyContent: 'center',
                  alignContent: 'flex-start',
                  alignItems: 'flex-start',
                }}>
                <h1>Encontre o seu emprego dos sonhos facilmente conosco!</h1>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                  />
                  <Input
                    bgColor={PALETTES.light}
                    width={450}
                    colorScheme='linkedin'
                    type='text'
                    placeholder='Ex: Desenvolvedor de Software em Cuiabá'
                  />
                  <Button
                    colorScheme='facebook'
                    leftIcon={<SearchIcon />}
                    ml={1}>
                    Procurar
                  </Button>
                </InputGroup>
              </div>
              <div style={{ flex: 1, display: 'flex' }}>
                <img width={1000} src='images/bg.jpg' />
              </div>
            </JumbotronSeparator>
          </Jumbotron>
          <Section
            theme='light'
            title='Empregos relacionados ao seu perfil'
            subtitle='+300 empregos adicionados hoje.'>
            <h1>Item da seção</h1>
          </Section>
          <Section
            theme='dark'
            title='Grandes empresas estão conosco!'
            subtitle='Empresas parceiras'>
            <h1>Item da seção</h1>
          </Section>
        </Content>
        <Footer>
          <h3>Job Finder - Todos os direitos reservados</h3>
        </Footer>
      </Container>
    </div>
  );
};

export default Dashboard;
