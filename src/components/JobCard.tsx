import React from 'react';
import styled from 'styled-components';
import { Button, Badge, Flex, Avatar, Box, Text } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { PALETTES } from '../theme';

interface IProps {
  id?: number;
  title?: string;
  description?: string;
  period?: string;
  createdAt?: string;
  owner?: string;
  location?: string;
}

const Card = styled.div`
  border-radius: 5px;
  padding: 15px;
  border-color: transparent;
  border-width: 1px;
  background-color: #fff;
  transition: background-color 0.5s;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  box-shadow: 5px 5px 5px ${PALETTES.dark};
  flex: 1;
  display: flex;

  :hover {
    background-color: #333;
    color: #eee;
  }
`;

const CardHeader = styled.div`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  h1 {
    font-weight: bold;
    display: flex;
    line-height: 20px;
  }
`;

const CardContent = styled.div`
  align-items: flex-start;
  justify-content: flex-start;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-block: 20px;

  h1 {
    font-size: 18px;
    font-weight: bolder;
    max-width: 90%;
    line-height: 22px;
    text-align: left;
    overflow: visible;
    margin-bottom: 15px;
  }

  p {
    margin-top: 15px;
  }
`;

const CardFooter = styled.div`
  width: 100%;
  flex-direction: row;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const JobCard: React.FC<IProps> = (props) => {
  return (
    <Card onClick={() => (window.location.href = `jobs/overview/${props.id}`)}>
      <CardHeader>
        <Flex>
          <Avatar bg={PALETTES.dark} />
          <Box justifyContent='flex-start' flex='auto' ml='2'>
            <Text alignSelf='flex-start' fontWeight='bold'>
              {props.owner}
              <Badge ml='1' colorScheme='green'>
                Novo
              </Badge>
            </Text>
            <Text fontSize='sm'>
              <b>Cadastrada em:</b> {props.createdAt}
            </Text>
          </Box>
        </Flex>
      </CardHeader>
      <CardContent>
        <h1>{props.title}</h1>
        <Text fontSize='xsm'>{props.description}</Text>
        <Badge variant='outline' colorScheme='green'>
          {props.period}
        </Badge>
      </CardContent>
      <CardFooter style={{ alignSelf: 'flex-end', flex: '1' }}>
        <div>
          <Button
            leftIcon={<FaMapMarkerAlt />}
            colorScheme='blackAlpha'
            size='sm'
            variant='outline'>
            {props.location}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
