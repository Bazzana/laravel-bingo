import { useState, useEffect } from 'react';
import {  ButtonGroup, Button, SimpleGrid } from "@chakra-ui/react";

function BingoCard({initialBoardState, initialMarkedNumbers}) {
  // Hardcoded bad
  const [boardState, setBoardState] = useState(['','','','','','','','','','','','','Free','','','','','','','','','','','','']);
  const [markedNumbers, setMarkedNumbers] = useState([]);
  const [gameInProgress, setgameInProgress] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    if(initialBoardState.length > 0 && initialMarkedNumbers.length > 0){
      setBoardState(initialBoardState)
      setMarkedNumbers(initialMarkedNumbers)
      setgameInProgress(true)
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("boardState", boardState.toString());
    window.history.pushState(null, '', url.toString());
    localStorage.setItem("boardState", boardState.toString())
  }, [boardState]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("markedNumbers", markedNumbers.toString());
    window.history.pushState(null, '', url.toString());
    localStorage.setItem("markedNumbers", markedNumbers.toString())
  }, [markedNumbers]);

  // Conditionally warn the user that progress will be lost when clicking generate a card
  function maybeGenerateNewCard() {
    if (gameInProgress) {
      if (window.confirm("Any progress made so far will be lost. Are you sure?")) {
        generateNewCard();
      }
    } else {
      generateNewCard();
    }
  }

  // Generate a card by by instantiating an array, map over & filling 0-100 at the loop index 
  function generateNewCard() {
    setgameInProgress(true)
    let numbers = Array(100).fill().map((num, index) => index + 1);
    // Randomise our array contents
    numbers.sort(() => Math.random() - 0.5);
    // Ensure our free value is in the centre of the board
    numbers[12] = 'Free'
    setBoardState(numbers.slice(0,25))
    setMarkedNumbers([])
  }

  // Mark a number off our game board
  function markNumber(index,number) {
    setMarkedNumbers(prev => {
      const newMarkedNumbers = [...prev];
      newMarkedNumbers[index] = number;
      return newMarkedNumbers;
    });
  }

  return (
    <div className="BingoCard">
      <ButtonGroup>
        <SimpleGrid columns={5} gap="0">
        {boardState.map((number, index) => {
          return <Button 
          variant={markedNumbers[index] ? "solid" : "outline"}
          size="lg" 
          borderRadius='0' 
          onClick={() => markNumber(index,number)} 
          isDisabled={markedNumbers[index] ? true : false}>
       {number}
      </Button>
      })}
      </SimpleGrid>
      </ButtonGroup>
      <Button mt="2rem" onClick={maybeGenerateNewCard}>
        { gameInProgress == false ? 'Generate a bingo card' : 'Generate a new bingo card' }
      </Button>
    </div>
  );
}
export default BingoCard;