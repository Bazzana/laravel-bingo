import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client';
import Bingo from './components/bingo';

document.addEventListener('DOMContentLoaded', function () {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <ChakraProvider>
      <Bingo />
    </ChakraProvider>
  );
});
