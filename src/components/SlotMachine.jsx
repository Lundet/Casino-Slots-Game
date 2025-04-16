import React, { useState } from 'react';
import '../styles/SlotGame.css';
import SpinButton from './SpinButton';
import BalanceDisplay from './BalanceDisplay';
import { simulateSpins } from './Simulation';
import { getRandomSymbol, isMatchOrWild } from './GameLogic';
import { symbolPayouts } from './Symbols';  // Assuming this is where symbolPayouts is defined
import { sounds, playSound } from './Sounds';
import Reel from './Reel';  // Assuming this is where the Reel component is defined


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
    const [freeSpins, setFreeSpins] = useState(0);  // Free spins counter
    const [simulatedRTP, setSimulatedRTP] = useState(null);

    const spinReels = () => {
        if (balance < bet && freeSpins === 0) return;

        setIsSpinning(true);
        setWinMessage('');
        setIsWin(false);
        //higher spin sound


        // audio.volume = 1; // This line is no longer needed
        playSound(sounds.spin);  // Play spin sound

        // If free spins are available, do not deduct from the balance
        if (freeSpins > 0) {
            setFreeSpins(prev => prev - 1);  // Deduct one free spin
        } else {
            setBalance(prev => Math.max(prev - bet, 0));  // Deduct from balance when no free spins
        }

        const spinInterval = setInterval(() => {
            setReels(Array(5).fill().map(getRandomSymbol));
        }, 100);

        setTimeout(() => {
            clearInterval(spinInterval);
            const newReels = Array(5).fill().map(getRandomSymbol);
            setReels(newReels);
            checkWin(newReels);
            setIsSpinning(false);
        }, 3500);
    };

    const checkWin = (newReels) => {
        let message = 'You lose!';
        let win = false;
        let totalPayout = 0;
        let symbol = newReels[0];
        //if symbol is wild act like a joker

        if (symbol === 'wild') {
            symbol = newReels.slice(1).find(s => s !== 'wild') || 'wild';
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
            // Play the winning sound for the symbol except for wild and bonus
            if (symbol !== 'wild' && symbol !== 'bonus') {
                if (sounds[symbol]) {
                    playSound(sounds[symbol]);  // Pass the array of sounds corresponding to the symbol
                }
            }
        }

        const bonusCount = newReels.filter(s => s === 'bonus').length;
        if (bonusCount >= 3) {
            playSound(sounds['bonus']);  // Play bonus sound
            let freeSpinPayout = 0;
            for (let i = 0; i < 10; i++) {  // Only run 10 free spins
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
                    playSound(sounds[symbol]);  // Play sound for the winning symbol
                }
            }
            totalPayout += freeSpinPayout;
            win = true;
            message = ` + 10 Free Spins! (${bonusCount} bonus symbols, +${freeSpinPayout} payout)`;
            setFreeSpins(10);  // Set the free spins to 10
        }

        setBalance(prev => Math.min(prev + totalPayout, 100000));
        setWinMessage(win ? message : 'No win, try again!');
        setIsWin(win);
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
                    />
                ))}
            </div>

            <div className="controls">
                <SpinButton
                    onClick={spinReels}
                    disabled={isSpinning || (balance < bet && freeSpins === 0)}
                />
                <BalanceDisplay balance={balance} bet={bet} setBet={setBet} />
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