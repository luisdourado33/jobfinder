import React from 'react';
import { Container } from '@chakra-ui/react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #98ded9;
  color: white;
  padding: 5px;
  flex-direction: row;
  display: flex;
  flex: 1;
`;

const ImageHeader = styled.div`
  background-image: url('https://images.unsplash.com/photo-1553877522-43269d4ea984?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 100px;
  flex: 1;
  display: flex;
`;

const FormHeader = styled.div`
  background-color: #161d6f;
  padding: 30px;
  display: flex;
  flex: 1;
`;

const Title = styled.h1`
  color: #333;
`;

const Login: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <ImageHeader>
          <h1>Hello WORLD</h1>
        </ImageHeader>
        <FormHeader>
          <h1>Hello World</h1>
          <p>
            Excepteur dolore ex et mollit eiusmod aute ipsum ex cupidatat elit
            consectetur. Enim ea id deserunt et. Duis voluptate ullamco sunt
            irure culpa ut sunt commodo proident id commodo occaecat.
            Exercitation officia labore cillum velit sint ex tempor nostrud nisi
            aliqua qui elit aute incididunt. Amet ullamco id veniam nulla.
          </p>
        </FormHeader>
      </Wrapper>
    </Container>
  );
};

export default Login;
