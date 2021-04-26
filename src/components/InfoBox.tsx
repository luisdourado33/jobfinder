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
  background-image: url('https://www.transparenttextures.com/patterns/45-degree-fabric-light.png');
  padding: 15px;
  color: ${(props) => props.textColor || '#FFF'};
  cursor: pointer;
  overflow: auto;
  border-radius: 10px;
  transition: all 0.4s;

  border-width: 1px;

  :hover {
    border-color: ${PALETTES.yellowGold};
    box-shadow: 1px 5px 5px 0px #eee;
  }
`;

const InfoBox: React.FC<IProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [loading]);
  return (
    <>
      <Container bgColor={props.bgColor} textColor={props.textColor}>
        <Stat>
          <StatLabel fontWeight='bold'>{props.title}</StatLabel>
          {loading ? (
            <Skeleton color='#FFF' height='27px' width={7} marginBlock={1} />
          ) : (
            <StatNumber>{props.value}</StatNumber>
          )}
          <hr style={{ marginBlock: 5 }} />
          <StatHelpText>Atualizado em: {dateNow('short')}</StatHelpText>
        </Stat>
        {props.children}
      </Container>
    </>
  );
};

export default InfoBox;
