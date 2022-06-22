export default class Player {
    constructor(id) {
        this.id = id;
        this.cards = [];
    }

    getId() {
        return this.id;
    }

    receiveCard(card) {
        this.cards.push(card);
    }

    play() {
        return this.cards.pop();
    }
}
