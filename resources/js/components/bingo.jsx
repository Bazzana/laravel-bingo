import { useState } from 'react';
import { Container, Input, InputGroup, InputRightElement, SimpleGrid, Center, Button } from "@chakra-ui/react";

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
          <InputGroup size='md'>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='Enter your name'
              isDisabled={gameInProgress}
            />
            <InputRightElement width='auto'>
              <Button h='80%' size='sm' mr=".3rem" onClick={startGameClick} isDisabled={ name == '' ? true : false}>
                Start a game
              </Button>
            </InputRightElement>
          </InputGroup>
        </Center>
      </Container>
    </div>
  );
}
export default Bingo;