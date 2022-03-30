import { render } from "test-utils";
import MainTabs from "module/main/component/navigation/MainTabs/MainTabs";
import { fireEvent } from "@testing-library/react-native";
import { MainTabItemType } from "module/main/component/navigation/MainTabs/MainTabs.types";
import { Typography } from "react-native-components";

describe("MainTabs tests", () => {
    test("Renders correctly", () => {
        const Tabs: MainTabItemType[] = [
            {
                title: "Tab1",
                item: <Typography variant="body1">Text1</Typography>,
            },
            {
                title: "Tab2",
                item: <Typography variant="body1">Text2</Typography>,
            },
            {
                title: "Tab3",
                item: <Typography variant="body1">Text3</Typography>,
            },
            {
                title: "Tab4",
                item: <Typography variant="body1">Text4</Typography>,
            },
        ];
        const screen = render(<MainTabs tabs={Tabs} />);

        expect(screen.getAllByText("Tab1")).toBeDefined();
        expect(screen.getAllByText("Text1")).toBeDefined();
        fireEvent.press(screen.getByText("Tab2"));
        expect(screen.getAllByText("Text2")).toBeDefined();
        fireEvent.press(screen.getByText("Tab3"));
        expect(screen.getAllByText("Text3")).toBeDefined();
        fireEvent.press(screen.getByText("Tab4"));
        expect(screen.getAllByText("Text4")).toBeDefined();
    });
});
