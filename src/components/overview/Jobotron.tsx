import React, { useContext } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import { PALETTES } from '../../theme';
import { Message } from 'rsuite';
import { FaClipboardCheck } from 'react-icons/fa';
import { InputGroup, Button, Badge } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';

import { AuthContext } from '../../context/AuthContext';
interface IJobotronProps {
  title: string;
  subtitle: string;
  jobId: number;
  location: string;
  createdAt: string;
  owner?: string;
  period: string;
  isRemote?: boolean;
  status?: boolean;
}

export const Jumbotron = styled.div`
  background-color: ${PALETTES.light};
  background-image: url('https://www.transparenttextures.com/patterns/asfalt-dark.png');
  justify-content: center;
  align-items: center;
  flex: auto;
  height: 100%;
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
  flex: auto;
  display: flex;
  align-self: center;
  height: 100%;
`;

export const Description = styled.h3`
  line-height: 20px;
  margin-block: 10px;
`;

async function applyJob(user_id: any, job_id: any) {
  await api
    .post('/jobs/jobApply', {
      user_id,
      job_id,
    })
    .then((success) => {
      toast.success(`Aplicação realizada com sucesso!`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch((err) => {
      toast.error(`Houve um erro ao realizar a aplicação.`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
}

const Jobotron: React.FC<IJobotronProps> = (props) => {
  const { state } = useContext(AuthContext);

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
            {props.status && state.isAuth && (
              <Button
                onClick={() => applyJob(state.userData.id, props.jobId)}
                colorScheme='green'
                leftIcon={<FaClipboardCheck />}
                ml={1}>
                Quero me candidatar a vaga
              </Button>
            )}
          </InputGroup>
        </div>
        <div style={{ flex: 'content', display: 'flex' }}>
          <img width={1000} src='../../images/bg.jpg' />
        </div>
      </JumbotronSeparator>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </Jumbotron>
  );
};

export default Jobotron;
