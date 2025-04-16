import React from 'react';

const Reel = ({ symbol, isSpinning, image, highlighted }) => {
    return (
        <div className={`reel ${highlighted ? 'highlighted' : ''}`}>
            <div className={`symbol ${isSpinning ? 'spinning' : ''}`}>
                <img src={image} alt={symbol} className="symbol-image" />
            </div>
        </div>
    );
};

export default Reel;