import { useState, useEffect } from 'react';

import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Center, Container, Card } from "@chakra-ui/react";

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
        <Card>
          <TableContainer>
            <Table variant='simple'>
              <TableCaption>Bingo Leaderboard</TableCaption>
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
      </Center>
    </Container>
  );

}
export default Leaderboard;