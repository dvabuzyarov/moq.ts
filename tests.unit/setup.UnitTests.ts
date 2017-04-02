import {Setup} from '../lib/setup';
import {IMock} from '../lib/moq';

describe('Setup', () => {


    function MockFactory(): IMock<any> {
        return <IMock<any>>(<any>{})
    }

    it('Returns mock object from returns', ()=> {
        const mock = MockFactory();

        const setup = new Setup(mock);
        const actual = setup.returns([]);


        expect(actual).toBe(mock);
    });

    it('Returns mock object from throws', ()=> {
        const mock = MockFactory();

        const setup = new Setup(mock);
        const actual = setup.throws([]);


        expect(actual).toBe(mock);
    });

    it('Returns mock object from callback', ()=> {
        const mock = MockFactory();

        const setup = new Setup(mock);
        const actual = setup.callback(()=>{});


        expect(actual).toBe(mock);
    });

    it('Returns value', ()=> {
        const value = [];

        const mock = MockFactory();
        const setup = new Setup(mock);
        setup.returns(value);

        const actual = setup.invoke();

        expect(actual).toBe(value);
    });

    it('Throws error', ()=> {
        const error = new Error('test message');
        const mock = MockFactory();

        const setup = new Setup(mock);
        setup.throws(error);


        expect(setup.invoke.bind(setup)).toThrow(error);
    });

    it('Returns value from callback', ()=> {
        const value = [];
        const arg = 'argument 1';
        const callback = jasmine.createSpy('callback').and.returnValue(value);
        const mock = MockFactory();

        const setup = new Setup(mock);
        setup.callback(callback);
        const actual = setup.invoke([arg]);


        expect(actual).toBe(value);
        expect(callback).toHaveBeenCalledWith(arg);
    });

    it('Returns value from callback without arguments', ()=> {
        const value = [];
        const callback = jasmine.createSpy('callback').and.returnValue(value);
        const mock = MockFactory();

        const setup = new Setup(mock);
        setup.callback(callback);
        const actual = setup.invoke();


        expect(actual).toBe(value);
        expect(callback).toHaveBeenCalledWith();
    });

});