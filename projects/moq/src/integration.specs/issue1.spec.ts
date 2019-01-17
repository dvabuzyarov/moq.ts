import { Mock } from "../lib/mock";
import { MockBehavior } from "../lib/interceptor-callbacks/interceptor-callbacks";
import { Times } from "../lib/times";
import { It } from "../lib/expected-expressions/expression-predicates";

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
            field1: field1
        });
    }
}

interface IData {
    field1: number;
}

describe("linkedAccountUpdateProtoToDomainEpic", () => {
    it("my test should be failed", () => {
        const value = 4;
        const field1 = 2;
        const myServiceMock = new Mock<IMyService>();
        myServiceMock.setBehaviorStrategy(MockBehavior.Loose);
        myServiceMock
            .setup(instance => instance.findSomething(value))
            .returns(field1);

        const myClass = new MyClass(myServiceMock.object());
        myClass.method(value);

        myServiceMock.verify(instance => instance.doSomething(It.Is<IData>(data => {
            // data: expected {field1: 2}, actual: 4;
            return data.field1 === field1;
        })), Times.Once());
    });
});
