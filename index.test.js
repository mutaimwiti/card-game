import { run } from "./index";

describe('index.js',  function () {
    describe('run()',  () => {
        it('it should not blow up', function () {
            expect(() => run()).not.toThrow();
        });
    });
});
