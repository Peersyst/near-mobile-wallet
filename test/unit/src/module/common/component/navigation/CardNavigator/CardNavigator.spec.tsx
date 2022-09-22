import { render } from "test-utils";
import CardNavigator from "module/common/component/navigation/CardNavigator/CardNavigator";
import { Typography } from "@peersyst/react-native-components";

describe("CardNavigator tests", () => {
    test("Renders correctly", () => {
        const screen = render(
            <CardNavigator>
                <Typography variant="body1">Main content</Typography>
            </CardNavigator>,
        );

        expect(screen.getByText("Main content")).toBeDefined();
    });

    test("Renders navbar and steps", () => {
        const screen = render(
            <CardNavigator navbar={{ title: "Navbar title", steps: { length: 2, index: 0 } }}>
                <Typography variant="body1">Main content</Typography>
            </CardNavigator>,
        );

        //Content
        expect(screen.getByText("Main content")).toBeDefined();
        // Navbar
        expect(screen.getByText("Navbar title")).toBeDefined();
        // Breadcrumbs
        expect(screen.getByText("1")).toBeDefined();
        expect(screen.getByText("/")).toBeDefined();
        expect(screen.getByText("2")).toBeDefined();
    });
});
