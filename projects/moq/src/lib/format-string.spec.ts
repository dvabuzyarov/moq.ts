import {format} from "./format-string";

describe("Format string", () => {

    it("Format string without placeholder", () => {

        const args = "value";
        const template = "template";
        const actual = format(template, args);

        expect(actual).toBe(template);
    });

    it("Format string with a placeholder", () => {

        const arg = "value";
        const template = "{0}";
        const actual = format(template, arg);

        expect(actual).toBe(arg);
    });

    it("Format string with a numbered placeholder", () => {

        const arg1 = "value";
        const arg2 = "arg 2";
        const template = "{1}";
        const actual = format(template, arg1, arg2);

        expect(actual).toBe(arg2);
    });
});
