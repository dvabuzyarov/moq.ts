/**
 * @hidden
 */
export class SequenceId {
    private value = 0;

    public next(): number {
        return this.value++;
    }
}

const instance = new SequenceId();

/**
 * @hidden
 */
export function sequenceIdFactory(): SequenceId {
    return instance;
}
