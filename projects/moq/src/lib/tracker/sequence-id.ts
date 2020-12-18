/**
 * @hidden
 */
export class SequenceId {
    private value = 0;

    public next(): number {
        return this.value++;
    }
}
