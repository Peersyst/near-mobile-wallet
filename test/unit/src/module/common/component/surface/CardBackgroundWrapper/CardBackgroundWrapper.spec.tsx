import { CardBackgroundWrapper } from "module/common/component/surface/CardBackgroundWrapper/CardBackgroundWrapper";
import { Typography } from "react-native-components";
import { render } from "test-utils";

describe("Test for the card background wrapper", () => {
    test("Renders correctly", () => {
        const screen = render(
            <CardBackgroundWrapper>
                <Typography variant="body1">Card content</Typography>
            </CardBackgroundWrapper>,
        );
        expect(screen.getByText("Card content")).toBeDefined();
    });
});
