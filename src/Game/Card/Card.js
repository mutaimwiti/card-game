export default class Card {
    constructor(value) {
        this.value = value;
    }

    getValue() {
        return this.value;
    }

    isGreater(otherCard) {
        return this.value > otherCard.value;
    }
}
