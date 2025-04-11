// No need for return here, direct export works
export const symbolPayouts = {
    arrow: [0, 0, 2, 4, 8, 12],
    silvercoin: [0, 0, 2, 4, 8, 12],
    wall: [0, 0, 4, 8, 12, 20],
    shield: [0, 0, 3, 5, 10, 25],
    spearman: [0, 0, 6, 12, 20, 75],
    archer: [0, 0, 6, 12, 20, 150],
    knight: [0, 0, 10, 15, 30, 250],
    mage: [0, 0, 10, 15, 30, 500],
    dragon: [0, 0, 12, 25, 45, 750],
    king: [0, 0, 15, 50, 500, 1000],
    wild: [0, 0, 20, 50, 500, 1000],
    bonus: [0, 0, 10, 20, 30, 40],
};

export const symbolProbabilities = {
    arrow: 15,
    silvercoin: 15,
    wall: 13,
    shield: 13,
    spearman: 10,
    archer: 8,
    knight: 7,
    mage: 6,
    dragon: 6,
    king: 5,
    bonus: 50,
    wild: 50,
};
