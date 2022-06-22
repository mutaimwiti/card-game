export default class Player {
    constructor() {
        this.cards = [];
    }

    receiveCard(card) {
        this.cards.push(card);
    }

    play() {
        return this.cards.pop();
    }
}
