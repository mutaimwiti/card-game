import Card from "./Card";
import Player from "./Player";
import { CARD_COUNT, PER_PLAYER_CARD_COUNT, PLAYER_1, PLAYER_2 } from "../constants";

export default class Game {
    constructor() {
        // We start with the deck of 52 cards, each uniquely numbered from 1 to 53
        this.deck = new Array(CARD_COUNT)
            .fill(null)
            .map((v, i) => new Card(i + 1));

        this.resetScore();
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

    resetScore() {
        this.score = {
            [PLAYER_1]: 0,
            [PLAYER_2]: 0,
        }
    }

    printOutcome() {
        console.log('Final score');
        for (let player of Object.keys(this.score)) {
            console.log(`${player} score: `, this.score[player]);
        }

        if (this.score[PLAYER_1] > this.score[PLAYER_2]) {
            console.log('Winner of the game:', PLAYER_1);
        } else if (this.score[PLAYER_2] > this.score[PLAYER_1]) {
            console.log('Winner of the game:', PLAYER_2);
        } else {
            console.log("It's a tie!");
        }
    }

    start() {
        this.resetScore();
        // The deck is shuffled
        this.shuffle();
        // We deal out those cards between the 2 players. Each player gets half the deck.
        this.deal();

        // On each turn of the game, both players turn over their topmost card, and they
        // compare the value of those cards. The player with the higher valued card
        // "wins" the round and gets a point. The two cards being compared are
        // discarded. Rounds are played until all the cards are discarded.

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

            if (p1Card.isGreater(p2Card)) {
                this.score[PLAYER_1]++;
                console.log('winner: ', PLAYER_1, '\n');
            } else {
                this.score[PLAYER_2]++;
                console.log('winner: ', PLAYER_2, '\n');
            }
        }

        // When all rounds are played you should print each player's final score along
        // with an indication of which player won overall.
        this.printOutcome();
    }
}
