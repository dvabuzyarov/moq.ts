import {Mock} from '../lib/mock';
import {It} from '../lib/expected-expressions/expression-predicates';
import {ExpectedGetPropertyExpression} from '../lib/expected-expressions/expected-expressions';

interface ITestObject {
    property: string;
}

describe('Mock: Get property', () => {

    it('Returns value with a simple setup', () => {
        const value = 'value';
        const object = new Mock<ITestObject>()
            .setup(instance => instance.property)
            .returns(value)
            .object;

        const actual = object.property;

        expect(actual).toBe(value);
    });


    it('Returns value with a predicated setup', () => {
        const value = 'value';

        const object = new Mock<ITestObject>()
            .setup(instance => It.Is((expression: ExpectedGetPropertyExpression)=> expression.name === 'property'))
            .returns(value)
            .object;

        expect(object.property).toBe(value);
    });

    it('Returns undefined for unset property', () => {
        const value = 'value';
        const object = new Mock<ITestObject>()
            .object;

        const actual = object.property;

        expect(actual).toBeUndefined();
    });

    it('Calls callback', () => {
        const value = 'value';
        const callback = jasmine.createSpy('property read callback').and.returnValue(value);
        const object = new Mock<ITestObject>()
            .setup(instance => instance.property)
            .callback(callback)
            .object;

        const actual = object.property;

        expect(actual).toBe(value);
        expect(callback).toHaveBeenCalled();
    });

    it('Throws an exception', () => {
        const error = new Error('Read property exception');
        const object = new Mock<ITestObject>()
            .setup(instance => instance.property)
            .throws(error)
            .object;

        expect(() => object.property).toThrow(error);
    });

    it('Verifies get property', () => {
        const mock = new Mock<ITestObject>();
        const object = mock.object;

        object.property;

        const actual = mock.verify(instance => instance.property);

        expect(actual).toBe(true);
    });

});