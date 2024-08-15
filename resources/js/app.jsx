import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client';
import Bingo from './components/bingo';
import Leaderboard from './components/leaderboard';

document.addEventListener('DOMContentLoaded', function () {
  const BASE_SITE_URL = new URL(window.location.href)
  console.log(BASE_SITE_URL.pathname);
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <ChakraProvider>
      {BASE_SITE_URL.pathname == '/leaderboard' ? <Leaderboard /> : <Bingo />}

    </ChakraProvider>
  );
});
