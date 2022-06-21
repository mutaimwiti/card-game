import { Card } from "../Card/Card";
import { Player } from "./Player";

describe('Player',  function () {
    describe('play()',  () => {
        it('should return the topmost card', function () {
            const player = new Player([
                new Card(5),
                new Card(12),
            ]);
            const card = player.play();

            expect(card).toEqual(new Card(12))
        });
    });
});
