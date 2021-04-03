import React from 'react';
import styled from 'styled-components';
import { PALETTES } from '../theme';

interface IProps {
  title: string;
  subtitle: string;
  theme?: string;
}

function getTheme(theme: string) {
  let themeObj = {
    bg: '#333',
    color: '#FFF',
  };
  switch (theme) {
    case 'light':
      themeObj.bg = PALETTES.light;
      themeObj.color = PALETTES.dark;
      break;
    case 'dark':
      themeObj.bg = PALETTES.dark;
      themeObj.color = PALETTES.light;
      break;
    default:
      break;
  }

  return themeObj;
}

const Section: React.FC<IProps> = (props) => {
  const Container = styled.div`
    background-color: ${props.theme ? getTheme(props.theme).bg : '#333'};
    color: ${props.theme ? getTheme(props.theme).color : '#eee'};
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
    display: flex;
    text-align: center;
    padding-bottom: 50px;
  `;

  const Title = styled.h1`
    color: ${props.theme ? getTheme(props.theme).color : '#eee'};
    font-weight: bolder;
    font-size: 30px;
    line-height: 30px;
    width: 350px;
  `;

  const Subtitle = styled.h1`
    color: ${props.theme ? getTheme(props.theme).color : '#eee'};
    font-weight: normal;
  `;

  const Content = styled.div`
    margin-top: 50px;
  `;
  return (
    <Container>
      <Subtitle>{props.subtitle}</Subtitle>
      <Title>{props.title}</Title>
      <Content>{props.children}</Content>
    </Container>
  );
};

export default Section;
