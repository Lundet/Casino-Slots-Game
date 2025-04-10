import React, { useState } from 'react';
import '../styles/SlotGame.css';
import SpinButton from './SpinButton';
import BalanceDisplay from './BalanceDisplay';

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
    bonus: [0, 0, 10, 20, 30, 40],
};

const symbolProbabilities = {
    arrow: 10,
    silvercoin: 10,
    wall: 15,
    shield: 10,
    spearman: 10,
    archer: 10,
    bonus: 5,
    wild: 3,  // Corrected from 75
    knight: 8,
    mage: 7,
    dragon: 5,
    king: 5,
};

const totalWeight = Object.values(symbolProbabilities).reduce((a, b) => a + b, 0); // 80

const getRandomSymbol = () => {
    const random = Math.random() * totalWeight;
    let cumulative = 0;
    for (const symbol in symbolProbabilities) {
        cumulative += symbolProbabilities[symbol];
        if (random < cumulative) return symbol;
    }
    return 'arrow';
};

const isMatchOrWild = (symbol, compareSymbol) => {
    return symbol === compareSymbol || symbol === 'wild';
};

const calculatePayout = (reels, bet = 1) => {
    let totalPayout = 0;
    let symbol = reels[0];
    if (symbol === 'wild') {
        // Use the next non-wild symbol from reel 1 alignment
        symbol = reels.slice(1).find(s => s !== 'wild' && s !== 'bonus') || 'wild';
    }
    let count = 0;
    for (let i = 0; i < 5; i++) {
        if (isMatchOrWild(reels[i], symbol)) {
            count++;
        } else {
            break;
        }
    }
    if (count >= 2) {
        totalPayout += symbolPayouts[symbol][count] * bet;
    }

    const bonusCount = reels.filter(s => s === 'bonus').length;
    if (bonusCount >= 3) {
        for (let i = 0; i < 10; i++) {
            const freeReels = Array(5).fill().map(getRandomSymbol);
            let freeSymbol = freeReels[0];
            if (freeSymbol === 'wild') {
                freeSymbol = freeReels.slice(1).find(s => s !== 'wild' && s !== 'bonus') || 'wild';
            }
            let freeCount = 0;
            for (let j = 0; j < 5; j++) {
                if (isMatchOrWild(freeReels[j], freeSymbol)) {
                    freeCount++;
                } else {
                    break;
                }
            }
            if (freeCount >= 2) {
                totalPayout += symbolPayouts[freeSymbol][freeCount] * bet;
            }
        }
    }
    return totalPayout;
};

const simulateSpins = (numSpins = 1000000) => {
    let totalBet = numSpins;
    let totalPayout = 0;
    for (let i = 0; i < numSpins; i++) {
        const reels = Array(5).fill().map(getRandomSymbol);
        totalPayout += calculatePayout(reels);
    }
    return (totalPayout / totalBet) * 100;
};

const SlotMachine = () => {
    const [reels, setReels] = useState(Array(5).fill().map(getRandomSymbol));
    const [winMessage, setWinMessage] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);
    const [isWin, setIsWin] = useState(false);
    const [simulatedRTP, setSimulatedRTP] = useState(null);
    const [balance, setBalance] = useState(100);
    const [bet, setBet] = useState(1);

    const checkWin = (newReels) => {
        let message = 'You lose!';
        let win = false;
        let totalPayout = 0;

        let symbol = newReels[0];
        if (symbol === 'wild') {
            symbol = newReels.slice(1).find(s => s !== 'wild' && s !== 'bonus') || 'wild';
        }
        let count = 0;
        for (let i = 0; i < 5; i++) {
            if (isMatchOrWild(newReels[i], symbol)) {
                count++;
            } else {
                break;
            }
        }
        if (count >= 2) {
            totalPayout += symbolPayouts[symbol][count] * bet;
            win = true;
            message = `You win! ${count} ${symbol} symbols in a row! Payout: ${totalPayout}`;
        }

        const bonusCount = newReels.filter(s => s === 'bonus').length;
        if (bonusCount >= 3) {
            let freeSpinPayout = 0;
            for (let i = 0; i < 10; i++) {
                const freeReels = Array(5).fill().map(getRandomSymbol);
                let freeSymbol = freeReels[0];
                if (freeSymbol === 'wild') {
                    freeSymbol = freeReels.slice(1).find(s => s !== 'wild' && s !== 'bonus') || 'wild';
                }
                let freeCount = 0;
                for (let j = 0; j < 5; j++) {
                    if (isMatchOrWild(freeReels[j], freeSymbol)) {
                        freeCount++;
                    } else {
                        break;
                    }
                }
                if (freeCount >= 2) {
                    freeSpinPayout += symbolPayouts[freeSymbol][freeCount] * bet;
                }
            }
            totalPayout += freeSpinPayout;
            win = true;
            message += ` + Free Spins! (${bonusCount} bonus symbols, +${freeSpinPayout} payout)`;
        }

        if (win) {
            setBalance(prev => Math.min(prev + totalPayout, 1000));
        } else {
            setBalance(prev => Math.max(prev - bet, 0));
        }
        setWinMessage(win ? message : 'No win, try again!');
        setIsWin(win);
    };

    const spinReels = () => {
        if (balance < bet) return;
        setIsSpinning(true);
        setWinMessage('');
        setIsWin(false);

        const spinInterval = setInterval(() => {
            setReels(Array(5).fill().map(getRandomSymbol));
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
        const rtp = simulateSpins(1000000);
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
                <SpinButton onClick={spinReels} disabled={isSpinning || balance < bet} />
                <BalanceDisplay balance={balance} bet={bet} setBet={setBet} />
            </div>
            {winMessage && <div className={`win-message ${isWin ? 'win' : 'lose'}`}>{winMessage}</div>}
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