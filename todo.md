# Slot Machine Project - To-Do List

## **1. Visual Enhancements**
- [x] **Add Icons/Images**:
  - Use war-themed icons (e.g., knights, swords, shields, castles, banners).
  - Ensure icons are high-quality and visually cohesive.
- [X] **Improve Styling**:
  - Enhance the layout with better spacing, borders, and animations.
  - Add a background image or gradient (e.g., medieval battlefield or castle theme).
  - Style the spin button to match the theme (e.g., make it look like a shield or sword).
- [X] **Add Animations**:
  - Smooth animations for spinning reels.
  - Add a "glow" effect or particle animation for wins.
  -X Animate the "You win!" or "You lose!" message (e.g., fade-in, bounce).
- [X] **Add Sounds**:
  -X Use the "Age of War" song as background music.
  - Add sound effects for spinning, winning, and losing.
  - Include a toggle button to mute/unmute sounds.
- [ ] **Add a icon explainer**:

---
---

## **2. Game Mechanics**
- [X] **Add Balance System**:
  - Display the player's current balance (e.g., `$1000`).
  - Deduct the bet amount on each spin.
  - Add winnings to the balance after a win.
- [X] **Add Bet Size**:
  - Allow the player to adjust the bet size (e.g., `$1`, `$5`, `$10`).
  - Ensure the bet size affects the payout calculation.
- [X] **Add Rare Icons**:
  - Introduce a rarity system for icons (e.g., knights are rare, swords are common).
  - Adjust the spawn rate of each icon based on rarity.
- [X] **Add Payout Logic**:
  - Create a payout table (e.g., 3 knights = 10x bet, 3 swords = 2x bet).
  - Calculate winnings based on the bet size and matching symbols.
- [X] **Implement RTP (Return to Player)**:
  - Adjust the game logic to achieve a 97% RTP.
  - Use weighted probabilities to control payouts.

---

## **3. User Interface**
- [X] **Add a Betting Panel**:
  - Include buttons to increase/decrease the bet size.
  - Display the current bet size and balance.
- [ ] **Add a Win/Loss Log**:
  - Show a history of recent spins (e.g., "Win: $10", "Loss: $5").
- [ ] **Add a Spin Counter**:
  - Track the number of spins the player has made.
- [ ] **Add a Reset Button**:
  - Allow the player to reset the game (e.g., reset balance to default).

---

## **4. Advanced Features**
- [X] **Add Bonus Rounds**:
  - Introduce a bonus round triggered by specific symbols (e.g., 3 castles trigger a "Battle Bonus").
  - Create a mini-game for the bonus round (e.g., pick a knight to win extra coins).
- [X] **Add Free Spins**:
  - Award free spins for specific combinations (e.g., 3 banners = 5 free spins).
- [ ] **Add Progressive Jackpot**:
  - Add a jackpot that increases with each spin.
  - Award the jackpot for a rare combination (e.g., 3 golden knights).
- [X] **Add Multipliers**:
  - Introduce multipliers for certain combinations (e.g., 2x, 3x payouts).
- [ ] **Add Auto-Spin**:
  - Allow the player to enable auto-spin for a set number of spins.

---

## **5. Backend/Logic Enhancements**
- [X] **Add Weighted Probabilities**:
  - Assign weights to symbols to control how often they appear.
  - Ensure rare symbols appear less frequently than common ones.
- [X] **Add RTP Calculation**:
  - Simulate thousands of spins to verify the RTP is close to 97%.
- [ ] **Add Save/Load Feature**:
  - Save the player's balance and game state to local storage.
  - Load the saved state when the game is reopened.

---

## **6. Testing and Debugging**
- [ ] **Test Win/Loss Logic**:
  - Verify that payouts are calculated correctly.
  - Ensure the win/loss messages are displayed accurately.
- [ ] **Test Edge Cases**:
  - Handle cases where the player runs out of money.
  - Ensure the game works correctly with minimum and maximum bets.
- [ ] **Debug Animations**:
  - Ensure animations run smoothly on all devices.

---

## **7. Future Features**
- [ ] **Add Leaderboards**:
  - Track high scores or balances and display them on a leaderboard.
- [ ] **Add Achievements**:
  - Award achievements for milestones (e.g., "100 Spins", "Big Win").
- [ ] **Add Multiplayer Mode**:
  - Allow players to compete for the highest balance.
- [ ] **Add Customization**:
  - Let players choose their own icons or themes (e.g., medieval, sci-fi, fantasy).

---

## **8. Deployment**
- [ ] **Optimize for Mobile**:
  - Ensure the game is responsive and works well on mobile devices.
- [ ] **Deploy Online**:
  - Host the game on a platform like GitHub Pages, Netlify, or Vercel.
- [ ] **Add Analytics**:
  - Track player behavior (e.g., number of spins, average bet size).