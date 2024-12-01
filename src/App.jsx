import { useState } from "react";

import Player from "./component/player"
import GameBoard from "./component/GameBoard"; import Log from "./component/Log";
import { WINNING_COMBINATIONS } from "./Winning-combinations";
import GameOver from "./component/GameOver";

const intGameBoard=[
    [null,null,null],
    [null,null,null],
    [null,null,null],
];

function deriveGameBoard(gameTurns)
{
  let gameBoard=[...intGameBoard.map(array=>[...array])];

  for (const turn of gameTurns)
  {
      const {square,player} = turn;
      const {row,col} = square;
      gameBoard[row][col]= player;

  }
  return gameBoard;
}

function driveActivePlayer(prevTurns)
{
  let currentPlayer='X';
      
  if(prevTurns.length>0 && prevTurns[0].player==='X')
    currentPlayer='O';

  return currentPlayer;
}

function deriveWinner(gameBoard,players)
{
    let winner;

    for(const combination of WINNING_COMBINATIONS)
    {
      const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];
      
      if(firstSquareSymbol &&
        firstSquareSymbol===secondSquareSymbol &&
        firstSquareSymbol===thirdSquareSymbol)
        {
          winner=players[firstSquareSymbol];
        }
  }
  return winner;    
}

function App() {
  
  const [players,setPlayers]=useState([{X:'Player 1'},{O:'Player 2'}]);
  const[gameTurns,setGameTurns]=useState([]);
  // const[activePlayer,setActivePlayer]=useState('X');

  const activePlayer=driveActivePlayer(gameTurns);
  

  const gameBoard=deriveGameBoard(gameTurns);

  const winner=deriveWinner(gameBoard,players);
   
  const hasDraw= gameTurns.length===9 && !winner;

  function handelSelectedSquare(rowIndex,colIndex)
  {
    // setActivePlayer((curActivePlayer)=>curActivePlayer==='X'?'O':'X');
    setGameTurns((prevTurns)=>{
     
      const currentPlayer=driveActivePlayer(prevTurns);

      const updatedTurns=[{square:{ row: rowIndex, col: colIndex}, player: currentPlayer}
        ,...prevTurns];
        return updatedTurns;
    });
  }

  function handleRematch()
  {
    setGameTurns([]);
  }
  
  function handleNamePlayerChange(symbol,newName)
  {
    setPlayers(prevPlayers=>{
      return {
        ...prevPlayers,
        [symbol]:newName
      };
    })
  }
  return <main>
    <div id="game-container">
     <ol id="players" className="highlight-player">
     <Player intName="player 1" symbol="X"
      isActive={activePlayer==='X'}
      onChangeName={handleNamePlayerChange}></Player>
     <Player intName="player 2" symbol="O" 
     isActive={activePlayer==='O'}
     onChangeName={handleNamePlayerChange}></Player>
     </ol>
     {(winner|| hasDraw ) && <GameOver winner={winner} onRestart={handleRematch}/>}
     <GameBoard onSelectedSquare={handelSelectedSquare} board={gameBoard}/>
    </div>
   <Log turns={gameTurns}/>
  </main>
}

export default App;
