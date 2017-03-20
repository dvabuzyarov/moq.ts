import {Mock} from '../lib/mock';
import {It} from '../lib/expected-expressions/expression-predicates';
import {
    ExpectedMethodExpression, ExpectedNamedMethodExpression
} from '../lib/expected-expressions/expected-expressions';
import {Times} from '../lib/times';

interface ITestObject {
    method(arg: number): string;
}

describe('Mock: Named method', () => {


    it('Returns value with a simple setup', () => {
        const value = 'value';
        const object = new Mock<ITestObject>()
            .setup(instance => instance.method(1))
            .returns(value)
            .object();

        const actual = object.method(1);

        expect(actual).toBe(value);
    });


    //todo: doesn't work since there is no way to make out a property access and function call
    xit('Returns value with a predicated setup', () => {
        const value = 'value';

        const object = new Mock<ITestObject>()
            .setup(instance => It.Is((expression: ExpectedNamedMethodExpression) => expression.name === 'method' && expression.arguments[0] === 1))
            .returns(value)
            .object();

        const actual = object.method(1);

        expect(actual).toBe(value);
    });

    //todo: doesn't work since named method is a property that has a pointer to a function
    //but an unset property returns undefined value
    xit('Returns undefined for unset call', () => {
        const value = 'value';
        const object = new Mock<ITestObject>()
            .object();

        const actual = object.method(1);

        expect(actual).toBeUndefined();
    });

    it('Calls callback', () => {
        const value = 'value';
        const callback = jasmine.createSpy('callback').and.returnValue(value);
        const object = new Mock<ITestObject>()
            .setup(instance => instance.method(1))
            .callback(callback)
            .object();

        const actual = object.method(1);

        expect(actual).toBe(value);
        expect(callback).toHaveBeenCalled();
    });

    it('Throws an exception', () => {
        const error = new Error('exception');
        const object = new Mock<ITestObject>()
            .setup(instance => instance.method(It.Is((value)=> value === 1)))
            .throws(error)
            .object();

        expect(() => object.method(1)).toThrow(error);
    });

    it('Verifies', () => {
        const mock = new Mock<ITestObject>()
            .setup(instance => instance.method(It.Is((value)=> value === 1)))
            .returns('value');

        const object = mock.object();

        object.method(1);

        const action = () => mock.verify(instance => instance.method(1), Times.AtLeast(2));

        expect(action).toThrow();
    });
});