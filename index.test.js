import Game from "./src/Game";
import { run } from "./index";

describe('index.js',  function () {
    it('it should not blow up', () => {
        // testing the actual running of the script
        expect(() => require('./index')).not.toThrow();
    });

    describe('run()',  () => {
        it('should fire Game start() method', function () {
            const startSpy = jest.spyOn(Game.prototype, 'start');

            run();

            expect(startSpy).toHaveBeenCalled();
        });
    });
});
