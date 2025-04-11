import { getRandomSymbol, calculatePayout } from './GameLogic';

const simulateSpins = (numSpins = 1000000, bet = 1) => {
    let totalBet = 0;
    let totalPayout = 0;
    let freeSpinCount = 0;

    for (let i = 0; i < numSpins; i++) {
        if (freeSpinCount === 0) {
            totalBet += bet;
        }

        const reels = Array(5).fill().map(getRandomSymbol);

        let payout = calculatePayout(reels, bet);

        const bonusCount = reels.filter(s => s === 'bonus').length;
        if (bonusCount >= 3) {
            freeSpinCount += 10;
        }

        while (freeSpinCount > 0) {
            freeSpinCount--;
            const freeReels = Array(5).fill().map(getRandomSymbol);
            payout += calculatePayout(freeReels, bet);
        }

        totalPayout += payout;
    }

    return (totalPayout / totalBet) * 100;  // Return RTP as a percentage
};

export { simulateSpins };
