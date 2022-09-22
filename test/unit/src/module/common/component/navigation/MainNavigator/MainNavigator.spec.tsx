import { render } from "test-utils";
import MainNavigator from "module/common/component/navigation/MainNavigator/MainNavigator";
import { Typography } from "@peersyst/react-native-components";

describe("MainNavigator tests", () => {
    test("Renders correctly", () => {
        const screen = render(
            <MainNavigator>
                <Typography variant="body1">Main content</Typography>
            </MainNavigator>,
        );

        expect(screen.getByText("Main content")).toBeDefined();
    });

    test("Renders navbar and breadcrumbs", () => {
        const screen = render(
            <MainNavigator navbar={{ title: "Navbar title", length: 2, index: 0 }}>
                <Typography variant="body1">Main content</Typography>
            </MainNavigator>,
        );

        //Content
        expect(screen.getByText("Main content")).toBeDefined();
        // Navbar
        expect(screen.getByText("Navbar title")).toBeDefined();
        // Breadcrumbs
        expect(screen.getByText("1 /")).toBeDefined();
        expect(screen.getByText("2")).toBeDefined();
    });
});
