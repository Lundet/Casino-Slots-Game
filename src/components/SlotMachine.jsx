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

const SlotMachine = () => {
    const [reels, setReels] = useState([symbols[Math.floor(Math.random() * symbols.length)], symbols[Math.floor(Math.random() * symbols.length)], symbols[Math.floor(Math.random() * symbols.length)]]);
    const [winMessage, setWinMessage] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);
    const [isWin, setIsWin] = useState(false);

    const spinReels = () => {
        setIsSpinning(true);
        setWinMessage('');
        setIsWin(false);

        // Simulate spinning effect
        const spinInterval = setInterval(() => {
            const spinningReels = Array(3).fill().map(() => symbols[Math.floor(Math.random() * symbols.length)]);
            setReels(spinningReels);
        }, 100);

        // Stop spinning after 2 seconds and determine the result
        setTimeout(() => {
            clearInterval(spinInterval);
            const newReels = Array(3).fill().map(() => symbols[Math.floor(Math.random() * symbols.length)]);
            setReels(newReels);
            const win = checkWin(newReels);
            setIsSpinning(false);
        }, 2000);
    };

    const checkWin = (newReels) => {
        let message = 'You lose!';
        let win = false;
        

        // Check if two adjacent symbols are the same
        if (newReels[0] === newReels[1] || newReels[1] === newReels[2]) {
            message = 'You win! Two adjacent symbols match!';
            win = true;
            setIsWin(true);
        }

        setWinMessage(message);
        return win;
    };

    return (
        <div className="slot-machine">
            <div className="reels">
                {reels.map((symbol, index) => (
                    <div key={index} className="reel">
                        <div className={`symbol ${isSpinning ? 'spinning' : ''}`}>
                            {
                                <img
                                    src={images[symbol]}
                                    alt={symbol}
                                    className="symbol-image"
                                />
                            }
                        </div>
                    </div>
                ))}
            </div>

            <SpinButton onClick={spinReels} disabled={isSpinning} />
            {winMessage && <div className={`win-message ${isWin ? 'win' : 'lose'}`}>{winMessage}</div>}
        </div>
    );
};

export default SlotMachine;