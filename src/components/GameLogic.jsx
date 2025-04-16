// src/gameLogic.js

import { symbolPayouts, symbolProbabilities } from './Symbols'; // Correct import from symbols.js
import { sounds, playSound } from './Sounds'; // Import sounds and playSound

const totalWeight = Object.values(symbolProbabilities).reduce((a, b) => a + b, 0);

const getRandomSymbol = () => {
    const random = Math.random() * totalWeight;
    let cumulative = 0;
    for (const symbol in symbolProbabilities) {
        cumulative += symbolProbabilities[symbol];
        if (random < cumulative) return symbol;
    }
    return 'arrow';
};

const isMatchOrWild = (symbol, compareSymbol) => symbol === compareSymbol || symbol === 'wild';
const checkWin = (newReels, bet, setBalance, setWinMessage, setIsWin, setFreeSpins) => {
    let message = 'You lose!';
    let win = false;
    let totalPayout = 0;
    let symbol = newReels[0];
    let winningReels = []; // Array to store the indices of winning reels

    if (symbol === 'wild') {
        symbol = newReels.slice(1).find(s => s !== 'wild' && s !== 'bonus') || 'wild';
    }
    let count = 0;
    for (let i = 0; i < 5; i++) {
        if (isMatchOrWild(newReels[i], symbol)) {
            count++;
            winningReels.push(i); // Add the index of the winning reel
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
    } else {
        winningReels = []; // Clear winningReels if no win
    }

    let bonusCount = newReels.filter(s => s === 'bonus').length;
    if (bonusCount >= 3) {
        playSound(sounds['bonus']);
        let freeSpinPayout = 0;
        setFreeSpins(10);
        win = true;
        message = ` + 10 Free Spins! (${bonusCount} bonus symbols, +${freeSpinPayout} payout)`;
        totalPayout = 0;
    }

    setBalance(prev => Math.min(prev + totalPayout, 100000));
    setWinMessage(win ? message : 'No win, try again!');
    setIsWin(win);

    return { win, message, winningReels }; // Return win and winningReels
};

const calculatePayout = (reels, bet = 1) => {
    let totalPayout = 0;
    let symbol = reels[0];
    if (symbol === 'wild') {
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

export { calculatePayout, getRandomSymbol, isMatchOrWild, checkWin };