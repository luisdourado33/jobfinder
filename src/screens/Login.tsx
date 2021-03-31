import React from 'react';
// import { Container } from '@chakra-ui/react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #161d6f;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
`;

const Wrapper = styled.div`
  background-color: #fff;
  margin: 30px;
  flex-direction: row;
  display: flex;
  flex: 1;
`;

const ImageSide = styled.div`
  background-color: orange;
  flex: 1;
  padding: 30px;
`;

const FormSide = styled.div`
  background-color: orangered;
  flex: 1;
  padding: 30px;
`;

const Login: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <ImageSide>
          <h1>Image Side</h1>
        </ImageSide>
        <FormSide>
          <h1>Form Side</h1>
          <p>
            Voluptate proident eu commodo sint incididunt tempor ipsum aliquip
            cillum sint. Ullamco reprehenderit consectetur et commodo pariatur
            reprehenderit incididunt quis voluptate anim. Ipsum amet enim veniam
            proident dolor aliquip ex.
          </p>
        </FormSide>
      </Wrapper>
    </Container>
  );
};

export default Login;
