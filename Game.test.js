import {
    Card,
    Game,
    Player,
    PLAYER_1,
    PLAYER_2,
    CARD_COUNT,
    PER_PLAYER_CARD_COUNT,
} from "./Game";

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

describe('Game', function () {
    beforeEach(() => {
    });

    it('should create a deck of 52 cards',  () => {
        const game = new Game();

        expect(game.deck.length).toEqual(52);
        expect(game.deck[0]).toBeInstanceOf(Card);
    });

    describe('shuffle()',  () => {
        it('should shuffle the deck of cards', function () {
            const game = new Game();
            const deckBeforeShuffle = [...game.deck];
            game.shuffle();

            expect(deckBeforeShuffle).not.toEqual(game.deck);
        });
    });

    describe('deal()',  () => {
        it('should instantiate 2 players with cards from the deck', function () {
            const game = new Game();

            expect(game.player1).toBeUndefined();
            expect(game.player2).toBeUndefined();

            game.deal();

            const expectedPlayer1Cards = game.deck.slice(0, PER_PLAYER_CARD_COUNT);
            const expectedPlayer2Cards = game.deck.slice(PER_PLAYER_CARD_COUNT, CARD_COUNT);

            expect(game.player1).toBeInstanceOf(Player);
            expect(game.player2).toBeInstanceOf(Player);
            expect(game.player1.cards).toEqual(expectedPlayer1Cards);
            expect(game.player2.cards).toEqual(expectedPlayer2Cards);
        });
    });

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

    describe('start()',  () => {
        it('should simulate the running of the game and produce a winner', () => {
            const game = new Game();

            const consoleLogSpy = jest.spyOn(console, 'log');
            const resetScore = jest.spyOn(game, 'resetScore');
            const shuffleSpy = jest.spyOn(game, 'shuffle');
            const dealSpy = jest.spyOn(game, 'shuffle');

            expect(game.score[PLAYER_1]).toEqual(0);
            expect(game.score[PLAYER_2]).toEqual(0);

            game.start();

            const expectedWinner = game.score[PLAYER_1] > game.score[PLAYER_2] ? PLAYER_1 : PLAYER_2;

            expect(resetScore).toHaveBeenCalled();
            expect(shuffleSpy).toHaveBeenCalled();
            expect(dealSpy).toHaveBeenCalled();
            expect(consoleLogSpy).toHaveBeenCalledWith('winner of the game', expectedWinner);


            consoleLogSpy.mockClear();
            resetScore.mockClear();
            shuffleSpy.mockClear();
            dealSpy.mockClear();
        });
    });
});
