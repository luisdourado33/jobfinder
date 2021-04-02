import React from 'react';
import { Navbar as NavbarSuite, Nav, Icon } from 'rsuite';

const Navbar: React.FC = () => {
  return (
    <NavbarSuite>
      <NavbarSuite.Header>
        <a
          href='#'
          style={{
            padding: '18px 20px',
            display: 'inline-block',
          }}>
          <img width={120} src='assets/images/brand/logo.png' />
        </a>
      </NavbarSuite.Header>
      <NavbarSuite.Body>
        <Nav center>
          <Nav.Item icon={<Icon icon='home' />}>
            <b>Encontre um emprego</b>
          </Nav.Item>
          <Nav.Item>Empresas</Nav.Item>
          <Nav.Item>Páginas</Nav.Item>
        </Nav>
        <Nav pullRight>
          <Nav.Item href='/login' icon={<Icon icon='user' />}>
            <b>Entrar</b>
          </Nav.Item>
        </Nav>
      </NavbarSuite.Body>
    </NavbarSuite>
  );
};

export default Navbar;
