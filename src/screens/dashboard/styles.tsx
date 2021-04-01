import styled from 'styled-components';
import { PALETTES } from '../../theme';

export const Container = styled.div`
  background-color: ${PALETTES.light};
  color: #333;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  display: flex;
`;

export const Navbar = styled.nav`
  background-color: ${PALETTES.semiDark};
  flex-direction: column;
  display: inline-flex;
`;
