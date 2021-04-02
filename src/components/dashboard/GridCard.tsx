import React from 'react';
import { SimpleGrid, Box } from '@chakra-ui/react';
import JobCard from '../JobCard';

interface IProps {
  cardData: string; // Alterar para objeto futuramente!
}

const GridCard: React.FC<IProps> = (props) => {
  let cardAmount = 5;
  let mockArr: Array<number> = [];
  for (let i = 1; i <= cardAmount; i++) {
    mockArr.push(i);
  }

  return (
    <SimpleGrid columns={[2, null, 3]} spacing='50px' marginInline={5}>
      {mockArr.map((card) => (
        <JobCard
          title='Desenvolvedor de Software em Cuiabá'
          description='Vaga para Dev. FullStack em xxx'
          period='Tempo integral'
          createdAt='01/01/2000'
          owner='Ártico Tecnologia'
          location='Cuiabá - MT'
        />
      ))}
    </SimpleGrid>
  );
};

export default GridCard;
