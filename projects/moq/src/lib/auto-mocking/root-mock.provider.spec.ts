import { RootMockProvider } from "./root-mock.provider";
import { MOCK } from "../injector/mock.injection-token";
import { Mock } from "moq.ts";
import { Optional } from "../static.injector/metadata";
import { ROOT_MOCK } from "../injector/root-mock.injection-token";
import { createInjectorFromProviders, resolve2 } from "../../tests.components/resolve.builder";

describe("Root mock provider", () => {

    it("Returns self", () => {
        createInjectorFromProviders([
            {provide: RootMockProvider, useClass: RootMockProvider, deps: [MOCK, [new Optional(), ROOT_MOCK]]},
            {provide: MOCK, useValue: new Mock().object(), deps: []}
        ]);

        const actual = resolve2(RootMockProvider);

        expect(actual).toBe(resolve2(MOCK));
    });

    it("Returns root mock", () => {
        createInjectorFromProviders([
            {provide: RootMockProvider, useClass: RootMockProvider, deps: [MOCK, [new Optional(), ROOT_MOCK]]},
            {provide: MOCK, useValue: new Mock().object(), deps: []},
            {provide: ROOT_MOCK, useValue: new Mock().object(), deps: []}
        ]);

        const actual = resolve2(RootMockProvider);

        expect(actual).toBe(resolve2(ROOT_MOCK));
        expect(actual).not.toBe(resolve2(MOCK));
    });

});
