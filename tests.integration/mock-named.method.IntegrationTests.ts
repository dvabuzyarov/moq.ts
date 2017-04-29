import {Mock} from '../lib/mock';
import {It} from '../lib/expected-expressions/expression-predicates';
import {ExpectedNamedMethodExpression} from '../lib/expected-expressions/expected-expressions';
import {Times} from '../lib/times';
import {MockBehavior} from '../lib/interceptor-callbacks/interceptor-callbacks';

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


    //todo: it will work only in Loose mode
    it('Returns value with a predicated setup', () => {
        const value = 'value';

        const object = new Mock<ITestObject>()
            .setBehaviorStrategy(MockBehavior.Loose)
            .setup(instance => It.Is((expression: ExpectedNamedMethodExpression) => expression.name === 'method' && expression.arguments[0] === 1))
            .returns(value)
            .object();

        const actual = object.method(1);

        expect(actual).toBe(value);
    });

    //todo: it will work strict mode only if prototype has the method
    it('Returns value with a predicated setup', () => {
        const methodName = 'method';
        const value = 'value';
        const prototype = {};
        prototype[methodName] = ()=>{};

        const object = new Mock<ITestObject>()
            .prototypeof(prototype)
            .setup(instance => It.Is((expression: ExpectedNamedMethodExpression) => expression.name === methodName && expression.arguments[0] === 1))
            .returns(value)
            .object();

        const actual = object.method(1);

        expect(actual).toBe(value);
    });

    it('Throws TypeError exception when call an unset method in strict mode', () => {
        const value = 'value';
        const object = new Mock<ITestObject>()
            .object();

        expect(() => object.method(1)).toThrow(jasmine.any(TypeError));
    });

    it('Returns undefined when call an unset method in loose mode', () => {
        const value = 'value';
        const mock = new Mock<ITestObject>()
            .setBehaviorStrategy(MockBehavior.Loose);

        const object = mock.object();
        const actual = object.method(1);

        expect(actual).toBeUndefined();
        mock.verify(instance => instance.method(1));
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
        expect(callback).toHaveBeenCalledWith(1);
    });

    it('Throws an exception', () => {
        const error = new Error('exception');
        const object = new Mock<ITestObject>()
            .setup(instance => instance.method(It.Is((value) => value === 1)))
            .throws(error)
            .object();

        expect(() => object.method(1)).toThrow(error);
    });

    it('Verifies', () => {
        const mock = new Mock<ITestObject>()
            .setup(instance => instance.method(It.Is((value) => value === 1)))
            .returns('value');

        const object = mock.object();

        object.method(1);

        const action = () => mock.verify(instance => instance.method(1), Times.AtLeast(2));

        expect(action).toThrow();
    });
});