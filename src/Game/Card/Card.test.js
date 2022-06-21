import Card from "./Card";

describe('Card',  function () {
    describe('isGreater()',  () => {
        it('should return true if card value is greater than other card value',  () => {
            const card = new Card(15);
            const otherCard = new Card(4);

            expect(card.isGreater(otherCard)).toEqual(true);
        });

        it('should return false if card value is less than other card value', () => {
            const card = new Card(10);
            const otherCard = new Card(48);

            expect(card.isGreater(otherCard)).toEqual(false);
        });
    });
});
