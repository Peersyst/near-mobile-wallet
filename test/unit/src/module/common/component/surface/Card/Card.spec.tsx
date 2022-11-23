import Card from "module/common/component/surface/Card/Card";
import { render } from "test-utils";
import { Typography } from "@peersyst/react-native-components";

describe("Card tests", () => {
    test("Renders correctly", () => {
        const screen = render(
            <Card>
                <Typography variant="body1">Card content</Typography>
            </Card>,
        );

        expect(screen.getByText("Card content")).toBeDefined();
    });
});
