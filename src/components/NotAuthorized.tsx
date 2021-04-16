import React from 'react';
import styled from 'styled-components';
import { PALETTES } from '../theme';

import Navbar from '../components/dashboard/Navbar';
import Footer from '../components/Footer';

interface IAuthorization {
  access?: number;
}

const Container = styled.div``;
const CenteredMessage = styled.div`
  height: 100%;
  min-height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;
  background-color: ${PALETTES.yellowGold};
  color: ${PALETTES.dark};
`;

const NotAuthorized: React.FC<IAuthorization> = (props) => {
  return (
    <Container>
      <Navbar />
      <CenteredMessage>
        <h1>Você não possui permissão para acessar esta página.</h1>
      </CenteredMessage>
      <Footer />
    </Container>
  );
};

export default NotAuthorized;
