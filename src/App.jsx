// src/App.jsx
import React, { useState } from 'react';
import SlotMachine from './components/SlotMachine';
import MusicButton from './components/MusicButton';
import SymbolsInfo from './components/SymbolsInfo';
import './styles/slotgame.css'; // Import your styles here
import BalanceDisplay from './components/BalanceDisplay';

const App = () => {
  // Initialize balance and bet states
  const [balance, setBalance] = useState(100); // Starting balance
  const [bet, setBet] = useState(1); // Starting bet amount

  return (
    <div className="app">
      <h1>Casino Slots Game</h1>

      <SymbolsInfo /> {/* SymbolsInfo component */}
      <MusicButton /> {/* MusicButton placed here */}
      <SlotMachine balance={balance} setBalance={setBalance} bet={bet} /> {/* SlotMachine component */}
    </div>
  );
};

export default App;
