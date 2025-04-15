const Reel = ({ symbol, isSpinning, image }) => {
    return (
        <div className="reel">
            <div className={`symbol ${isSpinning ? 'spinning' : ''}`}>
                <img src={image} alt={symbol} className="symbol-image" />
            </div>
        </div>
    );
};

export default Reel;
