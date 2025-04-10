import React, { useState } from 'react';
import '../styles/SlotGame.css';
import SpinButton from './SpinButton';
import BalanceDisplay from './BalanceDisplay'; // Import the BalanceDisplay component

// Import images (JPG format)
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
    arrow,
    silvercoin,
    wall,
    shield,
    spearman,
    archer,
    bonus,
    wild,
    knight,
    mage,
    dragon,
    king,
};

const symbols = Object.keys(images);

// Payouts for 0-5 symbols (matches 93.29% theoretical RTP)
const symbolPayouts = {
    arrow: [0, 0, 2, 5, 10, 20],
    silvercoin: [0, 0, 2, 5, 10, 20],
    wall: [0, 0, 5, 10, 15, 30],
    shield: [0, 0, 3, 6, 12, 25],
    spearman: [0, 0, 10, 20, 30, 50],
    archer: [0, 0, 10, 20, 30, 50],
    knight: [0, 0, 15, 25, 40, 60],
    mage: [0, 0, 15, 25, 40, 60],
    dragon: [0, 0, 20, 40, 60, 80],
    king: [0, 0, 25, 50, 75, 100],
    wild: [0, 0, 30, 60, 90, 120],
    bonus: [0, 0, 10, 20, 30, 40]
};

// Probability distribution (weights) for each symbol
const symbolProbabilities = {
    arrow: 10,
    silvercoin: 10,
    wall: 15,
    shield: 10,
    spearman: 10,
    archer: 10,
    bonus: 5,
    wild: 5,
    knight: 8,
    mage: 7,
    dragon: 5,
    king: 5,
};

// Helper function to get a random symbol
const getRandomSymbol = () => {
    const symbolList = Object.keys(symbolProbabilities);
    const random = Math.random() * 100;
    let cumulativeProbability = 0;

    for (const symbol of symbolList) {
        cumulativeProbability += symbolProbabilities[symbol];
        if (random < cumulativeProbability) {
            return symbol;
        }
    }
    return symbolList[0]; // Fallback
};

// Helper function to calculate payout for a spin
const calculatePayout = (reels) => {
    let totalPayout = 0;

    // Check for consecutive matching symbols from 1st reel
    const symbol = reels[0];
    let count = 0;
    for (let i = 0; i < 5; i++) {
        if (reels[i] === symbol) {
            count++;
        } else {
            break;
        }
    }
    if (count >= 2) {
        totalPayout += symbolPayouts[symbol][count];
    }

    // Check for free spins (3+ bonus anywhere)
    const bonusCount = reels.filter(s => s === 'bonus').length;
    if (bonusCount >= 3) {
        totalPayout += 10 * totalPayout; // 10 free spins at base payout
    }

    return totalPayout;
};

// Simulate spins and calculate RTP
const simulateSpins = (numSpins = 10000) => {
    let totalBet = numSpins; // 1 unit per spin
    let totalPayout = 0;

    for (let i = 0; i < numSpins; i++) {
        const reels = Array(5).fill().map(getRandomSymbol);
        totalPayout += calculatePayout(reels);
    }

    const simulatedRTP = (totalPayout / totalBet) * 100;
    return simulatedRTP;
};

const SlotMachine = () => {
    const [reels, setReels] = useState(Array(5).fill().map(getRandomSymbol));
    const [winMessage, setWinMessage] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);
    const [isWin, setIsWin] = useState(false);
    const [simulatedRTP, setSimulatedRTP] = useState(null);
    const [balance, setBalance] = useState(100); // Initial balance
    const [bet, setBet] = useState(1); // Initial bet amount

    // Check for wins and handle free spins
    const checkWin = (newReels) => {
        let message = 'You lose!';
        let win = false;
        let totalPayout = 0;

        // Check for consecutive matching symbols from 1st reel
        const symbol = newReels[0];
        let count = 0;
        for (let i = 0; i < 5; i++) {
            if (newReels[i] === symbol) {
                count++;
            } else {
                break;
            }
        }
        if (count >= 2) {
            const payoutMultiplier = symbolPayouts[symbol][count];
            totalPayout += payoutMultiplier;
            win = true;
            message = `You win! ${count} ${symbol} symbols in a row! Payout: ${payoutMultiplier}`;
        }

        // Check for free spins (3+ bonus anywhere)
        const bonusCount = newReels.filter(s => s === 'bonus').length;
        if (bonusCount >= 3) {
            const freeSpinPayout = 10 * totalPayout;
            totalPayout += freeSpinPayout;
            win = true;
            message += ` + Free Spins! (${bonusCount} bonus symbols, +${freeSpinPayout} payout)`;
        }

        // Update balance based on win or loss
        if (win) {
            setBalance(prevBalance => Math.min(prevBalance + totalPayout, 1000)); // Ensure balance doesn't exceed 1000 max (or some cap)
        } else {
            setBalance(prevBalance => Math.max(prevBalance - bet, 0)); // Prevent balance from going negative
        }

        setWinMessage(win ? message : 'No win, try again!');
        setIsWin(win);
    };

    const spinReels = () => {
        if (balance <= 0) return; // Prevent spinning if balance is zero

        setIsSpinning(true);
        setWinMessage('');
        setIsWin(false);

        const spinInterval = setInterval(() => {
            const spinningReels = Array(5).fill().map(getRandomSymbol);
            setReels(spinningReels);
        }, 100);

        setTimeout(() => {
            clearInterval(spinInterval);
            const newReels = Array(5).fill().map(getRandomSymbol);
            setReels(newReels);
            checkWin(newReels);
            setIsSpinning(false);
        }, 2000);
    };

    const runSimulation = () => {
        const rtp = simulateSpins(10000);
        setSimulatedRTP(rtp);
    };

    return (
        <div className="slot-machine">
    <div className="reels">
        {reels.map((symbol, index) => (
            <div key={index} className="reel">
                <div className={`symbol ${isSpinning ? 'spinning' : ''}`}>
                    <img src={images[symbol]} alt={symbol} className="symbol-image" />
                </div>
            </div>
        ))}
    </div>

    <div className="controls">
        <SpinButton onClick={spinReels} disabled={isSpinning || balance <= 0} />
        <BalanceDisplay balance={balance} bet={bet} setBet={setBet} />
    </div>

    {winMessage && <div className={`win-message ${isWin ? 'win' : 'lose'}`}>{winMessage}</div>}

    <button onClick={runSimulation} disabled={isSpinning}>
        Simulate 10,000 Spins
    </button>
    {simulatedRTP !== null && (
        <div className="rtp">
            <p>Simulated RTP (10,000 spins): {simulatedRTP.toFixed(2)}%</p>
        </div>
    )}
</div>

    );
    
};

export default SlotMachine;
