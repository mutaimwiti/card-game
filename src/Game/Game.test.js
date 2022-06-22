import Game from "./Game";
import { PLAYER_1, PLAYER_2 } from "../constants";

describe('Game', function () {
    describe('resetScore()',  () => {
        it('should reset score to 0', function () {
            const game = new Game();

            // setting the score manually for now since score has a public scope
            game.score[PLAYER_1] = 10;
            game.score[PLAYER_2] = 5;

            game.resetScore();

            for (let player of Object.keys(game.score)) {
                expect(game.score[player]).toEqual(0);
            }
        });
    });

    describe('printOutcome()',  () => {
        describe('when Player 1 wins', () => {
            it('should print Player 1 as the winner', ()  =>{
                const game = new Game();

                // setting the score manually for now since it has a public scope
                game.score[PLAYER_1] = 20;
                game.score[PLAYER_2] = 6;

                const consoleLogSpy = jest.spyOn(console, 'log');

                game.printOutcome();

                expect(consoleLogSpy).toHaveBeenCalledWith('Winner of the game:', PLAYER_1)

                consoleLogSpy.mockClear();
            });
        });

        describe('when Player 2 wins', () => {
            it('should print Player 2 as the winner', ()  =>{
                const game = new Game();

                // setting the score manually for now since it has a public scope
                game.score[PLAYER_1] = 10;
                game.score[PLAYER_2] = 16;

                const consoleLogSpy = jest.spyOn(console, 'log');

                game.printOutcome();

                expect(consoleLogSpy).toHaveBeenCalledWith('Winner of the game:', PLAYER_2)

                consoleLogSpy.mockClear();
            });
        });

        describe('when it is a tie', () => {
            it('should print tie message', ()  =>{
                const game = new Game();

                // setting the score manually for now since it has a public scope
                game.score[PLAYER_1] = 13;
                game.score[PLAYER_2] = 13;

                const consoleLogSpy = jest.spyOn(console, 'log');

                game.printOutcome();

                expect(consoleLogSpy).toHaveBeenCalledWith("It's a tie!")

                consoleLogSpy.mockClear();
            });
        });

        it('should reset score to 0', function () {
            const game = new Game();

            // setting the score manually for now since it has a public scope
            game.score[PLAYER_1] = 12;
            game.score[PLAYER_2] = 14;

            game.resetScore();

            for (let player of Object.keys(game.score)) {
                expect(game.score[player]).toEqual(0);
            }
        });
    });

    describe('start()',  () => {
        it('should simulate the running of the game', () => {
            const game = new Game();

            const printOutcomeSpy = jest.spyOn(game, 'printOutcome');
            const resetScoreSpy = jest.spyOn(game, 'resetScore');

            game.start();

            expect(printOutcomeSpy).toHaveBeenCalled();
            expect(resetScoreSpy).toHaveBeenCalled();

            printOutcomeSpy.mockClear();
            resetScoreSpy.mockClear();
        });
    });
});
