import React, { useState, useRef, useEffect } from 'react';
import '../styles/SlotGame.css';
import SpinButton from './SpinButton';
import BalanceDisplay from './BalanceDisplay';
import { simulateSpins } from './Simulation';
import { getRandomSymbol, isMatchOrWild, checkWin } from './GameLogic';
import { symbolPayouts } from './Symbols';
import { sounds, playSound } from './Sounds';
import Reel from './Reel';

import arrow from '../assets/images/arrow.jpg';
import silvercoin from '../assets/images/silvercoin.jpg';
import wall from '../assets/images/wall.jpg';
import shield from '../assets/images/shield.jpg';
import spearman from '../assets/images/spearman.jpg';
import archer from '../assets/images/archer.jpg';
import bonus from '../assets/images/bonus.jpg';
import wild from '../assets/images/wild.jpg';
import knight from '../assets/images/knight.jpg';
import mage from '../assets/images/mage.jpg';
import dragon from '../assets/images/dragon.jpg';
import king from '../assets/images/king.jpg';

const images = {
    arrow, silvercoin, wall, shield, spearman, archer,
    bonus, wild, knight, mage, dragon, king,
};

const SlotMachine = () => {
    const [reels, setReels] = useState(Array(5).fill().map(getRandomSymbol));
    const [winMessage, setWinMessage] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);
    const [isWin, setIsWin] = useState(false);
    const [balance, setBalance] = useState(100);
    const [bet, setBet] = useState(1);
    const [freeSpins, setFreeSpins] = useState(0);
    const [simulatedRTP, setSimulatedRTP] = useState(null);
    const initialBetRef = useRef(1);
    const [highlightedReels, setHighlightedReels] = useState([]); // State to store highlighted reels

    // Function to set the bet, but only if not in free spins
    const handleSetBet = (newBet) => {
        if (freeSpins === 0) {
            setBet(newBet);
        }
    };

    const spinReels = () => {
        if (balance < bet && freeSpins === 0) return;

        setIsSpinning(true);
        setWinMessage('');
        setIsWin(false);
        playSound(sounds.spin);
        setHighlightedReels([]); // Clear highlighted reels on new spin

        // If free spins are available, do not deduct from the balance
        if (freeSpins > 0) {
            setFreeSpins(prev => prev - 1);
        } else {
            setBalance(prev => Math.max(prev - bet, 0));
        }

        const spinInterval = setInterval(() => {
            setReels(Array(5).fill().map(getRandomSymbol));
        }, 100);

        setTimeout(() => {
            clearInterval(spinInterval);
            const newReels = Array(5).fill().map(getRandomSymbol);
            setReels(newReels);
            const winDetails = checkWin(newReels, bet, setBalance, setWinMessage, setIsWin, setFreeSpins);
            setIsSpinning(false);
            if (winDetails && winDetails.winningReels) {
                setHighlightedReels(winDetails.winningReels); // Highlight winning reels
            }
        }, 3500);

        // Store the initial bet when free spins are triggered
        if (freeSpins === 0) {
            initialBetRef.current = bet;
        }
    };

    const runSimulation = () => {
        const rtp = simulateSpins(1000000);
        setSimulatedRTP(rtp);
    };

    return (
        <div className="slot-machine">
            {winMessage && <div className={`win-message ${isWin ? 'win' : 'lose'}`}>{winMessage}</div>}
            <div className="free-spins-counter">
                {freeSpins > 0 ? <p>Free Spins: {freeSpins}</p> : <p>No Free Spins Left</p>}
            </div>
            <div className="reels">
                {reels.map((symbol, index) => (
                    <Reel
                        key={index}
                        symbol={symbol}
                        isSpinning={isSpinning}
                        image={images[symbol]}
                        highlighted={highlightedReels.includes(index)} // Pass highlighted prop
                    />
                ))}
            </div>

            <div className="controls">
                <SpinButton
                    onClick={spinReels}
                    disabled={isSpinning || (balance < bet && freeSpins === 0)}
                />
                <BalanceDisplay balance={balance} bet={bet} setBet={handleSetBet} isSpinning={isSpinning} />
            </div>

            <button onClick={runSimulation} disabled={isSpinning}>
                Simulate 1,000,000 Spins
            </button>
            {simulatedRTP !== null && (
                <div className="rtp">
                    <p>Simulated RTP (1,000,000 spins): {simulatedRTP.toFixed(2)}%</p>
                </div>
            )}
        </div>
    );
};

export default SlotMachine;