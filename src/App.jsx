import { useState } from "react";
import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import Log from "./Components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./Components/GameOver";

const PLAYERS ={
  X: 'Player 1',
  O: 'Player 2',
};

const intial_Game_Board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentplayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentplayer = "O";
  }
  return currentplayer;
}

function deriveWinner(gameBoard,players){
  let winner;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol =
      gameBoard[combinations[2].row][combinations[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner=players[firstSquareSymbol];
    }
  }
  return winner;
}

function derivedGameBoard(gameTurns){
  let gameBoard = [...intial_Game_Board.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [players,setPlayers]=useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard=derivedGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard,players);
  const hasDraw=gameTurns.length == 9 && !winner;
  

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentplayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentplayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }
  function handlePlayerNamechange(symbol,newName){
    setPlayers((prevPlayers)=>{
      return{
        ...prevPlayers,
        [symbol] : newName,
      }
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            intialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNamechange}
          />
          <Player
            intialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNamechange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <div id="log-box">
        <Log turns={gameTurns} />
      </div>
    </main>
  );
}

export default App;
