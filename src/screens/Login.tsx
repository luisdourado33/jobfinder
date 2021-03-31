import React from 'react';
import styled from 'styled-components';
import { Button } from '@chakra-ui/react';

const Container = styled.div`
  background-color: #eee;
  padding: 30px;
`;

const Title = styled.h1`
  color: #333;
`;

const Login: React.FC = () => {
  return (
    <Container>
      <Title>Hello World!</Title>
      <Button onClick={() => alert("You're the best!")} colorScheme='blue'>
        I'm ready to TypeScript's journey!
      </Button>
    </Container>
  );
};

export default Login;
