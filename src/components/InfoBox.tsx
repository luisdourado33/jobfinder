import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PALETTES } from '../theme';
import { dateNow } from '../helpers';
import {
  Box,
  Heading,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Skeleton,
} from '@chakra-ui/react';

interface IProps {
  title?: string | number;
  value?: string | number;
  subtitle?: string | number;
  bgColor?: string;
  textColor?: string;
}

interface IContainerProps {
  bgColor?: string;
  textColor?: string;
}

const Container = styled.div<IContainerProps>`
  width: auto;
  height: auto;
  background-color: ${(props) => props.bgColor || '#333'};
  background-image: url('https://www.transparenttextures.com/patterns/asfalt-dark.png');
  padding: 15px;
  color: ${(props) => props.textColor || '#FFF'};
  cursor: pointer;
  overflow: auto;
  border-radius: 10px;
  transition: box-shadow 0.4s;
  :hover {
    box-shadow: 10px 10px 10px 5px #eee;
  }
`;

const InfoBox: React.FC<IProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, [loading]);
  return (
    <>
      <Container bgColor={props.bgColor} textColor={props.textColor}>
        <Stat>
          <StatLabel>{props.title}</StatLabel>
          {loading ? (
            <Skeleton color='#FFF' height='27px' width={7} marginBlock={1} />
          ) : (
            <StatNumber>{props.value}</StatNumber>
          )}
          <StatHelpText>Atualizado em: {dateNow('short')}</StatHelpText>
        </Stat>
        {props.children}
      </Container>
    </>
  );
};

export default InfoBox;
