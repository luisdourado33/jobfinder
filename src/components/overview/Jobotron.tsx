import React from 'react';
import styled from 'styled-components';
import { PALETTES } from '../../theme';
import { Container, Header, Content, Footer, Message } from 'rsuite';
import {
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Badge,
} from '@chakra-ui/react';
import { FaClipboardCheck } from 'react-icons/fa';

interface IJobotronProps {
  title: string;
  subtitle: string;
  jobId: string;
  location: string;
  createdAt: string;
  owner: string;
  period: string;
  isRemote: boolean;
  status: boolean;
}

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
  flex-direction: row-reverse;
  justify-content: space-between;
  flex: content;
  display: flex;
`;

export const Description = styled.h3`
  line-height: 20px;
  margin-block: 10px;
`;

const Jobotron: React.FC<IJobotronProps> = (props) => {
  return (
    <Jumbotron>
      <JumbotronSeparator>
        <div
          style={{
            flexDirection: 'column',
            flex: 1,
            display: 'flex',
            padding: '100px',
            justifyContent: 'center',
            alignContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <h1>
            #{props.jobId} - {props.title}
          </h1>

          <Message
            showIcon
            type='info'
            title={
              <div>
                <b>Criado por:</b> <i>{props.owner}</i>
              </div>
            }
          />
          <Message
            type='warning'
            title={<b>Descrição:</b>}
            description={<Description>{props.subtitle}</Description>}
          />
          <div
            style={{
              flexDirection: 'row',
              flex: 1,
              display: 'flex',
              alignItems: 'baseline',
            }}>
            <Message
              style={{ marginRight: 10 }}
              type='info'
              title={
                <div>
                  <b>Local de trabalho: </b>
                  <h3>
                    <i>{props.location}</i>
                  </h3>
                  {props.isRemote && <Badge colorScheme='green'>Remoto</Badge>}
                </div>
              }
            />
            <Message
              style={{ marginRight: 10 }}
              type='info'
              title={
                <div>
                  <b>Período: </b>
                  <h3>
                    <Badge colorScheme='cyan'>{props.period}</Badge>
                  </h3>
                </div>
              }
            />
            <Message
              style={{ marginRight: 10 }}
              type='info'
              title={
                <div>
                  <b>Cadastrada em: </b>
                  <h3>{props.createdAt}</h3>
                </div>
              }
            />
          </div>

          <InputGroup mt={10}>
            {props.status ? (
              <Button
                colorScheme='green'
                leftIcon={<FaClipboardCheck />}
                ml={1}>
                Quero me candidatar a vaga
              </Button>
            ) : (
              <Button
                disabled
                colorScheme='red'
                leftIcon={<FaClipboardCheck />}
                ml={1}>
                Inscrições encerradas
              </Button>
            )}
          </InputGroup>
        </div>
        <div style={{ flex: 1, display: 'flex' }}>
          <img width={1000} src='../../images/bg.jpg' />
        </div>
      </JumbotronSeparator>
    </Jumbotron>
  );
};

export default Jobotron;
