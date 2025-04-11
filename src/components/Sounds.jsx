// Importing sound files
import arrowTwang from '../assets/sounds/arrow-twang.mp3'; // Arrow sound
import archerSwish from '../assets/sounds/arrow-swish.mp3'; // Archer sound
import coinSound from '../assets/sounds/coin.mp3'; // Coin sound
import dragonSound from '../assets/sounds/dragon.mp3'; // Dragon sound
import wallSound from '../assets/sounds/wall.mp3'; // Wall sound
import shieldSound from '../assets/sounds/shield.mp3'; // Shield sound
import spearmanSound from '../assets/sounds/spearman.mp3'; // Spearman sound
import knightSound from '../assets/sounds/knight.mp3'; // Knight sound
import mageSound from '../assets/sounds/mage.mp3'; // Mage sound
import kingSound from '../assets/sounds/king.mp3'; // King sound
// import wildSound from '../assets/sounds/wild.mp3'; // Wild sound
import bonusSound from '../assets/sounds/bonus.mp3'; // Bonus sound

// Sound player function
export const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.volume = 0.1; // Set volume to 30%
    audio.play();
};


// Sound effects mapping
export const sounds = {
    arrow: arrowTwang, // Sound for arrow
    archer: archerSwish, // Sound for archer
    silvercoin: coinSound, // Sound for coin
    dragon: dragonSound, // Sound for dragon
    wall: wallSound, // Sound for wall
    shield: shieldSound, // Sound for shield
    spearman: spearmanSound, // Sound for spearman
    knight: knightSound, // Sound for knight
    mage: mageSound, // Sound for mage
    king: kingSound, // Sound for king
    // wild: wildSound, // Sound for wild
    bonus: bonusSound, // Sound for bonus
};
