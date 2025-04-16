import React from 'react';
import '../styles/BalanceDisplay.css'; // Adjust the path as necessary

const BalanceDisplay = ({ balance, bet, setBet, betSizes }) => {
  const currentBetIndex = betSizes.indexOf(bet);

  const decreaseBet = () => {
    if (currentBetIndex > 0) {
      setBet(betSizes[currentBetIndex - 1]);
    }
  };

  const increaseBet = () => {
    if (currentBetIndex < betSizes.length - 1) {
      setBet(betSizes[currentBetIndex + 1]);
    }
  };

  return (
    <div className="balance-display">
      <div className="balance">
        <span>💰 Balance: ${balance.toFixed(2)}</span>
      </div>
      <div className="bet-controls">
        <button
          className="bet-btn"
          onClick={decreaseBet}
          disabled={currentBetIndex === 0}
        >
          -
        </button>
        <span>Bet: ${bet.toFixed(2)}</span>
        <button
          className="bet-btn"
          onClick={increaseBet}
          disabled={currentBetIndex === betSizes.length - 1}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default BalanceDisplay;