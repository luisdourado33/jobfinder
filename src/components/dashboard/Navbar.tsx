import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { Navbar as NavbarSuite, Nav, Icon, Button, Dropdown } from 'rsuite';
import { Text } from '@chakra-ui/react';
import { PALETTES } from '../../theme';

import { AuthContext } from '../../context/AuthContext';

const UserOptionsDropdown = ({ ...props }) => (
  <Dropdown {...props}>
    <Dropdown.Item>New File</Dropdown.Item>
    <Dropdown.Item>New File with Current Profile</Dropdown.Item>
    <Dropdown.Item>Download As...</Dropdown.Item>
    <Dropdown.Item>Export PDF</Dropdown.Item>
    <Dropdown.Item>Export HTML</Dropdown.Item>
    <Dropdown.Item>Settings</Dropdown.Item>
    <Dropdown.Item>About</Dropdown.Item>
  </Dropdown>
);

const Navbar: React.FC = () => {
  const { state } = useContext(AuthContext);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = JSON.parse(token);
      setIsAuth(true);
    }
  });

  return (
    <NavbarSuite
      appearance='inverse'
      style={{ backgroundColor: PALETTES.dark }}>
      <NavbarSuite.Header>
        <Text textTransform='uppercase' padding='18px 20px'>
          Job Finder
        </Text>
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
          <Nav.Item
            href='/admin'
            icon={<Icon icon='cog' style={{ color: PALETTES.light }} />}
            style={{ backgroundColor: 'orangered' }}>
            {isAuth && 'Painel Administrativo'}
          </Nav.Item>
        </Nav>
        <Nav
          pullRight
          style={{ alignItems: 'center', flex: 1, display: 'flex' }}>
          {isAuth ? (
            <UserOptionsDropdown
              title={`Olá, ${'state.username'}`}
              trigger={['click', 'hover']}
            />
          ) : (
            <Nav.Item
              style={{ backgroundColor: PALETTES.light }}
              href='/login'
              icon={
                <Icon icon='user' style={{ color: PALETTES.yellowGold }} />
              }>
              <b style={{ color: PALETTES.dark }}>Acessar plataforma</b>
            </Nav.Item>
          )}
        </Nav>
      </NavbarSuite.Body>
    </NavbarSuite>
  );
};

export default Navbar;
