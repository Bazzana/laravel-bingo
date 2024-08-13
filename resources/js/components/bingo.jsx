import { useState, useEffect } from 'react';
import { Box, Container, Text, VStack, Input, InputGroup, InputRightElement, Center, Button } from "@chakra-ui/react";
import BingoCard from './bingoCard';
import ShareButton from './ShareButton';

function Bingo() {
  const [name, setName] = useState('');
  const [gameInProgress, setGameInProgress] = useState(false);
  const [shareURL, setShareURL] = useState('');
  const [initialBoardState, setinItialBoardState] = useState([]);
  const [initialMarkedNumbers, setinItialMarkedNumbers] = useState([]);

  // componentDidMount alternative for functional component
  useEffect(() => {
    const url = new URL(window.location.href);
    if(url.searchParams.get("boardState") && url.searchParams.get("markedNumbers")){
      setGameInProgress(true);
      setinItialBoardState(url.searchParams.get("boardState").split(","))
      setinItialMarkedNumbers(url.searchParams.get("markedNumbers").split(","))
    }
    else if (localStorage.getItem("boardState") && localStorage.getItem("markedNumbers") && localStorage.getItem("name")) {
      setGameInProgress(true);
      setinItialBoardState(localStorage.getItem("boardState").split(","))
      setinItialMarkedNumbers(localStorage.getItem("markedNumbers").split(","))
      setName(localStorage.getItem("name"))
    }
  }, []);

  function startGameClick() {
    localStorage.setItem("name", name)
    setGameInProgress(true)
  }

  const handleShareURL = (URL) => {
    setShareURL(URL)
  }

  return (
    <div className="Bingo">
      <Container>
        <Center h="100vh">
          <VStack>
            <InputGroup size='lg'>
              <Input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder='Enter your name'
                isDisabled={gameInProgress}
                w="auto"
              />
              {!gameInProgress ?               
                <InputRightElement width='auto'>
                <Button h='80%' size='sm' mr=".3rem" onClick={startGameClick} isDisabled={ name == '' ? true : false}>
                  Start a game
                </Button>
              </InputRightElement> : ''}
            </InputGroup>
            {gameInProgress ? <BingoCard initialBoardState={initialBoardState} initialMarkedNumbers={initialMarkedNumbers} /> : ''}
            {gameInProgress ? <ShareButton onShareURL={handleShareURL} />: ''}
            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'><Text fontSize='xs'>{shareURL}</Text></Box>

          </VStack>
        </Center>
      </Container>
    </div>
  );
}
export default Bingo;