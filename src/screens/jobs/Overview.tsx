import React, { useState, useEffect } from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import api from '../../services/api';
import { Container, Header, Content, Footer, Message } from 'rsuite';
import { PALETTES } from '../../theme';
import { IJob } from '../../types';
import { useParams } from 'react-router-dom';

import Navbar from '../../components/dashboard/Navbar';
import Jobotron from '../../components/overview/Jobotron';

type IOverviewProps = {
  title: string;
};

const Overview: React.FC<IOverviewProps> = ({ title }) => {
  let { jobId } = useParams<any>();
  const [job, setJob] = useState<IJob>();

  async function getJob() {
    await api
      .get('/jobs/' + jobId)
      .then((response) => {
        setJob(response.data);
        if (job) {
          window.document.title = `${jobId} - ${job?.title} | Job Finder`;
        }
      })
      .catch((error) => {
        alert('Houve um erro ao carregar a vaga');
      });
  }

  useEffect(() => {
    getJob();
  }, []);

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
              owner='Ártico Tecnologia'
              subtitle={job.description}
              status={true}
            />
          )}
        </Content>
        <Footer>
          <p>Footer</p>
        </Footer>
      </Container>
    </div>
  );
};

export default Overview;
