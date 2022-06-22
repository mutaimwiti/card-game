import Deck from "./Deck";
import Player from "./Player";
import Card from "./Card";

// have a variable number of players
// what should we do about the number of cards? - equal no of cards

export default class Game {
    constructor(playerCount) {
        this.players = new Array(playerCount)
            .fill(null)
            .map((v, i) => new Player(i + 1));
        this.resetScore();
    }

    resetScore() {
        this.score = {}; // map
        for (let player of this.players) {
            this.score[player.getId()] = 0;
        }
    }

    printOutcome() {
        console.log('Final score');
        for (let playerId of Object.keys(this.score)) {
            console.log(`Player ${playerId} score: `, this.score[playerId]);
        }

        // ensure that the winner has the highest score
        // consider the case of a tie
        let maxScore = 0, winnerId = null, tie = false, tiedIds = [];

        for (let [playerId, score] of Object.entries(this.score)) {
            if (score > maxScore) {
                tie = false;
                tiedIds = [];
                maxScore = score;
                winnerId = playerId;
                // if we're to have ties, we need to capture this playerId
                tiedIds = [playerId];
            } else if (score === maxScore) {
                tie = true;
                tiedIds.push(playerId);
            }
        }

        if (tie) {
            const message = tiedIds.length > 2 ?
                `It's a tie among players: ${tiedIds.toString()}`:
                `It's a tie between players: ${tiedIds[0]} and  ${tiedIds[1]}`;

            console.log(message);
        } else {
            console.log('Winner of the game: Player', winnerId);
        }
    }

    start() {
        // We start with the deck of 52 cards, each uniquely numbered from 1 to 53
        const deck = new Deck();

        // The deck is shuffled
        deck.shuffle();

        // We deal out those cards between the players. All players get an equal number of cards.
        let maxRounds = 0;

        while (deck.remainingCards() >= this.players.length) {
            maxRounds++;
            for (let player of this.players) {
                player.receiveCard(deck.deal());
            }
        }

        console.log('maxRounds', maxRounds);

        // On each turn of the game, all players turn over their topmost card, and they
        // compare the value of those cards. The player with the highest valued card
        // "wins" the round and gets a point. The cards being compared are
        // discarded. Rounds are played until all the cards are
        // discarded.

        this.resetScore();

        let round = 0;

        while (round < maxRounds) {
            round++;
            // When each round is played you should print each player's card value
            // along with an indication of which player won that round.
            console.log('round', round);

            const cardValues = {};

            let maxCard = new Card(0), winner = null;

            for (let player of this.players) {
                const card = player.play();

                cardValues[`Player ${player.getId()}`] = card.getValue();

                if (card.isGreater(maxCard)) {
                    maxCard = card;
                    winner = player;
                }
            }

            this.score[winner.getId()]++;

            console.log(cardValues);

            console.log('winner: Player', winner.getId(), '\n');
        }

        // When all rounds are played you should print each player's final score along
        // with an indication of which player won overall.
        this.printOutcome();
    }
}
