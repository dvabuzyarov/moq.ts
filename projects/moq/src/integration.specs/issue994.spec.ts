import { Mock } from "../lib/mock.js";
import { EqualMatchingInjectorConfig } from "../lib/injector/equal-matching-injector.config";
import { Times } from "../lib/times";

describe("#994 TypeError: object null is not iterable (cannot read property Symbol(Symbol.iterator))", () => {


    it("the issue", async () => {
        const mock = new Mock<(param: unknown) => void>({injectorConfig: new EqualMatchingInjectorConfig()});

        mock.object()(null);

        mock.verify(instance => instance({}), Times.Never());
    });
});
