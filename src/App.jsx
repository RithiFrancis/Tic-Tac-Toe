import { useState } from 'react';
import Board from './Components/Board';
import './style.scss';
// here calculateWinner function is exported from winner.js file , so it is imported using {}
import { calculateWinner } from './winner';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(false);

  // here we didnt use a new state because , every time when the state is updated , the component will be re-rendered , and the isXNext  state variable will also be changed and it will be up-to-date and the next line will use the updated isXNext to find the next player
  const winner = calculateWinner(squares);
  const nextPlayer = isXNext ? 'X' : 'O';

  const statusMessage = winner
    ? `Winner is ${winner}`
    : `Next player is ${nextPlayer}`;

  const handleSquareClick = clickedPosition => {
    // the values on the squares may either be 'null' or 'X' or 'O' , null is like false and 'X' or 'O' is like true
    if (squares[clickedPosition] || winner) {
      return;
    }

    setSquares(currentSquares => {
      return currentSquares.map((squareValue, position) => {
        if (clickedPosition === position) {
          return isXNext ? 'X' : 'O';
        }
        return squareValue;
      });
    });

    setIsXNext(currentIsXNext => !currentIsXNext);
  };

  return (
    <div className="app">
      <h2>{statusMessage}</h2>
      <Board squares={squares} handleSquareClick={handleSquareClick} />
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
