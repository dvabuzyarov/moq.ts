import semanticRelease from "semantic-release";
import { createReleaseMarker } from "./create-release-marker";

export async function release() {
    try {
        const result = await semanticRelease({
            branch: "master",
            repositoryUrl: "https://github.com/dvabuzyarov/moq.ts",
            pkgRoot: "dist/moq"
        });
        if (result) {
            await createReleaseMarker();
        }
    } catch (err) {
        console.error("The automated release failed with %O", err);
    }
}

release();
