import React, { useState } from 'react';
import '../styles/SlotGame.css';
import SpinButton from './SpinButton';

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

// Multiplier (X payout) for each symbol
const symbolMultipliers = {
    arrow: 2,    // Arrow symbol pays 2x
    silvercoin: 3,   // Coin symbol pays 3x
    wall: 1,     // Wall symbol pays 1x
    shield: 1,   // Shield symbol pays 1x
    spearman: 1, // Spearman symbol pays 1x
    archer: 1,   // Archer symbol pays 1x
    bonus: 5,    // Bonus symbol pays 5x (extra multiplier for bonus)
    wild: 4,     // Wild symbol pays 4x
    knight: 10,  // Knight symbol pays 10x
    mage: 2,     // Mage symbol pays 2x
    dragon: 8,   // Dragon symbol pays 8x
    king: 6,     // King symbol pays 6x
};

// Probability distribution (weights) for each symbol (adjust for RTP)
const symbolProbabilities = {
    arrow: 10,
    silvercoin: 10,
    wall: 15,
    shield: 10,
    spearman: 10,
    archer: 10,
    bonus: 5,    // Bonus symbol has a 5% chance
    wild: 5,     // Wild symbol has a 5% chance
    knight: 8,
    mage: 7,
    dragon: 5,
    king: 5,
};

// Adjusted to the 5-symbol case (assuming we want to calculate 2-5 symbol payouts)
const symbolPayouts = {
    arrow: [0, 0, 2, 4, 6, 10],  // Payouts for 0-5 symbols
    silvercoin: [0, 0, 3, 6, 9, 15],
    wall: [0, 0, 1, 2, 3, 5],
    shield: [0, 0, 1, 2, 3, 5],
    spearman: [0, 0, 1, 2, 3, 5],
    archer: [0, 0, 1, 2, 3, 5],
    bonus: [0, 0, 5, 10, 15, 25],
    wild: [0, 0, 4, 8, 12, 20],
    knight: [0, 0, 10, 20, 30, 50],
    mage: [0, 0, 2, 4, 6, 10],
    dragon: [0, 0, 8, 16, 24, 40],
    king: [0, 0, 6, 12, 18, 30],
};

// Helper function to calculate RTP
const calculateRTP = () => {
    let totalExpectedPayout = 0;

    // Loop through each symbol
    for (const symbol in symbolPayouts) {
        const probability = symbolProbabilities[symbol] / 100;  // Convert to a percentage (0-1)
        const payouts = symbolPayouts[symbol];  // Get the payouts for 0-5 symbols

        // Sum the expected payouts for 2 to 5 symbols
        let expectedPayoutForSymbol = 0;
        for (let i = 2; i <= 5; i++) {
            expectedPayoutForSymbol += payouts[i] * probability;
        }

        // Add this symbol's expected payout to the total RTP
        totalExpectedPayout += expectedPayoutForSymbol;
    }

    return totalExpectedPayout * 100;  // RTP is usually expressed as a percentage
};

// Helper function to get a random symbol
const getRandomSymbol = () => {
    // Get a list of all symbols
    const symbolList = Object.keys(symbolProbabilities);
    
    // Calculate a random index based on the weighted probabilities
    const random = Math.random() * 100;  // Get a random number between 0 and 100
    let cumulativeProbability = 0;

    // Loop through the symbols and find the one that corresponds to the random number
    for (const symbol of symbolList) {
        cumulativeProbability += symbolProbabilities[symbol];
        if (random < cumulativeProbability) {
            return symbol;
        }
    }

    // Fallback (should not reach here)
    return symbolList[0];
};

const SlotMachine = () => {
    const [reels, setReels] = useState(Array(5).fill().map(getRandomSymbol));
    const [winMessage, setWinMessage] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);
    const [isWin, setIsWin] = useState(false);
    const [rtp, setRTP] = useState(calculateRTP());  // Calculate and store RTP

    // Check for wins (only from the 1st reel onward and consecutive)
    const checkWin = (newReels) => {
        let message = 'You lose!';
        let win = false;
        let totalPayout = 0;
    
        // Check for consecutive matching symbols starting from the 1st reel
        for (let i = 0; i < 5; i++) {
            const symbol = newReels[i];
    
            // Ensure that the symbols match consecutively (starting from the 1st reel)
            let count = 0;
            for (let j = i; j < 5; j++) {
                if (newReels[j] === symbol) {
                    count++;
                } else {
                    break;  // Stop once symbols are no longer consecutive
                }
            }
    
            if (count >= 2 && i === 0) {  // Only consider if starting from the 1st reel
                const payoutMultiplier = symbolPayouts[symbol][count];  // Get the correct multiplier based on count
                totalPayout += payoutMultiplier;
                win = true;
                message = `You win! ${count} ${symbol} symbols in a row! Payout: ${payoutMultiplier}`;
                break;  // Stop once a valid win is found
            }
        }
    
        // Display win/lose message
        if (win) {
            setWinMessage(message);
        } else {
            setWinMessage('No win, try again!');
        }
    
        setIsWin(win);
    };
    
    const spinReels = () => {
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

            <SpinButton onClick={spinReels} disabled={isSpinning} />
            {winMessage && <div className={`win-message ${isWin ? 'win' : 'lose'}`}>{winMessage}</div>}

            <div className="rtp">
                <p>RTP: {rtp.toFixed(2)}%</p>
            </div>
        </div>
    );
};

export default SlotMachine;
