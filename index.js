const CARD_COUNT = 52;
const PER_PLAYER_CARD_COUNT = CARD_COUNT / 2;

const PLAYER_1 = 'Player 1';
const PLAYER_2 = 'Player 2';

class Card {
    constructor(value) {
        this.value = value;
    }
}

class Player {
    constructor(cards) {
        this.cards = cards;
    }

    play() {
        return this.cards.pop();
    }
}

class Game {
    constructor() {
        // We start with the deck of 52 cards, each uniquely numbered from 1 to 53
        this.deck = new Array(CARD_COUNT)
            .fill(null)
            .map((v, i) => new Card(i + 1));
    }

    shuffle() {
        for(let i = CARD_COUNT - 1; i > 0; i--) {
            // get a random card (j) with which to shuffle with the current one (i)
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }
    }

    deal() {
        this.player1 = new Player(this.deck.slice(0, PER_PLAYER_CARD_COUNT));
        this.player2 = new Player(this.deck.slice(PER_PLAYER_CARD_COUNT, CARD_COUNT));
    }

    start() {
        // The deck is shuffled
        this.shuffle();
        // We deal out those cards between the 2 players. Each player gets half the deck.
        this.deal();

        // On each turn of the game, both players turn over their topmost card, and they
        // compare the value of those cards. The player with the higher valued card
        // "wins" the round and gets a point. The two cards being compared are
        // discarded. Rounds are played until all the cards are discarded.

        const score = {
            p1: 0,
            p2: 0,
        };

        let round = 0;

        while (round < PER_PLAYER_CARD_COUNT) {
            round++;

            const p1Card = this.player1.play();
            const p2Card = this.player2.play();

            // When each round is played you should print each player's card value
            // along with an indication of which player won that round.
            console.log('round', round);
            console.log({
                [PLAYER_1]: p1Card.value,
                [PLAYER_2]: p2Card.value
            });

            if (p1Card.value > p2Card.value) {
                score.p1++;
                console.log('winner: ', PLAYER_1, '\n');
            } else {
                score.p2++;
                console.log('winner: ', PLAYER_2, '\n');
            }
        }

        // When all rounds are played you should print each player's final score along
        // with an indication of which player won overall.
        console.log('Final score');
        console.log(`${PLAYER_1} score: `, score.p1);
        console.log(`${PLAYER_2} score: `, score.p2);

        // At the end of the game the player who has the most points wins.
        const winner = score.p1 > score.p2 ? PLAYER_1: PLAYER_2;

        console.log('winner of the game', winner);
    }
}

new Game().start();
