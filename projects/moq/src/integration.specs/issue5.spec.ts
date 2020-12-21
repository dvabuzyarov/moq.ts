import { dump } from "../lib/dump";
import { Mock } from "../lib/mock";
import { It } from "../lib/reflector/expression-predicates";

interface IMyService {
    findSomething(value: number): number;

    doSomething(value: IData): any;
}

class MyClass {
    constructor(private myService: IMyService) {
    }

    public method(value: number): void {
        const field1 = this.myService.findSomething(value);
        this.myService.doSomething({
            field1
        });
    }
}

interface IData {
    field1: number;
}

describe("dumps all interactions into console.log", () => {
    it("dumps", () => {
        const value = 4;
        const field1 = 2;
        const myServiceMock = new Mock<IMyService>();
        myServiceMock
            .setup(instance => instance.doSomething(It.IsAny()))
            .returns(undefined)
            .setup(instance => instance.findSomething(value))
            .returns(field1);

        const myClass = new MyClass(myServiceMock.object());
        myClass.method(value);

        const log = jasmine.createSpy("console.log");
        const writer = ({log} as any as Console);

        dump(myServiceMock, writer);

        const delimiter = "-------------------------------";
        expect(log).toHaveBeenCalledWith("Dump of noname mock");
        expect(log).toHaveBeenCalledWith(delimiter);
        const interactions = "\nGetter of 'findSomething'\nfindSomething(4)\nGetter of 'doSomething'\ndoSomething([object Object])";
        expect(log).toHaveBeenCalledWith(interactions);
        expect(log).toHaveBeenCalledWith(delimiter);
    });
});
