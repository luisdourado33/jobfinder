import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidenav, Sidebar, Icon, Navbar as NavbarRS, Nav } from 'rsuite';

const Navbar: React.FC = () => {
  const [active, setActive] = useState('3');
  const [expand, setExpand] = useState<boolean>(true);

  function handleChangePage(pageActive: string) {
    setActive(pageActive);
  }

  const NavToggle = ({ expand, onChange }: any) => {
    return (
      <NavbarRS appearance='subtle' className='nav-toggle'>
        <NavbarRS.Body>
          <Nav pullRight>
            <Nav.Item
              onClick={onChange}
              style={{ width: 56, textAlign: 'center' }}>
              <Icon icon={expand ? 'angle-left' : 'angle-right'} />
            </Nav.Item>
          </Nav>
        </NavbarRS.Body>
      </NavbarRS>
    );
  };

  return (
    <Sidebar
      style={{ display: 'flex', flexDirection: 'column' }}
      width={expand ? 260 : 56}
      collapsible>
      <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance='default'>
        <Sidenav.Header></Sidenav.Header>
        <Sidenav.Body>
          <Nav>
            <Link to='/admin'>
              <Nav.Item eventKey='1' active icon={<Icon icon='dashboard' />}>
                Dashboard
              </Nav.Item>
            </Link>
            <Link to='/admin/new-user'>
              <Nav.Item eventKey='2' icon={<Icon icon='group' />}>
                Usuários
              </Nav.Item>
            </Link>
            <Link to='/admin/new-role'>
              <Nav.Item eventKey='3' icon={<Icon icon='group' />}>
                Profissões
              </Nav.Item>
            </Link>
            <Link to='/admin/new-company'>
              <Nav.Item eventKey='4' icon={<Icon icon='group' />}>
                Categorias
              </Nav.Item>
            </Link>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
      <NavToggle
        expand={expand}
        onChange={() => setExpand((prevState) => !prevState)}
      />
    </Sidebar>
  );
};

export default Navbar;
