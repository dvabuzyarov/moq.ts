import { Mock } from "../lib/mock";
import { It } from "../lib/reflector/expression-predicates";

describe("#578 support async functions", () => {

    it("returns async", async () => {
        async function fn() {
            return 1;
        }

        const mock = new Mock<typeof fn>()
            .setup(instance => instance())
            .returnsAsync(2)
            .object();

        const actual = await mock();
        expect(actual).toBe(2);
    });

    it("returns async for async setup", async () => {
        async function fn() {
            return 1;
        }

        const mock = new Mock<typeof fn>()
            .setup(async instance => instance())
            .returnsAsync(2)
            .object();

        const actual = await mock();
        expect(actual).toBe(2);
    });

    it("throws async", async () => {
        async function fn() {
            return 1;
        }

        const exception = new Error();
        const mock = new Mock<typeof fn>()
            .setup(instance => instance())
            .throwsAsync(exception)
            .object();

        let actual;
        try {
            await mock();
        } catch (e) {
            actual = e;
        }

        expect(actual).toBe(exception);
    });

    it("throws async for async setup", async () => {
        async function fn() {
            return 1;
        }

        const exception = new Error();
        const mock = new Mock<typeof fn>()
            .setup(async instance => instance())
            .throwsAsync(exception)
            .object();

        let actual;
        try {
            await mock();
        } catch (e) {
            actual = e;
        }

        expect(actual).toBe(exception);
    });

    it("respects precedence", async () => {
        interface IUserManager {
            getUser(name: string): Promise<string>;
        }

        const value = "user";
        const name = "some-example@example.com";

        const manager = new Mock<IUserManager>()
            .setup(async x => x.getUser(It.IsAny()))
            .returnsAsync(null)
            .setup(async x => x.getUser(name))
            .returnsAsync(value)
            .object();

        const actual = await manager.getUser("");
        expect(actual).toBe(null);
    });

    it("verifies invocation", async () => {
        interface IUserManager {
            getUser(name: string): Promise<string>;
        }

        const value = "user";
        const name = "some-example@example.com";

        const managerMock = new Mock<IUserManager>()
            .setup(async x => x.getUser(It.IsAny()))
            .returnsAsync(null)
            .setup(async x => x.getUser(name))
            .returnsAsync(value);

        const actual = await managerMock.object().getUser(name);

        expect(actual).toBe(value);
        managerMock.verify(async instance => instance.getUser(name));
    });

    it("the customer case", async () => {
        interface IEmailService {
            send(email: string, subject: string, body: string): Promise<string>;
        }

        async function fn(email: string, service: IEmailService) {
            await service.send(email, "subject", "body");
        }

        const name = "some-example@example.com";

        const serviceMock = new Mock<IEmailService>()
            .setup(async instance => instance.send(It.IsAny(), It.IsAny(), It.IsAny()))
            .returnsAsync(undefined);

        await fn(name, serviceMock.object());

        serviceMock.verify(async instance => instance.send(name, "subject", "body"));
    });
});
