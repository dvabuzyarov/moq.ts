import {Times, Range} from "./times";

describe("Times", () => {

    it("Verifies AtLeast call count", () => {
        const callCount = 1;
        const times = Times.AtLeast(callCount);

        expect(times.test(0)).toBe(false);
        expect(times.test(callCount)).toBe(true);

        expect(times.message).toEqual(`Should be called at least ${callCount} time(s)`);
    });

    it("Verifies AtLeastOnce call count", () => {
        const times = Times.AtLeastOnce();

        expect(times.test(0)).toBe(false);
        expect(times.test(1)).toBe(true);
        expect(times.message).toEqual("Should be called at least once");
    });

    it("Verifies AtMost call count", () => {
        const callCount = 1;
        const times = Times.AtMost(callCount);

        expect(times.test(0)).toBe(true);
        expect(times.test(1)).toBe(true);
        expect(times.test(2)).toBe(false);
        expect(times.message).toEqual(`Should be called at most ${callCount} time(s)`);
    });

    it("Verifies AtMostOnce call count", () => {
        const times = Times.AtMostOnce();

        expect(times.test(0)).toBe(true);
        expect(times.test(1)).toBe(true);
        expect(times.test(2)).toBe(false);
        expect(times.message).toEqual("Should be called at most once");
    });

    it("Verifies Between call count with Exclusive range", () => {
        const callCountFrom = 1;
        const callCountTo = 3;
        const times = Times.Between(callCountFrom, callCountTo, Range.Exclusive);

        expect(times.test(0)).toBe(false);
        expect(times.test(1)).toBe(false);
        expect(times.test(2)).toBe(true);
        expect(times.test(3)).toBe(false);
        expect(times.message).toEqual(`Should be called exclusively between ${callCountFrom} and ${callCountTo}`);
    });

    it("Verifies Between call count with Inclusive range", () => {
        const callCountFrom = 1;
        const callCountTo = 3;
        const times = Times.Between(callCountFrom, callCountTo, Range.Inclusive);

        expect(times.test(0)).toBe(false);
        expect(times.test(1)).toBe(true);
        expect(times.test(2)).toBe(true);
        expect(times.test(3)).toBe(true);
        expect(times.test(4)).toBe(false);
        expect(times.message).toEqual(`Should be called inclusively between ${callCountFrom} and ${callCountTo}`);
    });

    it("Verifies Exactly call count", () => {
        const callCount = 1;
        const times = Times.Exactly(callCount);

        expect(times.test(0)).toBe(false);
        expect(times.test(callCount)).toBe(true);
        expect(times.test(2)).toBe(false);
        expect(times.message).toEqual(`Should be called exactly ${callCount} time(s)`);
    });

    it("Verifies Never call count", () => {
        const times = Times.Never();

        expect(times.test(0)).toBe(true);
        expect(times.test(1)).toBe(false);
        expect(times.message).toEqual("Should be called never");
    });

    it("Verifies Once call count", () => {
        const times = Times.Once();

        expect(times.test(0)).toBe(false);
        expect(times.test(1)).toBe(true);
        expect(times.test(2)).toBe(false);
        expect(times.message).toEqual("Should be called once");
    });

});
