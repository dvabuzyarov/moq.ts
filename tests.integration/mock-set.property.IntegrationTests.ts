import {Mock} from '../lib/mock';
import {It} from '../lib/expected-expressions/expression-predicates';
import {ExpectedGetPropertyExpression} from '../lib/expected-expressions/expected-expressions';
import {Times} from '../lib/times';

interface ITestObject {
    property: string;
}

describe('Mock: Set property', () => {


    it('Allows write', () => {
        const value = 'value';
        const object = new Mock<ITestObject>()
            .setup(instance => {instance.property = 'a'})
            .returns(true)
            .object();

        const action = () => object.property = 'a';

        expect(action).not.toThrow();
    });


    it('Denies write', () => {
        const value = 'value';
        const object = new Mock<ITestObject>()
            .setup(instance => {instance.property = 'a'})
            .returns(false)
            .object();

        const action = () => object.property = 'a';

        expect(action).toThrow();
    });


    it('Calls callback', () => {
        const callback = jasmine.createSpy('callback').and.returnValue(true);
        const object = new Mock<ITestObject>()
            .setup(instance => {instance.property = It.Is(value => value === 'a')})
            .callback(callback)
            .object();

        const action = () => object.property = 'a';

        expect(action).not.toThrow();
        expect(callback).toHaveBeenCalled();
    });

    it('Throws an exception', () => {
        const error = new Error('exception');
        const object = new Mock<ITestObject>()
            .setup(instance => {instance.property = 'a'})
            .throws(error)
            .object();

        expect(() => object.property = 'a').toThrow(error);
    });

    it('Verifies', () => {
        const mock = new Mock<ITestObject>()
            .setup(instance => instance.property = 'a')
            .returns(false);

        const object = mock.object();
        const action = () => object.property = 'a';

        const verify = () => mock.verify(instance => {instance.property = 'a'}, Times.Once());

        expect(action).toThrow();
        expect(verify).not.toThrow();
    });
});