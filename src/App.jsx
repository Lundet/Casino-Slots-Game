// src/App.jsx
import React from 'react';
import SlotMachine from './components/SlotMachine';
import MusicButton from './components/MusicButton';
import SymbolsInfo from './components/SymbolsInfo';
import './styles/slotgame.css'; // Import your styles here

const App = () => {
    return (
        <div className="app">
        <h1>Casino Slots Game</h1>
        <SymbolsInfo /> {/* SymbolsInfo component */}
        <MusicButton /> {/* MusicButton placed here */}
        <SlotMachine /> {/* SlotMachine component */}
      </div>
    );
};

export default App;
