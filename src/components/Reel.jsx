import React, { useState, useEffect } from 'react';

const Reel = ({ symbols, isSpinning }) => {
    const [currentSymbol, setCurrentSymbol] = useState('');

    useEffect(() => {
        let interval;

        if (isSpinning) {
            interval = setInterval(() => {
                const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
                setCurrentSymbol(randomSymbol);
            }, 100);

            // Stop spinning after 1 second
            setTimeout(() => clearInterval(interval), 1000);
        } else {
            setCurrentSymbol(symbols[0]); // Default to first symbol when not spinning
        }

        return () => clearInterval(interval); // Clean up on unmount
    }, [isSpinning, symbols]);

    return (
        <div className="reel">
            {currentSymbol && (
                <img
                    src={require(`../images/${currentSymbol}.png`)} // Dynamically load the image
                    alt={currentSymbol}
                    className="symbol"
                />
            )}
        </div>
    );
};

export default Reel;