import { Mock } from "../lib/mock";
import { MoqAPI } from "../lib/moq";
import { dump } from "../lib/dump";

describe("#843 Mock setup doesn't work for method references", () => {

    it("reproduces the bug", () => {
        enum MetroLineColor {
            BLUE
        }

        interface MapDataSource {
            metroLineColors(): MetroLineColor[];
            getMetroLine(color: MetroLineColor): any;
        }

        const expected = {};
        const array = [MetroLineColor.BLUE];
        const mock = new Mock<MapDataSource>()
            .setup(dataSource => dataSource.metroLineColors())
            .returns(array)
            .setup(dataSource => (dataSource as any).getMetroLine(MetroLineColor.BLUE, 0, array))
            .returns(expected)
            .object();

        const actual = mock
            .metroLineColors()
            .map(mock.getMetroLine);

        expect(actual[0]).toBe(expected);
    });
});
