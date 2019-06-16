/**
 * @hidden
 */
import { IMockOptions } from "./moq";

export class MockOptionsBuilder {
    public build(options: IMockOptions): IMockOptions {
        return {...{target: () => undefined}, ...options};
    }
}
