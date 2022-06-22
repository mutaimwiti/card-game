import Deck from "./Deck";
import Player from "./Player";
import { PER_PLAYER_CARD_COUNT, PLAYER_1, PLAYER_2 } from "../constants";

export default class Game {
    constructor() {
        this.resetScore();
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
        // We start with the deck of 52 cards, each uniquely numbered from 1 to 53
        const deck = new Deck();

        // The deck is shuffled
        deck.shuffle();

        // We deal out those cards between the 2 players. Each player gets half the deck.
        const player1 = new Player();
        const player2 = new Player();

        while (deck.remainingCards() > 1) {
            player1.receiveCard(deck.deal());
            player2.receiveCard(deck.deal());
        }

        // On each turn of the game, both players turn over their topmost card, and they
        // compare the value of those cards. The player with the higher valued card
        // "wins" the round and gets a point. The two cards being compared are
        // discarded. Rounds are played until all the cards are discarded.

        this.resetScore();

        let round = 0;

        while (round < PER_PLAYER_CARD_COUNT) {
            round++;

            const p1Card = player1.play();
            const p2Card = player2.play();

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
