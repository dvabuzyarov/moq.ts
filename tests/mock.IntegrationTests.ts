import {Mock} from '../lib/mock';

interface ITestObject {
    property: string;
    method(arg: string): string;
}

interface ITestMethod {
    (arg: string): string;
}

describe('Mock', () => {

    it('Get property', () => {
        const value = 'value';
        const object = new Mock<ITestObject>()
            .setup(instance => instance.property)
            .returns(value)
            .object;

        const actual = object.property;

        expect(actual).toBe(value);
    });

    it('Set property', () => {
        const value = 'value';

        const object = new Mock<ITestObject>()
            .setup(instance => instance.property = value)
            .returns(true)
            .object;

        object.property = value;

        expect(object.property).toBe(value);
    });

    it('Prevents to set property', () => {
        const value = 'value';

        const object = new Mock<ITestObject>()
            .setup(instance => instance.property = value)
            .returns(false)
            .object;

        expect(() => object.property = value).toThrow(jasmine.any(TypeError));
    });

    it('Returns value from named method', () => {
        const value = 'value';
        const arg = 'argument';

        const object = new Mock<ITestObject>()
            .setup(instance => instance.method(arg))
            .returns(value)
            .object;

        const actual = object.method(arg);
        expect(actual).toBe(value);
    });

    it('Returns value from method', () => {
        const value = 'value';
        const arg = 'argument';

        const object = new Mock<ITestMethod>()
            .setup(instance => instance(arg))
            .returns(value)
            .object;

        const actual = object(arg);
        expect(actual).toBe(value);
    });

});