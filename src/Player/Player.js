export default class Player {
    constructor(cards) {
        this.cards = cards;
    }

    play() {
        return this.cards.pop();
    }
}
