import PagerView from "module/common/component/layout/PagerView/PagerView";
import { Text } from "react-native";
import { render } from "test-utils";

describe("PagerView test", () => {
    test("Renders correctly", () => {
        const screen = render(<PagerView height={undefined} children={<Text>hola</Text>} />);
        expect(screen.getByText("hola")).toBeDefined();
    });
});
