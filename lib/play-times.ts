export class PlayTimes {

    public static Exactly(count: number): () => boolean {
        let invoked = 0;
        return () => {
            if (invoked >= count) return false;
            invoked++;
            return true;
        };
    }

    public static Never(): () => boolean {
        return () => false;
    }

    public static Once(): () => boolean {
        let played = false;
        return () => {
            if (played) return false;
            played = true;
            return true;
        };
    }

    public static Sequence(sequence: boolean[]): () => boolean {
        let index = 0;
        return () => {
            const value = sequence[index];
            index++;
            return value;
        }
    }
}
