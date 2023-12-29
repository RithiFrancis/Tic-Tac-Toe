import { useState } from 'react';
import Board from './Components/Board';
import './style.scss';
import StatusMessage from './Components/StatusMessage';
import History from './Components/History';
// here calculateWinner function is exported from winner.js file , so it is imported using {}
import { calculateWinner } from './winner';

function App() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), isXNext: false },
  ]);
  const [currentMove, setCurrentMove] = useState(0);

  //derived/computd value(from history and currentMove) , this will give us the above object at line 10
  const gamingBoard = history[currentMove];

  const winner = calculateWinner(gamingBoard.squares);

  const handleSquareClick = clickedPosition => {
    // the values on the squares may either be 'null' or 'X' or 'O' , null is like false and 'X' or 'O' is like true
    if (gamingBoard.squares[clickedPosition] || winner) {
      return;
    }

    setHistory(currentHistory => {
      //+1 is because historyLength is from 1 and currentMove is 0 start(since it is array based) to compensate it , we use +1
      const isTraversing = currentMove + 1 !== currentHistory.length;

      const lastGamingState = isTraversing
        ? currentHistory[currentMove]
        : currentHistory[currentHistory.length - 1];

      const nextSquaresState = lastGamingState.squares.map(
        (squareValue, position) => {
          if (clickedPosition === position) {
            return lastGamingState.isXNext ? 'X' : 'O';
          }
          return squareValue;
        }
      );

      const base = isTraversing
        ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1)
        : currentHistory;

      return base.concat({
        squares: nextSquaresState,
        isXNext: !lastGamingState.isXNext,
      });
    });

    setCurrentMove(move => move + 1);
  };

  const moveTo = move => {
    setCurrentMove(move);
  };

  return (
    <div className="app">
      <StatusMessage winner={winner} gamingBoard={gamingBoard} />
      <Board
        squares={gamingBoard.squares}
        handleSquareClick={handleSquareClick}
      />

      <h2>Current game history</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div>
  );
}

export default App;

// Child components can use parent components from anywhere , but parent components cannot use or access children from its place , to do so there are two ways :
//         1. Use a statement which is to be used in child components inside chid components
//         2. Move a part of the child logic to parent component(App)

//         Eg: " <h2>Next player is somebody</h2> " All logics and states lives inside the board component(it is not available to the outside components or files.)We can pass the data or whatever we want to the children component from board component.We cannot access that state or data from outside board , we have two ways
//                   1.  " <h2>Next player is somebody</h2> " move this to board component(inside board-row).
//                   2.  move part of board component logic to parent component (app component) and pass required information through props.
