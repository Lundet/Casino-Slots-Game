import React from 'react';
import '../styles/BalanceDisplay.css'; // Adjust the path as necessary

const BalanceDisplay = ({ balance, bet, setBet }) => {
  return (
    <div className="balance-display">
      <div className="balance">
        <span>💰 Balance: ${balance}</span>
      </div>
      <div className="bet-controls">
        <button
          className="bet-btn"
          onClick={() => setBet(prevBet => Math.max(1, prevBet - 1))}
        >
          -
        </button>
        <span>Bet: ${bet}</span>
        <button className="bet-btn" onClick={() => setBet(prevBet => prevBet + 1)}>
          +
        </button>
      </div>
    </div>
  );
};

export default BalanceDisplay;
