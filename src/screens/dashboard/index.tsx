import React from 'react';
import { Container, Navbar } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <Container>
        <Navbar>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </Navbar>
      </Container>
    </>
  );
};

export default Dashboard;
