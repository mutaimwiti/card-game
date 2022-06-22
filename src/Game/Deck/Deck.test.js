import Deck from "./Deck";
import Card from "../Card";
import { CARD_COUNT } from "../../constants";

describe('Deck',  function () {
    it('should create a deck of 52 cards',  () => {
        const deck = new Deck();

        expect(deck.cards.length).toEqual(CARD_COUNT);
        expect(deck.cards[0]).toBeInstanceOf(Card);
    });

    describe('shuffle()',  () => {
        it('should shuffle the cards', () => {
            const deck = new Deck();
            const cardsBeforeShuffle = [...deck.cards];
            deck.shuffle();

            expect(deck.cards.length).toEqual(CARD_COUNT);
            expect(cardsBeforeShuffle).not.toEqual(deck.cards);
        });
    });

    describe('deal()',  () => {
        it('should return a card', function () {
            const deck = new Deck();
            const card = deck.deal();

            expect(card).toBeInstanceOf(Card);
        });

        it('should throw an error if all cards have been dealt', function () {
            const deck = new Deck();
            let dealCount = 0;
            while (dealCount < CARD_COUNT) {
                dealCount++;
                deck.deal();
            }
            const expectedError = new Error('All cards have been dealt');

            expect(() => deck.deal()).toThrow(expectedError);
        });
    });

    describe('remainingCards()',  () => {
        it('should return correct number of remaining cards', function () {
            const deck = new Deck();

            expect(deck.remainingCards()).toEqual(CARD_COUNT);

            deck.deal();

            expect(deck.remainingCards()).toEqual(CARD_COUNT - 1);
        });
    });
});
