import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import { PALETTES } from '../../theme';
import { IJob } from '../../types';
import { Message } from 'rsuite';
import { FaClipboardCheck } from 'react-icons/fa';
import {
  InputGroup,
  Button,
  Badge,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from '@chakra-ui/react';
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
  isOwner?: boolean;
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

const Jobotron: React.FC<IJobotronProps> = (props) => {
  const { state } = useContext(AuthContext);
  const [jobsSigned, setJobsSigned] = useState<IJob>();
  const [alreadySigned, setAlreadySigned] = useState<boolean>(false);
  const [applies, setApplies] = useState<any>();

  async function applyJob(user_id: any, job_id: any) {
    await api
      .post('/jobs/jobApply', {
        user_id,
        job_id,
      })
      .then((success) => {
        setAlreadySigned(true);
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
        toast.error(`Houve um erro ao realizar a aplicação.\n${err}`, {
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

  async function getJobApplies() {
    await api
      .get(`jobsApplies/filter/${props.jobId}`)
      .then((response) => {
        setApplies(response.data);
      })
      .catch((error) => {
        console.log('Houve um erro ao carregar as candidaturas.\n' + error);
      });
  }

  useEffect(() => {
    (async () => {
      await api
        .get(`jobs/jobApply/${state?.userData.id}`)
        .then((res) => {
          res.data.map((jobLoop: IJob) => {
            if (jobLoop.job_id == props.jobId) {
              getJobApplies();
              setAlreadySigned(true);
            }
          });
        })
        .catch((err) => {
          console.log('Houve um erro ao requisitar os jobs.');
        });
    })();
  }, [state, props.jobId]);

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
            {!alreadySigned ? (
              <>
                {!props.isOwner && (
                  <Button
                    onClick={() => applyJob(state?.userData.id, props.jobId)}
                    colorScheme='green'
                    leftIcon={<FaClipboardCheck />}
                    ml={1}>
                    Quero me candidatar a vaga
                  </Button>
                )}
              </>
            ) : (
              <>
                {!props.isOwner && (
                  <Button
                    disabled
                    onClick={() => applyJob(state?.userData.id, props.jobId)}
                    colorScheme='green'
                    leftIcon={<FaClipboardCheck />}
                    ml={1}>
                    Você já está inscrito nesta vaga.
                  </Button>
                )}
              </>
            )}
          </InputGroup>
        </div>
        {!props.isOwner ? (
          <div style={{ flex: 'content', display: 'flex' }}>
            <img width={1000} src='../../images/bg.jpg' />
          </div>
        ) : (
          <div
            style={{
              width: '50%',
              backgroundColor: '#FFF',
              flex: 'content',
              display: 'flex',
              padding: 100,
              flexDirection: 'column',
              alignItems: 'baseline',
            }}>
            <h1>{applies?.length > 0 ? applies.length : 0} Candidatura(s)</h1>
            <Table variant='striped' colorScheme='cyan'>
              <Thead>
                <Tr>
                  <Th>Nome</Th>
                  <Th>E-mail</Th>
                  <Th>Currículo</Th>
                  <Th>Aprovar</Th>
                </Tr>
              </Thead>
              <Tbody>
                {applies?.map((apply: any) => (
                  <Tr>
                    <Td>{apply.user?.username}</Td>
                    <Td>{apply.user?.email}</Td>
                    <Td>
                      <Button
                        onClick={() =>
                          window.open(
                            'http://localhost:3333/download/' + apply.user?.id,
                            'newwindow',
                            'width=1000,height=1000'
                          )
                        }
                        size='xs'
                        colorScheme='purple'>
                        Visualizar
                      </Button>
                    </Td>
                    <Td>
                      <Button size='xs' colorScheme='green'>
                        Aprovar candidatura
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        )}
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
