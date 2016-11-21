import {Mock} from '../lib/mock';
import {It} from '../lib/expected-expressions/expression-predicates';
import {
    ExpectedMethodExpression
} from '../lib/expected-expressions/expected-expressions';
import {Times} from '../lib/times';

interface ITestFunction {
    (arg: number): string;
}

describe('Mock: Method', () => {


    it('Returns value with a simple setup', () => {
        const value = 'value';
        const object = new Mock<ITestFunction>()
            .setup(instance => instance(1))
            .returns(value)
            .object;

        const actual = object(1);

        expect(actual).toBe(value);
    });


    it('Returns value with a predicated setup', () => {
        const value = 'value';

        const object = new Mock<ITestFunction>()
            .setup(instance => It.Is((expression: ExpectedMethodExpression) => expression.arguments[0] === 1))
            .returns(value)
            .object;

        const actual = object(1);

        expect(actual).toBe(value);
    });

    it('Returns undefined for unset call', () => {
        const value = 'value';
        const object = new Mock<ITestFunction>()
            .object;

        const actual = object(1);

        expect(actual).toBeUndefined();
    });

    it('Calls callback', () => {
        const value = 'value';
        const callback = jasmine.createSpy('callback').and.returnValue(value);
        const object = new Mock<ITestFunction>()
            .setup(instance => instance(1))
            .callback(callback)
            .object;

        const actual = object(1);

        expect(actual).toBe(value);
        expect(callback).toHaveBeenCalled();
    });

    it('Throws an exception', () => {
        const error = new Error('exception');
        const object = new Mock<ITestFunction>()
            .setup(instance => instance(It.Is((value)=> value === 1)))
            .throws(error)
            .object;

        expect(() => object(1)).toThrow(error);
    });

    it('Verifies ', () => {
        const mock = new Mock<ITestFunction>();
        const object = mock.object;

        object(1);

        const action = () => mock.verify(instance => instance(1), Times.AtLeast(2));

        expect(action).toThrow();
    });
});