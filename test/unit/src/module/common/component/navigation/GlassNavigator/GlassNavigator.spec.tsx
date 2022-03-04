import { render } from "test-utils";
import GlassNavigator from "module/common/component/navigation/GlassNavigator/GlassNavigator";
import { Typography } from "react-native-components";

describe("GlassNavigator tests", () => {
    test("Renders correctly", () => {
        const screen = render(
            <GlassNavigator>
                <Typography variant="body1">Glass content</Typography>
            </GlassNavigator>,
        );

        expect(screen.getByText("Glass content")).toBeDefined();
    });

    test("Renders navbar and breadcrumbs", () => {
        const screen = render(
            <GlassNavigator navbar={{ title: "Navbar title" }} breadcrumbs={{ length: 2, index: 0 }}>
                <Typography variant="body1">Glass content</Typography>
            </GlassNavigator>,
        );

        //Content
        expect(screen.getByText("Glass content")).toBeDefined();
        // Navbar
        expect(screen.getByText("Navbar title")).toBeDefined();
        // Breadcrumbs
        expect(screen.getByText("1")).toBeDefined();
    });
});
