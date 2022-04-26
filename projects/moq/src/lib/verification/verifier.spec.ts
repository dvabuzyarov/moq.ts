import { Verifier } from "./verifier";
import { Times } from "../times";
import { Mock, Times as moqTimes } from "moq.ts";
import { CallCounter } from "./call-counter";
import { Expressions } from "../reflector/expressions";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { VerificationTester } from "./verification-tester";
import { AutoMockProvider } from "../auto-mocking/auto-mock.provider";
import { IMock } from "../moq";

describe("Verifier", () => {

    beforeEach(() => {
        createInjector(Verifier, [CallCounter, VerificationTester, AutoMockProvider]);
    });

    beforeEach(() => {
        resolveMock(VerificationTester).prototypeof(VerificationTester.prototype);
    });

    it("Verifies simple expression", () => {
        const haveBeenCalled = 1;
        const expression = {} as Expressions<unknown>;

        resolveMock(CallCounter)
            .setup(instance => instance.count(expression))
            .returns(haveBeenCalled);

        const verify = resolve2(Verifier);
        verify.test([expression], Times.Once());

        resolveMock(VerificationTester)
            .verify(instance => instance.test(expression, haveBeenCalled, Times.Once()));
        resolveMock(VerificationTester)
            .verify(instance => instance.test(expression, haveBeenCalled, Times.AtLeastOnce()), moqTimes.Never());
    });

    it("Verifies deep expression", () => {
        const haveBeenCalled = 1;
        const shallow = {} as Expressions<unknown>;
        const deep = {} as Expressions<unknown>;

        const verifierMock = new Mock<Verifier<unknown>>()
            .prototypeof(Verifier.prototype);
        const autoMock = new Mock<IMock<unknown>>()
            .setup(instance => instance.resolve(Verifier))
            .returns(verifierMock.object())
            .object();
        resolveMock(CallCounter)
            .setup(instance => instance.count(shallow))
            .returns(haveBeenCalled);

        resolveMock(AutoMockProvider)
            .setup(instance => instance.getOrCreate(shallow))
            .returns(autoMock);

        const verify = resolve2(Verifier);
        verify.test([shallow, deep], Times.Once());

        resolveMock(VerificationTester)
            .verify(instance => instance.test(shallow, haveBeenCalled, Times.AtLeastOnce()));
        verifierMock
            .verify(instance => instance.test([deep], Times.Once()));
    });

});
