import * as React from 'react';

import 'rsuite/dist/styles/rsuite-default.css';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from './createGlobalStyles';

import { AuthProvider } from './context/AuthContext';
import { ChakraProvider } from '@chakra-ui/react';

import AppRouter from './navigation';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <GlobalStyles />
        <ChakraProvider>
          <AppRouter />
        </ChakraProvider>
      </AuthProvider>
    </>
  );
};

export default App;
