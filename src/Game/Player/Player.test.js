import Card from "../Card";
import Player from "./Player";

describe('Player',  function () {
    it('should initialize cards list',() => {
        const player = new Player();

        expect(player.cards).toEqual([]);
    });

    describe('receiveCard()',  () => {
        it('should append the received card to the list of cards', () => {
            const player = new Player();
            player.receiveCard(new Card(5));

            expect(player.cards.length).toEqual(1);
            expect(player.cards[0]).toEqual(new Card(5));
        });
    });

    describe('play()',  () => {
        it('should return the topmost card', function () {
            const player = new Player();
            player.receiveCard(new Card(5));
            player.receiveCard(new Card(12));
            const card = player.play();

            expect(card).toEqual(new Card(12))
        });
    });
});
