import { render } from "test-utils";
import MainTabs from "module/main/component/navigation/MainTabs/MainTabs";
import { translate } from "locale";
import { fireEvent } from "@testing-library/react-native";

describe("MainTabs tests", () => {
    test("Renders correctly", () => {
        const screen = render(<MainTabs />);

        expect(screen.getAllByText(translate("transactions"))).toHaveLength(1);
        fireEvent.press(screen.getByText(translate("currencies")));
        expect(screen.getAllByText(translate("currencies"))).toHaveLength(2);
        fireEvent.press(screen.getByText(translate("nfts")));
        expect(screen.getAllByText(translate("nfts"))).toHaveLength(2);
    });
});
