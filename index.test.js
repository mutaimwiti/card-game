import Game from "./src/Game";
import { run } from "./index";

describe('index.js',  function () {
    describe('run()',  () => {
        const startSpy = jest.spyOn(Game.prototype, 'start');

        it('it should not blow up', function () {
            expect(() => run()).not.toThrow();
        });

        it('should fire Game start() method', function () {
            expect(startSpy).toHaveBeenCalled();
        });
    });
});
