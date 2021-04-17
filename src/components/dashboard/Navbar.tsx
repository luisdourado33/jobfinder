import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import {
  Navbar as NavbarSuite,
  Nav,
  Icon,
  Dropdown,
  Whisper,
  Button,
  Badge,
  Tooltip,
} from 'rsuite';
import { Text, Heading } from '@chakra-ui/react';
import { IUser } from '../../types';
import { PALETTES } from '../../theme';

import { AuthContext, handleLogoff } from '../../context/AuthContext';

const tooltip = (
  <Tooltip>
    This is a help <i>tooltip</i> .
  </Tooltip>
);

const UserOptionsDropdown = ({ ...props }) => (
  <Dropdown {...props}>
    <Dropdown.Item
      icon={<Icon icon='cog' style={{ color: PALETTES.yellowGold }} />}>
      Minhas vagas
    </Dropdown.Item>
    <Dropdown.Item
      icon={<Icon icon='cog' style={{ color: PALETTES.yellowGold }} />}>
      Configurações
    </Dropdown.Item>
    <Dropdown.Item
      onSelect={() => handleLogoff()}
      icon={<Icon icon='exit' style={{ color: PALETTES.yellowGold }} />}>
      Sair
    </Dropdown.Item>
  </Dropdown>
);

const Navbar: React.FC = () => {
  const { state } = useContext(AuthContext);
  // alert(JSON.stringify(state.userData));
  let token = '';
  let userId;
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUser>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('@userId');

    (() => {
      api
        .get(`users/${userId}`)
        .then((user) => {
          setUserData(user.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    })();

    if (token) {
      api.defaults.headers.Authorization = JSON.parse(token);
      setIsAuth(true);
    }
  }, [token, userId]);

  return (
    <NavbarSuite
      appearance='inverse'
      style={{ backgroundColor: PALETTES.dark }}>
      <NavbarSuite.Header>
        <Heading size={'md'} padding='18px 20px'>
          <a href='/dashboard'>
            <Text
              bgGradient={`linear(to-l, ${PALETTES.yellowGold},#FFF)`}
              bgClip='text'
              fontSize='1xl'
              fontWeight='bold'>
              Job Finder
            </Text>
          </a>
        </Heading>
      </NavbarSuite.Header>
      <NavbarSuite.Body>
        <Nav center>
          <Nav.Item icon={<Icon icon='home' />}>
            <b>Encontre um emprego</b>
          </Nav.Item>
          <Nav.Item>Empresas</Nav.Item>
          <Nav.Item>Páginas</Nav.Item>
        </Nav>
        {userData?.access === 60 && (
          <Nav pullRight>
            <Nav.Item
              href='/admin'
              icon={<Icon icon='cog' style={{ color: PALETTES.light }} />}
              style={{ backgroundColor: 'orangered' }}>
              {isAuth && 'Painel Administrativo'}
            </Nav.Item>
          </Nav>
        )}
        <Nav
          pullRight
          style={{ alignItems: 'center', flex: 1, display: 'flex' }}>
          {isAuth ? (
            <UserOptionsDropdown
              title={`Olá, ${state.userData.username}`}
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
