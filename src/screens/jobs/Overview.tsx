import React, { useState, useEffect, useContext } from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import api from '../../services/api';
import { PALETTES } from '../../theme';
import { IJob } from '../../types';
import { useParams } from 'react-router-dom';
import { Container, Header, Content, Message } from 'rsuite';

import { AuthContext } from '../../context/AuthContext';

import Navbar from '../../components/dashboard/Navbar';
import Jobotron from '../../components/overview/Jobotron';
import Footer from '../../components/Footer';

type IOverviewProps = {
  title: string;
};

const Overview: React.FC<IOverviewProps> = ({ title }) => {
  const { state } = useContext(AuthContext);
  let { jobId } = useParams<any>();
  const [isOwner, setIsOwner] = useState<boolean>();
  const [job, setJob] = useState<IJob>();

  async function getJob() {
    if (jobId) {
      await api
        .get('/jobs/' + jobId)
        .then((response) => {
          setJob(response.data[0]);
          console.log(job);
          if (job) {
            window.document.title = `${jobId} - ${job?.title} | Job Finder`;

            let ownerId = response.data[0].user_id;
            if (ownerId == state.userData.id) {
              setIsOwner(true);
            }
            // Checar se o JOB pertence ao usuário autenticado
            // alert(`Seu ID: ${state.userData.id}\nDono do JOB: ${job.user_id}`);
          }
        })
        .catch((error) => {
          alert('Houve um erro ao carregar a vaga');
        });
    }
  }

  useEffect(() => {
    getJob();
  }, [state, jobId]);

  return (
    <div className='show-container'>
      <Container>
        <Header>
          <Navbar />
        </Header>
        <Content>
          {job && (
            <Jobotron
              jobId={jobId}
              location={job?.location}
              createdAt={job.created_at}
              period={job.period}
              isRemote={true}
              title={job.title}
              owner={job.user?.username}
              isOwner={isOwner && isOwner}
              subtitle={job.description}
            />
          )}
        </Content>
        <Footer />
      </Container>
    </div>
  );
};

export default Overview;
