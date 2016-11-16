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
        const mock = new Mock<ITestObject>()
            .setup(instance => instance.property)
            .returns(value);

        const actual = mock.object.property;

        expect(actual).toBe(value);
    });

    it('Set property', () => {
        const value = 'value';

        const mock = new Mock<ITestObject>()
            .setup(instance => instance.property = value)
            .returns(true);

        mock.object.property = value;

        expect(mock.object.property).toBe(value);
    });

    it('Prevents to set property', () => {
        const value = 'value';

        const mock = new Mock<ITestObject>()
            .setup(instance => instance.property = value)
            .returns(false);

        expect(() => mock.object.property = value).toThrow(jasmine.any(TypeError));
    });

    it('Returns value from method', () => {
        const value = 'value';
        const arg = 'argument';

        const mock = new Mock<ITestObject>()
            .setup(instance => instance.method(arg))
            .returns(value);

        const actual = mock.object.method(arg);
        expect(actual).toBe(value);
    });

    it('Returns value from method', () => {
        const value1 = 'value1';
        const value2 = 'value2';
        const arg1 = 'argument1';
        const arg2 = 'argument2';

        const mock = new Mock<ITestObject>()
            .setup(instance => instance.method(arg1))
            .returns(value1)
            .setup(instance => instance.method(arg2))
            .returns(value2);

        const actual1 = mock.object.method(arg1);
        const actual2 = mock.object.method(arg2);

        expect(actual1).toBe(value1);
        expect(actual2).toBe(value2);
    });
});