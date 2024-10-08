import { useState, useEffect } from 'react';
import {  ButtonGroup, Button, SimpleGrid } from "@chakra-ui/react";

function BingoCard({initialBoardState, initialMarkedNumbers, currentNumber, onReset, name, score}) {
  // Hardcoded bad
  const [boardState, setBoardState] = useState(['','','','','','','','','','','','','Free','','','','','','','','','','','','']);
  const [markedNumbers, setMarkedNumbers] = useState([]);
  const [gameInProgress, setgameInProgress] = useState(false);

  const BASE_SITE_URL = new URL(window.location.href)

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
    // Check the contents of markedNumbers and post score if complete
    const completeness = markedNumbers.filter( num => num !== undefined && num !== '');

    if (completeness.length == 25) {
      postScore();
    }

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
    onReset();
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

      // Pass current number to parent for validation
      const apiURL = `${BASE_SITE_URL.origin}/api/markNumber`;
      fetch(apiURL, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ marked: number, current: currentNumber }),
      })
      .then(response => response.json())
      .then(data => {
        if(data.validation_error)  {
          return 
        }
        setMarkedNumbers(prev => {
          const newMarkedNumbers = [...prev];
          newMarkedNumbers[index] = number;
          return newMarkedNumbers;
        })
      })
      .catch(error => console.error(error, 'something went wrong'));
  }

  function postScore() {
    const apiURL = `${BASE_SITE_URL.origin}/api/scores`;
    fetch(apiURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, score }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error(error, 'something went wrong'));
  }

  return (
    <div className="BingoCard">
      <ButtonGroup>
        <SimpleGrid columns={5} gap="0">
        {boardState.map((number, index) => {
          return <Button 
          key={index}
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