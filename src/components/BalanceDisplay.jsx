import React from 'react';
import '../styles/BalanceDisplay.css'; // Adjust the path as necessary
const BalanceDisplay = ({ balance, bet, setBet }) => {
  return (
    <div className="balance-display">
      <div className="balance">
        <span>💰 Balance: ${balance}</span>
      </div>
      <div className="bet-controls">
        <button onClick={() => setBet(bet => Math.max(1, bet - 1))}>-</button>
        <span>Bet: ${bet}</span>
        <button onClick={() => setBet(bet => bet + 1)}>+</button>
      </div>
    </div>
  );
};

export default BalanceDisplay;
