import {Times} from './times';
import {Expressions} from './expressions';
import {IExpectedExpression, ExpectedExpressionReflector} from './expected-expressions/expected-expression-reflector';
import {CallCounter, callCounterFactory} from './call-counter';

export class VerifyError extends Error{
    constructor(message: string){
        super(message);
    }
}

export function verifierFactory<T>(): Verifier<T> {
    return new Verifier<T>(new ExpectedExpressionReflector(), callCounterFactory());
}

export class Verifier<T>{

    constructor(
        private reflector: ExpectedExpressionReflector,
        private callCounter: CallCounter){

    }

    public test(expected: IExpectedExpression<T>, times: Times, expressions: Expressions[]): void {
        const expression = this.reflector.reflect(expected);
        const callCount = this.callCounter.count(expression, expressions);
        const passed = times.test(callCount);
        if (passed === false)
            throw new VerifyError(times.message);
    }
}