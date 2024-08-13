import { useState } from 'react';
import { Container, VStack, Input, InputGroup, InputRightElement, Center, Button } from "@chakra-ui/react";
import BingoCard from './bingoCard';

function Bingo() {
  const [name, setName] = useState('');
  const [gameInProgress, setGameInProgress] = useState(false);

  function startGameClick() {
    setGameInProgress(true)
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
            {gameInProgress ? <BingoCard /> : ''}
          </VStack>
        </Center>
      </Container>
    </div>
  );
}
export default Bingo;