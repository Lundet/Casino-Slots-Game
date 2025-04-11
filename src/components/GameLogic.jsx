// src/gameLogic.js

import { symbolPayouts, symbolProbabilities } from './symbols'; // Correct import from symbols.js

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

export { calculatePayout, getRandomSymbol, isMatchOrWild };
