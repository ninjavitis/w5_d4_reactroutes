import React, {useState, useEffect} from 'react';
import {Segment, Table, Icon, Button, Checkbox, Image, Divider, Grid, GridColumn } from 'semantic-ui-react';

const Home = () => {
  const[images, setImages] = useState([
    "https://media.giphy.com/media/xT9Igf2wBfQ8ClCDNC/giphy.gif", 
    "https://media.giphy.com/media/yUrUb9fYz6x7a/giphy.gif", 
    "https://media.giphy.com/media/fk3b5iSLqUhdm/giphy.gif"
  ])
  const[p1Turn, setP1Turn] = useState(true)
  const[p2CPU, setP2CPU] = useState(true)
  const[gamesPlayed, setGamesPlayed] = useState(0)
  const[gamesDrawn, setGamesDrawn] = useState(0)
  const[message, setMessage] = useState("")
  const[player1, setPlayer1] = useState({pick:null, gamesWon:0, winRatio:0})
  const[player2, setPlayer2] = useState({pick:null, gamesWon:0, winRatio:0})
  const[evaluateGame, setEvaluateGame] = useState(false)
  
  

  return(
    <>
      <Table definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell textAlign='center' >Games Played</Table.HeaderCell>
            <Table.HeaderCell textAlign='center' >Games Won</Table.HeaderCell>
            <Table.HeaderCell textAlign='center' >Games Lost</Table.HeaderCell>
            <Table.HeaderCell textAlign='center' >Games Tied</Table.HeaderCell>
            <Table.HeaderCell textAlign='center' >Win Ratio</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell textAlign='center' >Player 1</Table.Cell>
            <Table.Cell textAlign='center' id="p1_gamesPlayed">{gamesPlayed}</Table.Cell>
            <Table.Cell textAlign='center' id="p1_gamesWon">{player1.gamesWon}</Table.Cell>
            <Table.Cell textAlign='center' id="p1_gamesLost">{gamesPlayed - player1.gamesWon}</Table.Cell>
            <Table.Cell textAlign='center' id="p1_gamesDrawn">{gamesDrawn}</Table.Cell>
            <Table.Cell textAlign='center' id="p1_winRatio">{player1.winRatio}%</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell textAlign='center'>Player 2</Table.Cell>
            <Table.Cell textAlign='center' id="p2_gamesPlayed">{gamesPlayed}</Table.Cell>
            <Table.Cell textAlign='center' id="p1_gamesWon">{player2.gamesWon}</Table.Cell>
            <Table.Cell textAlign='center'>{gamesPlayed - player2.gamesWon}</Table.Cell>
            <Table.Cell textAlign='center'>{gamesDrawn}</Table.Cell>
            <Table.Cell textAlign='center'>{player2.winRatio}%</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Segment>
        <Grid columns={2} relaxed="very">
          <GridColumn>
            <Image src={images[player1.pick]} size='small' centered/>
          </GridColumn>
          <GridColumn>
            <Image src={images[player2.pick]} size='small' centered/>
          </GridColumn>
        </Grid>
        <Divider vertical>VS</Divider>
      </Segment>
      <Segment textAlign='center'>{message}</Segment>
      <Segment textAlign='center'>
        1 Player
        <Checkbox toggle onClick={()=>toggleCPU}/>
        2 Players
        <Button.Group>
          <Button onClick={() => getPick(0)}><Icon className="hand rock"/>Rock</Button>
          <Button onClick={() => getPick(1)}><Icon className="hand paper"/>Paper</Button>
          <Button onClick={() => getPick(2)}><Icon className="hand scissors"/>Scissors</Button> 
        </Button.Group>
      </Segment>
    </>
  )

  //FUNCTION BLOCK   
  function getPick(pick){
    if (p1Turn){
      if (p2CPU){
        setP1Turn(!p1Turn)
        setPlayer1({...player1, pick: pick})
        setPlayer2({...player2, pick: Math.floor(Math.random()*Math.floor(3))})
        setEvaluateGame(true)
      } else {
        setP1Turn(!p1Turn)
        setPlayer1({...player1, pick: pick})
      }
    } else {
      setPlayer2({...player2, pick: pick})
      setEvaluateGame(true)
    }
  }

  useEffect(() => {
      let p1_GamesWon = player1.gamesWon
      let p2_GamesWon = player2.gamesWon
      let tempGamesDrawn = gamesDrawn
      let winMessage = ""
  
      if (player1.pick === 0 && player2.pick === 1){
        // p1 loses
        p2_GamesWon++;
        winMessage = "Player 2 Wins!"
      } else if (player1.pick === 0 && player2.pick === 2){
        // p1 wins
        p1_GamesWon++;
        winMessage = "Player 1 Wins!"
      } else if (player1.pick === 1 && player2.pick === 0){
        // p1 wins
        p1_GamesWon++;
        winMessage = "Player 1 Wins!"
      } else if (player1.pick === 1 && player2.pick === 2){
        // p1 loses
        p2_GamesWon++;
        winMessage = "Player 2 Wins!"
      } else if (player1.pick === 2 && player2.pick === 0){
        // p1 loses
        p2_GamesWon++;
        winMessage = "Player 2 Wins!"
      }else if (player1.pick === 2 && player2.pick === 1){
        // p1 wins
        p1_GamesWon++;
        winMessage = "Player 1 Wins!"
      } else {
        // draw
        tempGamesDrawn++;
        winMessage = "Draw!"
      }
  
      let tempGamesPlayed = gamesPlayed +1
      let p1_WinRatio = ((p1_GamesWon / gamesPlayed) * 100).toFixed(1);
      let p2_WinRatio = ((p2_GamesWon / gamesPlayed) * 100).toFixed(1);
      
      setGamesPlayed(tempGamesPlayed)
      setGamesDrawn(tempGamesDrawn)
      setP1Turn(true)
      setMessage(winMessage)
      setPlayer1({...player1, p1_GamesWon, p1_WinRatio})
      setPlayer2({...player2, p2_GamesWon, p2_WinRatio})
      setEvaluateGame(false)
  }, [evaluateGame])
  
  function gameLoop(){
    
  }
  function toggleCPU(){setP2CPU(!p2CPU)}

}
export default Home