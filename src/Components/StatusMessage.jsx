const StatusMessage = ({ winner, gamingBoard }) => {
  const { squares, isXNext } = gamingBoard;

  // every() method returns true or false result for the condition , applied to the whole array
  const noMovesLeft = squares.every(squareValue => squareValue !== null);
  // Computed/derived value : here we didnt use a new state because , every time when the state is updated , the component will be re-rendered , and the isXNext  state variable will also be changed and it will be up-to-date and the next line will use the updated isXNext to find the next player
  const nextPlayer = isXNext ? 'X' : 'O';

  const renderStatusMessage = () => {
    if (winner) {
      return (
        <>
          Winner is{' '}
          <span className={winner === 'X' ? 'text-green' : 'text-pink'}>
            {winner}
          </span>
        </>
      );
    }

    if (!winner && noMovesLeft) {
      return (
        <>
          <span className="text-pink">O</span> and{' '}
          <span className="text-green">X</span> tied
        </>
      );
    }

    if (!winner && !noMovesLeft) {
      return (
        <>
          Next Player is{' '}
          <span className={isXNext ? 'text-green' : 'text-pink'}>
            {nextPlayer}
          </span>
        </>
      );
    }

    return null;
  };

  return <h2 className="status-message">{renderStatusMessage()}</h2>;
};

export default StatusMessage;
