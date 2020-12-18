/*eslint-disable max-classes-per-file*/
import { Mock } from "../lib/mock";

describe("Mock: typeof", () => {


    it("Returns true when typeof is the same", () => {
        class Prototype {
            method(value: number): number {
                throw new Error("Not Implemented");
            }
        }

        const expected = 2;
        const object = new Mock<Prototype>({target: new Prototype()})
            .setup(instance => instance.method(1))
            .returns(expected)
            .object();

        const actual = object.method(1);

        expect(actual).toBe(expected);
        expect(typeof object).toBe("object");
    });

    it("Returns false when typeof is not the same", () => {
        class Prototype {
            method(value: number): number {
                throw new Error("Not Implemented");
            }
        }

        const expected = 2;
        const object = new Mock<Prototype>()
            .setup(instance => instance.method(1))
            .returns(expected)
            .object();

        const actual = object.method(1);

        expect(actual).toBe(expected);
        expect(typeof object).toBe("function");
    });

});
