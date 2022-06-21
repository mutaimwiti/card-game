export class Card {
    constructor(value) {
        this.value = value;
    }

    isGreater(otherCard) {
        return this.value > otherCard.value;
    }
}
