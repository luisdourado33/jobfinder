import React, { useState, useEffect } from 'react';
import { IJob } from '../../types';
import {
  SimpleGrid,
  Box,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';
import JobCard from '../JobCard';

interface IProps {
  cardData: Array<IJob>;
}
<Box padding='6' boxShadow='lg' bg='white'>
  <SkeletonCircle size='10' />
  <SkeletonText mt='4' noOfLines={4} spacing='4' />
</Box>;
const GridCard: React.FC<IProps> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const CardLoader: React.FC = () => {
    return (
      <Box padding='6' boxShadow='lg' bg='white' width={350}>
        <SkeletonCircle size='50' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' />
      </Box>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <SimpleGrid columns={[2, null, 3]} spacing='50px' marginInline={20}>
      {props.cardData.map((job: IJob) =>
        isLoading ? (
          <CardLoader />
        ) : (
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
        )
      )}
    </SimpleGrid>
  );
};

export default GridCard;
