import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  Content,
  Footer,
  Sidenav,
  Sidebar,
  Icon,
  Nav,
  Dropdown,
} from 'rsuite';

const Navbar: React.FC = () => {
  const [active, setActive] = useState('3');

  function handleChangePage(pageActive: string) {
    setActive(pageActive);
  }

  return (
    <div style={{ width: 250 }}>
      <Sidenav activeKey={active}>
        <Sidenav.Body>
          <Nav>
            <Nav.Item
              onSelect={() => handleChangePage('1')}
              eventKey='1'
              icon={<Icon icon='dashboard' />}>
              <Link to='/admin'>Dashboard</Link>
            </Nav.Item>
            <Nav.Item
              onSelect={() => handleChangePage('2')}
              eventKey='2'
              icon={<Icon icon='dashboard' />}>
              <Link to='/admin/new-user'>Usuários</Link>
            </Nav.Item>
            <Nav.Item
              onSelect={() => handleChangePage('3')}
              eventKey='3'
              icon={<Icon icon='dashboard' />}>
              <Link to='/admin/new-role'>Profissões</Link>
            </Nav.Item>
            <Nav.Item
              onSelect={() => handleChangePage('4')}
              eventKey='4'
              icon={<Icon icon='dashboard' />}>
              <Link to='/admin/new-company'>Categorias</Link>
            </Nav.Item>
            {/* <Dropdown
              eventKey='2'
              title='Usuários'
              icon={<Icon icon='magic' />}>
              <Dropdown.Item eventKey='2-1'>
                <Link to='/admin/new-user'>Gerenciar usuários</Link>
              </Dropdown.Item>
            </Dropdown>
            <Dropdown
              eventKey='3'
              title='Profissões'
              icon={<Icon icon='magic' />}>
              <Dropdown.Item eventKey='3-1'>
                <Link to='/admin/new-role'>Gerenciar profissões</Link>
              </Dropdown.Item>
            </Dropdown>
            <Dropdown
              eventKey='4'
              title='Categorias de Empresas'
              icon={<Icon icon='magic' />}>
              <Dropdown.Item eventKey='4-1'>
                <Link to='/admin/new-company'>Gerenciar categorias</Link>
              </Dropdown.Item>
            </Dropdown> */}
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default Navbar;
