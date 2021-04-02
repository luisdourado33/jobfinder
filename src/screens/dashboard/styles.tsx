import styled from 'styled-components';
import { PALETTES } from '../../theme';

export const Container = styled.div`
  background-color: ${PALETTES.light};
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  display: flex;
`;

export const Navbar = styled.nav`
  background-color: ${PALETTES.dark};
  flex-direction: column;
  display: inline;

  ul {
    flex-direction: row;
    flex: 1;
    display: inline;
  }

  li {
    color: #fff;
    padding: 5px;
    font-weight: bold;
  }
`;

export const Jumbotron = styled.div`
  background-color: ${PALETTES.light};
  /* background-color: #ffffff; */
  background-image: url('https://www.transparenttextures.com/patterns/asfalt-dark.png');
  justify-content: center;
  align-items: center;
  flex: 1;
  display: flex;

  h1 {
    width: 50%;
    line-height: 30px;
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: bold;
    color: #333;
  }

  p {
    font-size: 15px;
    font-weight: lighter;
    color: #fff;
  }
`;

export const JumbotronSeparator = styled.div`
  flex-direction: row;
  justify-content: space-between;
  flex: content;
  display: flex;
`;
