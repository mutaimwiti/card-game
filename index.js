// We start with the deck of 52 cards, each uniquely numbered from 1 to 53
const CARD_COUNT = 52;
const deck = new Array(CARD_COUNT)
    .fill(null)
    .map((v, i) => ({ value: i + 1 }));

console.log('deck', deck, 'count', deck.length);
console.log('card count', deck.length);

// The deck is shuffled
for(let i = CARD_COUNT - 1; i > 0; i--) {
    // get a random card (j) with which to shuffle with the current one (i)
    const j = Math.floor(Math.random() * (i + 1));
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
}

console.log('shuffled deck', deck);

// We deal out those cards between the 2 players. Each player gets half the deck.
const PLAYER_CARD_COUNT = CARD_COUNT / 2;
const p1Cards = deck.slice(0, PLAYER_CARD_COUNT);
const p2Cards = deck.slice(PLAYER_CARD_COUNT, CARD_COUNT);

console.log('p1Cards', p1Cards);
console.log('p1 card count', p1Cards.length);

console.log('p2Cards', p2Cards);
console.log('p2 card count', p2Cards.length);

// On each turn of the game, both players turn over their topmost card, and they compare the value of those cards.
// The player with the higher valued card "wins" the round and gets a point. The two cards being compared are discarded.
// Rounds are played until all the cards are discarded.
const score = {
    p1: 0,
    p2: 0,
};

let round = 0;

while (round < PLAYER_CARD_COUNT) {
    round++;

    const p1Card = p1Cards.pop();
    const p2Card = p2Cards.pop();

    // When each round is played you should print each player's card value
    // along with an indication of which player won that round.
    console.log('round', round);
    console.log('card values', { p1: p1Card.value, p2: p2Card.value });

    if (p1Card.value > p2Card.value) {
        score.p1++;
        console.log('round winner', 'player 1');
    } else {
        score.p2++;
        console.log('round winner', 'player 2');
    }
}

// When all rounds are played you should print each player's final score along
// with an indication of which player won overall.
console.log('p1 score', score.p1);
console.log('p2 score', score.p2);

// At the end of the game the player who has the most points wins.
const winner = score.p1 > score.p2 ? 'Player 1': 'Player 2';

console.log('winner of the game', winner);
