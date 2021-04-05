import React from 'react';
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
  return (
    <div style={{ width: 250 }}>
      <Sidenav defaultOpenKeys={['3', '4']} activeKey='1'>
        <Sidenav.Body>
          <Nav>
            <Nav.Item eventKey='1' icon={<Icon icon='dashboard' />}>
              Dashboard
            </Nav.Item>
            {/* <Nav.Item eventKey='2' icon={<Icon icon='group' />}>
              User Group
            </Nav.Item> */}
            <Dropdown
              eventKey='3'
              title='Profissões'
              icon={<Icon icon='magic' />}>
              <Dropdown.Item eventKey='2-1'>
                <Link to='/admin/new-role'>Adicionar nova profissão</Link>
              </Dropdown.Item>
              <Dropdown.Item eventKey='2-2'>Lista de profissões</Dropdown.Item>
              <Dropdown.Item eventKey='2-3'>Editar profissão</Dropdown.Item>
            </Dropdown>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default Navbar;
