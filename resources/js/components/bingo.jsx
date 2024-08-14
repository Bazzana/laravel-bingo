import { useState, useEffect } from 'react';
import { Box, Container, Text, VStack, Input, InputGroup, InputRightElement, Center, Button, Stack } from "@chakra-ui/react";
import BingoCard from './bingoCard';
import ShareButton from './shareButton';

function Bingo() {
  const [name, setName] = useState('');
  const [gameInProgress, setGameInProgress] = useState(false);
  const [shareURL, setShareURL] = useState('');
  const [initialBoardState, setinItialBoardState] = useState([]);
  const [initialMarkedNumbers, setinItialMarkedNumbers] = useState([]);
  const [previousNumbers, setPreviousNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [totalNumbersGenerated, setTotalNumbersGenerated] = useState(0);

  const BASE_SITE_URL = new URL(window.location.href)

  // componentDidMount alternative for functional component
  useEffect(() => {
    const url = new URL(window.location.href);
    if(url.searchParams.get("boardState") && url.searchParams.get("markedNumbers") && url.searchParams.get("name")){
      setGameInProgress(true);
      setinItialBoardState(url.searchParams.get("boardState").split(","))
      setinItialMarkedNumbers(url.searchParams.get("markedNumbers").split(","))
      setName(url.searchParams.get("name"))
    }
    else if (localStorage.getItem("boardState") && localStorage.getItem("markedNumbers") && localStorage.getItem("name")) {
      setGameInProgress(true);
      setinItialBoardState(localStorage.getItem("boardState").split(","))
      setinItialMarkedNumbers(localStorage.getItem("markedNumbers").split(","))
      setName(localStorage.getItem("name"))
    }
  }, []);

  useEffect(() => {
    setPreviousNumbers(previous => [...previous, currentNumber])
  }, [currentNumber]);

  const startGameClick = () => {
    localStorage.setItem("name", name)
    const url = new URL(window.location.href);
    url.searchParams.set("name", name.toString());
    window.history.pushState(null, '', url.toString());
    setGameInProgress(true)
  }

  const handleShareURL = (URL) => {
    setShareURL(URL)
  }

  // Ideally shouldn't mutate the state directly here
  const resetTotalNumbersGenerated = () => {
    setTotalNumbersGenerated(0);
    setPreviousNumbers([]);
    setCurrentNumber(0);
  }


  const getNewNumber = () => {
    setTotalNumbersGenerated(prevTotal => prevTotal + 1);
    let numbersQuery = 0;
    if(previousNumbers && previousNumbers.length > 0) {
      numbersQuery = previousNumbers.join(",");
    }
    const apiURL = `${BASE_SITE_URL.origin}/api/getNumber?numbers=${numbersQuery}`;

    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      if(data !== 0)  {
        setCurrentNumber(data)
      }
      else {
        console.error(error, 'Bingo numbers exhausted')
      }
    })
    .catch(error => console.error(error, 'something went wrong'));
  }

  return (
    <div className="Bingo">
      <Container>
        <Center h="100vh">
          <VStack>
          {gameInProgress && currentNumber !== 0 ? <Text>The next number is: {currentNumber}</Text> : '' }
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
            {gameInProgress ? <BingoCard initialBoardState={initialBoardState} initialMarkedNumbers={initialMarkedNumbers} currentNumber={currentNumber} onReset={resetTotalNumbersGenerated}/> : ''}
            <Stack direction='row' spacing={4} mt={10}>
              {gameInProgress ? <Button onClick={getNewNumber}>Get a number</Button>: ''}
              {gameInProgress ? <ShareButton onShareURL={handleShareURL} />: ''}
            </Stack>
            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'><Text fontSize='xs'>{shareURL}</Text></Box>
            {currentNumber}
          </VStack>
        </Center>
      </Container>
    </div>
  );
}
export default Bingo;