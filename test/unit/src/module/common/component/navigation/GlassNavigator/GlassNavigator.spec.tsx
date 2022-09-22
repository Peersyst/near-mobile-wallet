import { render } from "test-utils";
import MainNavigator from "module/common/component/navigation/MainNavigator/MainNavigator";
import { Typography } from "@peersyst/react-native-components";

describe("MainNavigator tests", () => {
    test("Renders correctly", () => {
        const screen = render(
            <MainNavigator>
                <Typography variant="body1">Glass content</Typography>
            </MainNavigator>,
        );

        expect(screen.getByText("Glass content")).toBeDefined();
    });

    test("Renders navbar and breadcrumbs", () => {
        const screen = render(
            <MainNavigator navbar={{ title: "Navbar title" }} breadcrumbs={{ length: 2, index: 0 }}>
                <Typography variant="body1">Glass content</Typography>
            </MainNavigator>,
        );

        //Content
        expect(screen.getByText("Glass content")).toBeDefined();
        // Navbar
        expect(screen.getByText("Navbar title")).toBeDefined();
        // Breadcrumbs
        expect(screen.getByText("1")).toBeDefined();
    });
});
