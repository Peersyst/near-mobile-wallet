import { render } from "test-utils";
import { translate } from "locale";
import { fireEvent } from "@testing-library/react-native";
import HomeTabs from "module/home/component/navigation/HomeTabs/HomeTabs";

describe("MainTabs tests", () => {
    test("Renders correctly", () => {
        const screen = render(<HomeTabs />);
        expect(screen.getAllByText(translate("transactions"))).toHaveLength(1);
        fireEvent.press(screen.getByText(translate("currencies")));
        expect(screen.getAllByText(translate("currencies"))).toHaveLength(1);
        fireEvent.press(screen.getByText(translate("nfts")));
        expect(screen.getAllByText(translate("nfts"))).toHaveLength(1);
    });
});
