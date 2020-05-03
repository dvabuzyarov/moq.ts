import { Mock } from "../lib/mock";
import { It } from "../lib/expected-expressions/expression-predicates";
import { IMockOptions } from "../lib/moq";

export class FunctionMock<T extends Function> extends Mock<T> {
    constructor(options?: IMockOptions<T>) {
        super(options);
        this.setup(i => i.apply(It.IsAny(), It.IsAny()))
            .callback(({args: [thisArg, params]}) => {
                const values = (params as any[]).reduce((acc, value) => {
                    return `${acc}${value}, `;
                }, "");
                /* tslint:disable:no-eval */
                return eval(`this.object()(${values})`);
            });
    }
}

xdescribe("#305 spike for apply on functions", () => {
    it("the bug", () => {
        type IAdd = (a: number, b: number) => number;

        const app = (addFn: IAdd) => {
            return addFn.apply(null, [1, 2]);
        };

        const mock = new Mock<IAdd>()
            .setup(instance => instance.apply(null, [1, 2]))
            .returns(3);

        expect(app(mock.object())).toBe(3);
    });
});
