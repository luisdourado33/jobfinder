import React from 'react';
import styled from 'styled-components';
import { Button, Badge, Flex, Avatar, Box, Text } from '@chakra-ui/react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { PALETTES } from '../theme';
import { formatDate, dateNow } from '../helpers';

interface IProps {
  id?: number;
  title?: string;
  description?: string;
  period?: string;
  createdAt?: Date | string;
  owner?: string;
  location?: string;
}

const Card = styled.div`
  border-radius: 5px;
  padding: 15px;
  border-color: #eee;
  border-width: 1.5px;
  background-color: #fff;
  transition: background-color 0.5s;
  align-items: flex-start;
  align-content: flex-start;
  box-shadow: 1px 4px 4px #eee;
  justify-content: flex-start;
  flex-direction: column;

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
  let createdAt = formatDate(new Date(`${props.createdAt}`), 'full');

  console.log({
    createdAt,
    dateNow: dateNow('fullString'),
  });

  function checkIfIsNew() {
    let jobDate = formatDate(new Date(`${props.createdAt}`), 'short');

    if (jobDate === dateNow('short')) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Card onClick={() => (window.location.href = `jobs/overview/${props.id}`)}>
      <CardHeader>
        <Flex mb={2}>
          <Avatar bg={PALETTES.dark} />
          <Box
            flexDirection='column'
            justifyItems='flex-start'
            justifyContent='initial'
            display='flex'
            ml={5}>
            <Text alignSelf='flex-start' fontWeight='bold'>
              {props.owner}
            </Text>
            {checkIfIsNew() ? (
              <Badge colorScheme='green'>Novo</Badge>
            ) : (
              <Badge colorScheme='cyan'>Aberto</Badge>
            )}
          </Box>
        </Flex>
        <Text fontSize='sm'>
          <b>Cadastrada em:</b> {createdAt}
        </Text>
      </CardHeader>
      <CardContent>
        <h1>{props.title}</h1>
        <Badge variant='outline' colorScheme='green'>
          {props.period}
        </Badge>
        <Text fontSize='xsm'>{props.description}</Text>
      </CardContent>
      <CardFooter style={{ alignSelf: 'flex-end', flex: '1' }}>
        <div>
          <Button
            leftIcon={<FaMapMarkerAlt />}
            colorScheme='green'
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
