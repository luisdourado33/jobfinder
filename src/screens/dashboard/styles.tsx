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
  background-color: ${'#f8f8f8'};
  /* background-color: #ffffff; */
  background-image: url('https://www.transparenttextures.com/patterns/arches.png');
  justify-content: center;
  align-items: center;
  flex: 1;
  display: flex;

  @media (max-width: 768px) {
    flex: auto;
  }

  h1 {
    width: 50%;
    line-height: 30px;
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: bold;
    color: #000;
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

export const JumbotronSeparatorContent = styled.div`
  flex-direction: column;
  flex: 1;
  display: flex;
  padding: 120px;
  justify-content: center;
  align-content: flex-start;
  align-items: flex-start;

  @media (max-width: 768px) {
    align-content: center;
    align-items: center;

    h1 {
      text-align: center;
      flex: 1;
      width: 95%;
    }
  }
`;

export const InputGroupWrap = styled.div`
  flex-direction: row;
  flex: content;
  display: contents;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    align-content: center;
    align-self: center;
    justify-content: center;
    flex: 1;
    display: flex;
  }
`;

export const ImageWrap = styled.div`
  flex: 1;
  display: flex;

  @media (max-width: 768px) {
    display: none;
  }
`;
