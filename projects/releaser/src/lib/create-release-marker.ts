import { exec } from "child_process";

export function createReleaseMarker(): Promise<void> {
    return new Promise(function (resolve, reject) {
        const child = exec("npm run postpublish");

        child.stdout.on("data", function (data) {
            process.stdout.write(data);
        });

        child.on("error", function (data) {
            reject("Webpack errored!");
        });

        child.on("exit", function () {
            resolve();
        });
    });
}
