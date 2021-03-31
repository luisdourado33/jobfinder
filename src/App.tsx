import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import AppRouter from './navigation';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <AppRouter />
    </ChakraProvider>
  );
};

export default App;
