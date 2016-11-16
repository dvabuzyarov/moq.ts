import {Mock} from '../lib/mock';

interface ITestObject{
    property: string;
    method(arg: string): string;
}

interface ITestMethod{
    (arg: string): string;
}

describe('Mock', () => {

    it('Get property', ()=>{
        const value = 'value';
        const mock = new Mock<ITestObject>()
           .setup(instance => instance.property)
           .returns(value);

        const actual = mock.object.property;

        expect(actual).toBe(value);
    });
});