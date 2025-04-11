import React, { useState } from 'react';
import '../styles/symbolsInfo.css';

import { symbolPayouts, symbolProbabilities } from './symbols';

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

const symbolGroups = {
  bad: [
    { key: 'silvercoin', img: coinImg, name: 'Coin', desc: 'Low-tier' },
    { key: 'shield', img: shieldImg, name: 'Shield', desc: 'Low-tier' },
    { key: 'arrow', img: arrowImg, name: 'Arrow', desc: 'Low-tier' },
    { key: 'wall', img: wallImg, name: 'Wall', desc: 'Low-tier' },
  ],
  medium: [
    { key: 'spearman', img: spearmanImg, name: 'Spearman', desc: 'Fighter' },
    { key: 'archer', img: archerImg, name: 'Archer', desc: 'Fighter' },
    { key: 'knight', img: knightImg, name: 'Knight', desc: 'Fighter' },
    { key: 'mage', img: mageImg, name: 'Mage', desc: 'Fighter' },
  ],
  special: [
    { key: 'dragon', img: dragonImg, name: 'Dragon', desc: 'High-tier (Special)' },
    { key: 'king', img: kingImg, name: 'King', desc: 'High-tier (Special)' },
    { key: 'wild', img: crystalBallImg, name: 'Crystal Ball', desc: 'Wild - Replaces any symbol' },
    { key: 'bonus', img: treasureChestImg, name: 'Treasure Chest', desc: 'Bonus - Triggers rewards' },
  ],
};

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
                {symbolGroups.bad.map(sym => (
                  <SymbolCard
                    key={sym.key}
                    img={sym.img}
                    name={sym.name}
                    desc={sym.desc}
                    payouts={symbolPayouts[sym.key]}
                  />
                ))}
              </div>
            </div>

            <div className="symbol-section">
              <h3>🟡 Medium Tier</h3>
              <div className="symbol-group">
                {symbolGroups.medium.map(sym => (
                  <SymbolCard
                    key={sym.key}
                    img={sym.img}
                    name={sym.name}
                    desc={sym.desc}
                    payouts={symbolPayouts[sym.key]}
                  />
                ))}
              </div>
            </div>

            <div className="symbol-section">
              <h3>🟣 Special Tier</h3>
              <div className="symbol-group">
                {symbolGroups.special.map(sym => (
                  <SymbolCard
                    key={sym.key}
                    img={sym.img}
                    name={sym.name}
                    desc={sym.desc}
                    payouts={symbolPayouts[sym.key]}
                  />
                ))}
              </div>
            </div>

            <button className="symbols-close" onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

const SymbolCard = ({ img, name, desc, payouts }) => (
  <div className="symbol-card">
    <img src={img} alt={name} />
    <h4>{name}</h4>
    <p>{desc}</p>

    {payouts && (
      <div className="payout-lines">
        <h5>Payout</h5>
        {payouts.map((value, index) => {
          const matchCount = index ; // matchCount corresponds to 1, 2, 3, etc.
          if (matchCount >= 2 && value > 0) {
            return (
              <div
                key={matchCount}
                className="symbol-line"
                style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
              >
                <div className="symbol-images" style={{ display: 'flex', marginRight: '8px' }}>
                  {Array(matchCount).fill().map((_, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={name}
                      style={{ width: '20px', height: '20px', marginRight: '2px' }}
                    />
                  ))}
                </div>
                <span>x{value}</span>
              </div>
            );
          }
          return null;
        })}
      </div>
    )}
  </div>
);

export default SymbolsInfo;
