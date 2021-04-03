import React, { useState, useEffect } from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import { Container, Header, Content, Footer, Message } from 'rsuite';
import { PALETTES } from '../../theme';
import { useParams } from 'react-router-dom';

import Navbar from '../../components/dashboard/Navbar';
import Jobotron from '../../components/overview/Jobotron';

type IOverviewProps = {
  title: string;
};

const Overview: React.FC<IOverviewProps> = ({ title }) => {
  let { jobId } = useParams<any>();

  useEffect(() => {
    window.document.title = `Vaga #${jobId} | Job Finder`;
  }, []);

  return (
    <div className='show-container'>
      <Container>
        <Header>
          <Navbar />
        </Header>
        <Content>
          <Jobotron
            jobId={jobId}
            location={'Cuiabá, MT'}
            createdAt={'03 de abril de 2021'}
            period={'Tempo integral'}
            isRemote={true}
            title='Desenvolvedor FullStack Pleno'
            owner='Ártico Tecnologia'
            subtitle='Pariatur aliqua officia ea nulla dolore id proident. Enim ea minim ipsum irure duis consectetur et elit officia elit elit. Aliquip anim laboris sunt consectetur sunt. Deserunt dolor labore non do est ex ipsum non tempor aliquip nisi aliqua. Nulla culpa minim eu magna sit duis. Quis proident excepteur sint est sint exercitation consequat. Ullamco pariatur cupidatat eu est adipisicing culpa officia nisi. Non tempor amet sunt occaecat ea sit.'
            status={true}
          />
        </Content>
        <Footer>
          <p>Footer</p>
        </Footer>
      </Container>
    </div>
  );
};

export default Overview;
