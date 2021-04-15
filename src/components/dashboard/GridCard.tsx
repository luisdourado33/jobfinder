import React, { useEffect } from 'react';
import { IJob } from '../../types';
import { SimpleGrid, Box } from '@chakra-ui/react';
import JobCard from '../JobCard';

interface IProps {
  cardData: Array<IJob>;
}

const GridCard: React.FC<IProps> = (props) => {
  useEffect(() => {
    console.log(`Jobs recebidos: ${props.cardData.length}`);
    console.log(props.cardData);
  }, []);

  return (
    <SimpleGrid columns={[2, null, 3]} spacing='50px' marginInline={5}>
      {props.cardData.map((job: IJob) => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          description={job.description}
          period={job.period}
          createdAt={job.created_at}
          owner={job.user?.username}
          location={job.location}
        />
      ))}
    </SimpleGrid>
  );
};

export default GridCard;
