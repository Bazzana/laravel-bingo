import { useState, useEffect } from 'react';

import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Center, Container, Card, Button, Stack } from "@chakra-ui/react";

function Leaderboard() {
  const [allScores, setAllScores] = useState([]);
  const BASE_SITE_URL = new URL(window.location.href)

  // Mounted
  useEffect(() => {
    getLeaderboard();
  }, [])

  function getLeaderboard() {
    const apiURL = `${BASE_SITE_URL.origin}/api/scores`;

    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setAllScores(data)
      })
      .catch(error => console.error(error, 'something went wrong'));
  }

  return (
    <Container>
      <Center h="100vh">
        <Stack>
        <Card>
          <TableContainer>
            <Table variant='striped'>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Score</Th>
                </Tr>
              </Thead>
              <Tbody>
                {allScores.map((score, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{score.name}</Td>
                      <Td>{score.score}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Card>
        <a href="/"><Button w="100%">Play Bingo!</Button></a>

        </Stack>
      </Center>
    </Container>
  );

}
export default Leaderboard;