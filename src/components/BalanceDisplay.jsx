import React from 'react';
import '../styles/BalanceDisplay.css'; // Adjust the path as necessary

const BalanceDisplay = ({ balance, bet, setBet, isSpinning }) => {
  const betSizes = [1, 2, 5, 10, 20]; // Predefined bet sizes

  const handleDecreaseBet = () => {
    const currentIndex = betSizes.indexOf(bet);
    if (currentIndex > 0) {
      setBet(betSizes[currentIndex - 1]);
    }
  };

  const handleIncreaseBet = () => {
    const currentIndex = betSizes.indexOf(bet);
    if (currentIndex < betSizes.length - 1) {
      setBet(betSizes[currentIndex + 1]);
    }
  };

  return (
    <div className="balance-display">
      <div className="balance">
        <span>💰 Balance: ${balance}</span>
      </div>
      <div className="bet-controls">
        <button
          className="bet-btn"
          onClick={handleDecreaseBet}
          disabled={isSpinning || bet === betSizes[0]} // Disable if spinning or at minimum bet
        >
          -
        </button>
        <span>Bet: ${bet}</span>
        <button
          className="bet-btn"
          onClick={handleIncreaseBet}
          disabled={isSpinning || bet === betSizes[betSizes.length - 1]} // Disable if spinning or at maximum bet
        >
          +
        </button>
      </div>
    </div>
  );
};

export default BalanceDisplay;