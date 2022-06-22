import Card from "../Card";
import { CARD_COUNT } from "../../constants";

export default class Deck {
    constructor() {
        // We start with the deck of 52 cards, each uniquely numbered from 1 to 53
        this.cards = new Array(CARD_COUNT)
            .fill(null)
            .map((v, i) =>  new Card(i + 1));
        this.cardsDealt = 0;
    }

    shuffle() {
        for (let i = CARD_COUNT - 1; i > 0; i--) {
            // get a random card (j) with which to shuffle with the current one (i)
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
        this.cardsDealt = 0;
    }

    deal() {
        if (this.cardsDealt < CARD_COUNT) {
            const nextCard = this.cards[this.cardsDealt];
            this.cardsDealt++;
            return nextCard;
        }
        throw new Error('All cards have been dealt');
    }

    remainingCards() {
        return CARD_COUNT - this.cardsDealt;
    }
}
