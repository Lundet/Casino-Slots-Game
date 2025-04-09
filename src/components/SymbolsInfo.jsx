import React, { useState } from 'react';
import '../styles/symbolsInfo.css';

// Import images
import coinImg from '../assets/images/silvercoin.jpg';
import shieldImg from '../assets/images/shield.jpg';
import arrowImg from '../assets/images/arrow.jpg';
import wallImg from '../assets/images/wall.jpg';
import spearmanImg from '../assets/images/spearman.jpg';
import archerImg from '../assets/images/archer.jpg';
import knightImg from '../assets/images/knight.jpg';
import mageImg from '../assets/images/mage.jpg';
import dragonImg from '../assets/images/dragon.jpg';
import kingImg from '../assets/images/king.jpg';
import crystalBallImg from '../assets/images/wild.jpg';
import treasureChestImg from '../assets/images/bonus.jpg';

const SymbolsInfo = () => {
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <>
      <button className="symbols-button" onClick={togglePopup}>
        {showPopup ? 'Hide Symbols Info' : 'Show Symbols Info'}
      </button>

      {showPopup && (
        <div className="symbols-popup">
          <div className="symbols-popup-content">
            <h2>🧠 Symbol Info</h2>

            <div className="symbol-section">
              <h3>🔴 Bad Tier</h3>
              <div className="symbol-group">
                <SymbolCard img={coinImg} name="Coin" desc="Low-tier" value="+2 coins" />
                <SymbolCard img={shieldImg} name="Shield" desc="Low-tier" value="+3 coins" />
                <SymbolCard img={arrowImg} name="Arrow" desc="Low-tier" value="+2 coins" />
                <SymbolCard img={wallImg} name="Wall" desc="Low-tier" value="+4 coins" />
              </div>
            </div>

            <div className="symbol-section">
              <h3>🟡 Medium Tier</h3>
              <div className="symbol-group">
                <SymbolCard img={spearmanImg} name="Spearman" desc="Fighter" value="+6 coins" />
                <SymbolCard img={archerImg} name="Archer" desc="Fighter" value="+6 coins" />
                <SymbolCard img={knightImg} name="Knight" desc="Fighter" value="+7 coins" />
                <SymbolCard img={mageImg} name="Mage" desc="Fighter" value="+7 coins" />
              </div>
            </div>

            <div className="symbol-section">
              <h3>🟣 Special Tier</h3>
              <div className="symbol-group">
                <SymbolCard img={dragonImg} name="Dragon" desc="High-tier (Special)" value="+12 coins" />
                <SymbolCard img={kingImg} name="King" desc="High-tier (Special)" value="+15 coins" />
                <SymbolCard img={crystalBallImg} name="Crystal Ball" desc="Wild - Replaces any symbol" />
                <SymbolCard img={treasureChestImg} name="Treasure Chest" desc="Bonus - Triggers rewards" />
              </div>
            </div>

            <button className="symbols-close" onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

const SymbolCard = ({ img, name, desc, value }) => (
  <div className="symbol-card">
    <img src={img} alt={name} />
    <h4>{name}</h4>
    <p>{desc}</p>
    {value && <p className="price">{value}</p>}
  </div>
);

export default SymbolsInfo;
